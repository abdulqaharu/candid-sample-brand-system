/**
 * Substation: three bays. Four gantries carry three phase conductors over a
 * transformer in each bay. The spans the pointer passes over light up and sag
 * a little, then fade. At rest one span hangs lower and bright. The slider is
 * how far a touched span sags.
 *
 * The pattern: discrete items with a trail. A tween per span, and a hit test
 * on one fixed plane at the conductors' height, which never moves.
 */
const {
  Cam, circ, clamp, facing, fit, open, proj, prism, put, rings, solid, seg, unproj,
  tdone, tset, tval, tween, disposer, mk, pointer, register,
} = HL;

const BAY = 50, BAYS = 3, H = 54, PAD = 5, SAG = 5, W = 30;
const PHASES = [-18, 0, 18];
const REST = 4; // bay 2, phase B: the middle span
const NAMES = ["A", "B", "C"];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let drop = value;

  const C = Cam(45, 0.5, 1.5);
  fit(C, [[-14, -40, 0], [164, 40, 0], [164, -40, 0], [-14, 40, 0], [0, -W, H + 8], [150, -W, H + 8]], 200, 166);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);
  const block = (x0, y0, x1, y1, r, z0, z1, b = 1.6) => {
    const [ring, inner] = rings(x0, y0, x1, y1, r, b);
    put(solid(g), prism(P, front, ring, inner, z0, z1));
  };
  /** A round upright: a post or a bushing. */
  const pin = (x, y, r, z0, z1) => {
    const ring = circ(r, 16).map((q) => ({ ...q, u: q.u + x, v: q.v + y }));
    put(solid(g), prism(P, front, ring, null, z0, z1));
  };
  const gantry = (x) => {
    pin(x, -W, 2.2, PAD, H);
    pin(x, W, 2.2, PAD, H);
    block(x - 2.6, -W - 4, x + 2.6, W + 4, 2.4, H, H + 4.5, 1);
  };
  const transformer = (x) => {
    block(x + 13, -15, x + 37, 15, 5, PAD, PAD + 18);
    mk("path", { d: [18, 23, 28, 33].map((u) => seg(P(u + x, 15, PAD + 3), P(u + x, 15, PAD + 14))).join(""), class: "nf lo" }, g);
    for (const y of [-9, 0, 9]) {
      pin(x + 25, y, 2, PAD + 18, PAD + 26);
      mk("path", { d: seg(P(x + 22.6, y, PAD + 22), P(x + 27.4, y, PAD + 22)), class: "nf lo" }, g);
    }
  };

  /** The conductor of one span, hanging `sag` below its two fixings. */
  const wire = (bay, y, sag) => {
    const pts = [];
    for (let k = 0; k <= 16; k++) {
      const t = k / 16;
      pts.push(P(bay * BAY + t * BAY, y, H - 1 - sag * 4 * t * (1 - t)));
    }
    return open(pts);
  };

  const [pad, padIn] = rings(-14, -40, 164, 40, 11, 2);
  put(solid(g), prism(P, front, pad, padIn, 0, PAD));

  // back to front: a gantry, the transformer in its bay, the wires over it, then the next gantry
  const spans = [];
  for (let bay = 0; bay < BAYS; bay++) {
    gantry(bay * BAY);
    transformer(bay * BAY);
    PHASES.forEach((y, ph) => {
      const el = mk("path", { class: "nf" }, g);
      const i = bay * 3 + ph;
      spans.push({ bay, ph, y, el, v: tween(i === REST ? 1 : 0), drawn: null });
    });
  }
  gantry(BAYS * BAY);

  let act = -1, last = null;
  /** One bright span: the one under the pointer, or the rest one. Those just passed stay half lit while they fade. */
  const paint = (s, i, v) => {
    const hi = act < 0 ? i === REST : i === act;
    s.el.setAttribute("class", "nf" + (hi ? " hi" : v > 0.35 ? " sil" : ""));
  };

  const B = register(stage, (_dt, now) => {
    let moving = false;
    spans.forEach((s, i) => {
      const v = tval(s.v, now), sag = SAG + drop * v;
      if (sag !== s.drawn) { s.drawn = sag; s.el.setAttribute("d", wire(s.bay, s.y, sag)); }
      paint(s, i, v);
      if (!tdone(s.v, now)) moving = true;
    });
    return moving;
  });
  bag.add(B.unregister);

  /** The span at a viewBox point, read on the plane the conductors rest in; -1 outside the yard. */
  function hit([sx, sy]) {
    const [x, y] = unproj(C, sx, sy, H - SAG);
    if (x < -6 || x > BAYS * BAY + 6 || Math.abs(y) > W + 6) return -1;
    return clamp(Math.floor(x / BAY), 0, BAYS - 1) * 3 + clamp(Math.round(y / 18) + 1, 0, 2);
  }
  /** Lets span i fade out, a beat after the pointer has gone. */
  const fade = (i, now, delay) => tset(spans[i].v, 0, now, delay);

  function go(point) {
    const now = performance.now();
    const next = point ? hit(point) : -1;
    // every span crossed since the last event lights, in the order crossed
    if (point && last) {
      for (let k = 1; k < 8; k++) {
        const i = hit([last[0] + ((point[0] - last[0]) * k) / 8, last[1] + ((point[1] - last[1]) * k) / 8]);
        if (i >= 0 && i !== next && i !== act) { spans[i].v = tween(1); fade(i, now, k * 40); }
      }
    }
    last = point;
    if (next !== act) {
      if (act >= 0) fade(act, now, 120);
      else if (next >= 0 && next !== REST) fade(REST, now, 0);
      act = next;
      if (next >= 0) tset(spans[next].v, 1, now, 0);
      else tset(spans[REST].v, 1, now, 120);
      read.textContent = next < 0 ? "rest" : `bay ${spans[next].bay + 1}·${NAMES[spans[next].ph]}`;
    }
    B.wake();
  }

  bag.add(pointer(stage, { move: (p) => go(p), leave: () => go(null) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { drop = v; B.wake(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "substation",
  means: "Three bays under four gantries: the spans the pointer passes over light up, sag a little, then fade.",
  rules: [1, 4, 7, 8],
  range: [3, 7, 11],
  tour: [[145, 90], [186, 142], [255, 183], null],
  mount,
});
