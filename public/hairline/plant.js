/**
 * Plant: a combined-cycle block on its pad. A gas turbine with its filter
 * house, a heat recovery steam generator with its drum, and a tapering stack.
 * The unit under the pointer lifts off the pad and takes the bright stroke. At
 * rest the steam generator sits slightly raised and bright. The slider is how
 * far a unit lifts.
 *
 * The pattern: discrete items. Tweens, a stagger by distance, and a hit test
 * on the units' resting places across the screen, which never move.
 */
const {
  Cam, circ, facing, fit, hull, open, poly, proj, prism, put, ringAt, rings, rrect, run, solid, seg,
  tdone, tset, tval, tween, disposer, mk, pointer, register,
} = HL;

const STEP = 60, REST = 7, HOME = 1, PAD = 6;
const SX = 144, SR = 14, ST = 8, SH = 96; // the stack: centre, foot and top radius, height

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let lift = value;

  // Fitted with the stack lifted as far as it goes.
  const C = Cam(45, 0.5, 1.5);
  fit(C, [[-8, -32, 0], [170, 32, 0], [170, -32, 0], [-8, 32, 0], [SX, 0, PAD + SH + 30], [70, -20, 100]], 200, 166);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);

  /** A rounded box that rides at the unit's height: redraw(dz) moves it. */
  function box(parent, units, x0, y0, x1, y1, r, z0, z1) {
    const [ring, inner] = rings(x0, y0, x1, y1, r, 1.8);
    const el = solid(parent);
    units.push({ sil: el.sil, draw: (dz) => put(el, prism(P, front, ring, inner, z0 + dz, z1 + dz)) });
  }
  /** Lines on a unit's near faces: pairs of world points. */
  function lines(parent, units, pairs, cls = "nf lo") {
    const el = mk("path", { class: cls }, parent);
    units.push({
      draw: (dz) => el.setAttribute("d", pairs.map(([a, b]) => seg(P(a[0], a[1], a[2] + dz), P(b[0], b[1], b[2] + dz))).join("")),
    });
  }

  const [pad, padIn] = rings(-8, -32, 170, 32, 11, 2);
  put(solid(g), prism(P, front, pad, padIn, 0, PAD));
  /** Where each unit stands: a dashed mark on the pad, painted before the unit, seen when it lifts. */
  const footprint = (x0, y0, x1, y1, r) => mk("path", { d: poly(ringAt(P, rrect(x0, y0, x1, y1, r), PAD)), class: "nf dash" }, g);

  const unit = (name, x0, x1, make) => {
    const grp = mk("g", {}, g), pieces = [];
    make(grp, pieces);
    return { name, x0, x1, pieces, z: tween(0), drawn: null };
  };

  footprint(8, -13, 48, 13, 8);
  const gt = unit("GT", 2, 52, (grp, u) => {
    box(grp, u, 8, -13, 48, 13, 8, PAD, PAD + 22);
    lines(grp, u, [22, 31, 40].map((x) => [[x, 13, PAD + 3], [x, 13, PAD + 19]]));
    // the filter house, up on two legs above the inlet
    for (const y of [-12, 7]) box(grp, u, 6, y, 11, y + 5, 2, PAD + 22, PAD + 30);
    box(grp, u, 2, -17, 26, 17, 5, PAD + 30, PAD + 48);
    lines(grp, u, [35, 39, 43].map((z) => [[6, 17, PAD + z], [22, 17, PAD + z]]));
  });

  footprint(62, -20, 112, 20, 6);
  const hrsg = unit("HRSG", 56, 114, (grp, u) => {
    box(grp, u, 52, -9, 66, 9, 3, PAD + 2, PAD + 24); // the duct in from the turbine
    box(grp, u, 62, -20, 112, 20, 6, PAD, PAD + 56);
    lines(grp, u, [19, 38].map((z) => [[68, 20, PAD + z], [106, 20, PAD + z]]));
    lines(grp, u, [19, 38].map((z) => [[112, -14, PAD + z], [112, 14, PAD + z]]));
    for (const x of [74, 96]) box(grp, u, x, -3, x + 5, 3, 2, PAD + 56, PAD + 60);
    box(grp, u, 68, -8, 108, 8, 8, PAD + 60, PAD + 71); // the steam drum
  });

  const foot = circ(SR, 40), top = circ(ST, 40), lip = circ(ST - 2, 40);
  const move = (ring, x) => ring.map((q) => ({ ...q, u: q.u + x }));
  const [sf, st, si] = [move(foot, SX), move(top, SX), move(lip, SX)];
  footprint(SX - SR, -SR, SX + SR, SR, SR);
  const stack = unit("stack", SX - SR - 8, SX + SR, (grp, u) => {
    box(grp, u, 112, -7, SX - 6, 7, 3, PAD + 4, PAD + 20); // the flue to the stack
    const el = solid(grp), mouth = mk("path", { class: "nf lo" }, grp), band = mk("path", { class: "nf lo" }, grp);
    const mid = move(circ(SR - (SR - ST) * 0.78, 40), SX);
    u.push({
      sil: el.sil,
      draw: (dz) => {
        el.sil.setAttribute("d", poly(hull(ringAt(P, sf, PAD + dz).concat(ringAt(P, st, PAD + SH + dz)))));
        el.cr.setAttribute("d", open(ringAt(P, run(st, front), PAD + SH + dz)));
        mouth.setAttribute("d", poly(ringAt(P, si, PAD + SH + dz)));
        band.setAttribute("d", open(ringAt(P, run(mid, front), PAD + SH * 0.78 + dz)));
      },
    });
  });
  const units = [gt, hrsg, stack];
  hrsg.z = tween(REST);

  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const it of units) {
      const z = tval(it.z, now);
      if (z !== it.drawn) { it.drawn = z; for (const piece of it.pieces) piece.draw(z); }
      if (!tdone(it.z, now)) moving = true;
    }
    return moving;
  });
  bag.add(B.unregister);

  // hit test: the nearest resting place across the screen, inside the block's own height
  const centres = units.map((it) => P((it.x0 + it.x1) / 2, 0, PAD + 30));
  const left = P(0, 0, PAD)[0] - 18, right = P(SX + SR, 0, PAD)[0] + 12;
  function hit([x, y]) {
    if (x < left || x > right) return -1;
    let best = -1, far = 1e9;
    centres.forEach((c, i) => { const d = Math.abs(c[0] - x); if (d < far) { far = d; best = i; } });
    return Math.abs(y - centres[best][1]) > 100 ? -1 : best;
  }

  let act = -1;
  const bright = (i) => units.forEach((it, k) => it.pieces.forEach((p) => p.sil?.classList.toggle("hi", k === i)));
  function setActive(a, force) {
    if (a === act && !force) return;
    const now = performance.now(), from = a >= 0 ? a : act;
    act = a;
    units.forEach((it, i) => {
      const z = a < 0 ? (i === HOME ? REST : 0) : i === a ? lift : 0;
      tset(it.z, z, now, Math.abs(i - from) * STEP);
    });
    bright(a < 0 ? HOME : a);
    read.textContent = a < 0 ? "rest" : units[a].name;
    B.wake();
  }
  bright(HOME);

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { lift = v; if (act >= 0) setActive(act, true); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "plant",
  means: "A combined-cycle block on its pad: the unit under the pointer lifts off and takes the bright line.",
  rules: [1, 4, 5, 9],
  range: [14, 22, 30],
  tour: [[129, 101], [206, 119], [267, 108], null],
  mount,
});
