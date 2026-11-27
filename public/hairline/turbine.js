/**
 * Turbine: a gas turbine on its skid, its upper casing split in four. The
 * section under the pointer lifts off the rotor discs, and its neighbours
 * crack open a little, staggered outwards. At rest the combustor sits slightly
 * open and bright. The slider is how far a section lifts.
 *
 * The pattern: discrete items. Tweens, a stagger by distance, and a hit test
 * on the sections' resting centres, which never move.
 */
const {
  Cam, clamp, facing, fit, hull, open, poly, proj, prism, put, rings, solid, seg,
  tdone, tset, tval, tween, disposer, mk, pointer, register,
} = HL;

const CZ = 36, STEP = 60, REST = 9, OPEN = 2;
/** From the inlet to the exhaust end: name, span along the axis, radius at each end, rotor disc positions. */
const SECTIONS = [
  { name: "inlet", x0: 0, x1: 24, r0: 27, r1: 19, discs: [12] },
  { name: "comp", x0: 27, x1: 66, r0: 19, r1: 13.5, discs: [32, 39, 46, 53, 60] },
  { name: "burner", x0: 69, x1: 94, r0: 21, r1: 21, discs: [76, 87] },
  { name: "turbine", x0: 97, x1: 125, r0: 15, r1: 23, discs: [103, 111, 119] },
];
const radius = (s, x) => s.r0 + (s.r1 - s.r0) * ((x - s.x0) / (s.x1 - s.x0));

/** Half a circle standing across the axis: from angle a0 to a1, at height z. */
function arc(P, x, r, z, a0, a1, n = 20) {
  const out = [];
  for (let k = 0; k <= n; k++) {
    const a = a0 + ((a1 - a0) * k) / n;
    out.push(P(x, r * Math.cos(a), z + r * Math.sin(a)));
  }
  return out;
}

/** One half of a casing section (upper from 0 to PI, lower from PI to 2 PI): body, the seam beside the flange, end face and bolt circle. */
function shell(P, s, z, a0, a1) {
  const near = arc(P, s.x1, s.r1, z, a0, a1);
  const side = a0 === 0 ? 0.14 : -0.14;
  const at = (x) => P(x, radius(s, x) * Math.cos(side), z + radius(s, x) * Math.sin(side));
  return {
    sil: poly(hull(arc(P, s.x0, s.r0, z, a0, a1).concat(near))),
    seam: seg(at(s.x0), at(s.x1)),
    cap: poly(near),
    bolt: open(arc(P, s.x1, s.r1 - 2.2, z, a0 + 0.16, a1 - 0.16)),
  };
}

/** Paths for one shell, appended in paint order. */
function shellNodes(parent) {
  const g = mk("g", {}, parent);
  return {
    sil: mk("path", { class: "sil" }, g), seam: mk("path", { class: "nf lo" }, g),
    cap: mk("path", {}, g), bolt: mk("path", { class: "nf lo" }, g),
  };
}
const write = (nodes, paths) => { for (const k in paths) nodes[k].setAttribute("d", paths[k]); };

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let lift = value;

  // Fitted with a section fully lifted, so no pose leaves the frame.
  const C = Cam(45, 0.5, 1.74);
  fit(C, [[-8, -30, 0], [166, 30, 0], [166, -30, 0], [-8, 30, 0], [0, 0, CZ + 27 + 30], [160, -19, 56]], 200, 166);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);
  const block = (x0, y0, x1, y1, r, z0, z1) => {
    const [ring, inner] = rings(x0, y0, x1, y1, r, 1.8);
    put(solid(g), prism(P, front, ring, inner, z0, z1));
  };

  block(-8, -27, 166, 27, 9, 0, 6);
  for (const x of [14, 106]) block(x, -13, x + 10, 13, 3, 6, CZ - 14);
  for (const s of SECTIONS) write(shellNodes(g), shell(P, s, CZ, Math.PI, Math.PI * 2));
  // the open flange the upper casing sits on
  for (const s of SECTIONS) {
    mk("path", { d: poly([P(s.x0, s.r0, CZ), P(s.x1, s.r1, CZ), P(s.x1, -s.r1, CZ), P(s.x0, -s.r0, CZ)]), class: "lo" }, g);
  }

  const parts = SECTIONS.map((s, i) => {
    const rotor = mk("g", {}, g);
    mk("path", { d: poly(hull(arc(P, s.x0, 3.5, CZ, 0, Math.PI).concat(arc(P, s.x1, 3.5, CZ, 0, Math.PI)))) }, rotor);
    for (const x of s.discs) {
      const r = radius(s, x) - 4;
      mk("path", { d: poly(arc(P, x, r, CZ, 0, Math.PI)), class: "sil" }, rotor);
      mk("path", { d: open(arc(P, x, r * 0.55, CZ, 0, Math.PI)), class: "nf lo" }, rotor);
    }
    return { s, up: shellNodes(g), z: tween(i === OPEN ? REST : 0), drawn: null };
  });
  // the generator end: the nearest block, so it is painted last
  block(130, -19, 160, 19, 7, 6, 56);
  mk("path", { d: seg(P(138, 19, 14), P(138, 19, 48)) + seg(P(145, 19, 14), P(145, 19, 48)), class: "nf lo" }, g);

  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const p of parts) {
      const z = tval(p.z, now);
      if (z !== p.drawn) { p.drawn = z; write(p.up, shell(P, p.s, CZ + z, 0, Math.PI)); }
      if (!tdone(p.z, now)) moving = true;
    }
    return moving;
  });
  bag.add(B.unregister);

  // hit test: the nearest resting centre across the screen, inside the machine's own box
  const centres = SECTIONS.map((s) => P((s.x0 + s.x1) / 2, 0, CZ));
  const first = P(-4, 0, CZ), last = P(130, 0, CZ);
  function hit([x, y]) {
    if (x < first[0] - 14 || x > last[0]) return -1;
    let best = -1, far = 1e9;
    centres.forEach((c, i) => { const d = Math.abs(c[0] - x); if (d < far) { far = d; best = i; } });
    return Math.abs(y - centres[best][1]) > 90 ? -1 : best;
  }

  let act = -1;
  function bright(i) { parts.forEach((p, k) => { p.up.sil.classList.toggle("hi", k === i); p.up.cap.classList.toggle("hi", k === i); }); }
  function setActive(a, force) {
    if (a === act && !force) return;
    const now = performance.now(), from = a >= 0 ? a : act;
    act = a;
    parts.forEach((p, i) => {
      const d = Math.abs(i - from);
      const open_ = a < 0 ? (i === OPEN ? REST : 0) : lift * clamp([1, 0.3, 0.1, 0][d], 0, 1);
      tset(p.z, open_, now, d * STEP);
    });
    bright(a < 0 ? OPEN : a);
    read.textContent = a < 0 ? "rest" : SECTIONS[a].name;
    B.wake();
  }
  bright(OPEN);

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { lift = v; if (act >= 0) setActive(act, true); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "turbine",
  means: "A gas turbine on its skid: the casing section under the pointer lifts off the rotor, and its neighbours crack open.",
  rules: [1, 2, 4, 5],
  range: [16, 23, 30],
  tour: [[118, 90], [159, 129], [239, 155], null],
  mount,
});
