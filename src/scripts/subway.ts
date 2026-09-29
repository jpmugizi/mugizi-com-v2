// Interactive schematic of the 2 and 3 lines, Brooklyn Museum to 125 St.
// Themed entirely through CSS variables so each design direction restyles it:
//   --sw-line --sw-on-line --sw-ink --sw-muted --sw-bg --sw-water --sw-font

const SVG_NS = 'http://www.w3.org/2000/svg';

interface Stop {
  name: string;
  note?: string;
}

const stops: Stop[] = [
  { name: 'Eastern Pkwy–Brooklyn Museum', note: 'The first Saturday of the month: art, dancing, and the usual crew.' },
  { name: 'Grand Army Plaza' },
  { name: 'Bergen St' },
  { name: 'Atlantic Av–Barclays Ctr' },
  { name: 'Nevins St' },
  { name: 'Hoyt St' },
  { name: 'Borough Hall' },
  { name: 'Clark St' },
  { name: 'Wall St' },
  { name: 'Fulton St' },
  { name: 'Park Place' },
  { name: 'Chambers St' },
  { name: '14 St' },
  { name: '34 St–Penn Station' },
  { name: 'Times Sq–42 St' },
  { name: '72 St' },
  { name: '96 St' },
  { name: '110 St' },
  { name: '116 St' },
  { name: '125 St', note: 'The following Friday: dinner and a night out in Harlem with a friend who was in town.' },
];

const LAST_BROOKLYN = 7; // Clark St; the East River sits between it and Wall St
const RIVER_WEIGHT = 2; // the river hop is drawn twice as long as a normal hop

type Kind = 'wide' | 'tall';

interface Layout {
  viewBox: string;
  d: string;
  boroughs: { text: string; x: number; y: number; anchor: 'start' | 'end' }[];
  label(i: number): { transform: string; anchor: 'start' | 'end' };
}

const layouts: Record<Kind, Layout> = {
  wide: {
    viewBox: '30 0 540 510',
    d: 'M 70 460 H 260 L 400 320 V 40',
    boroughs: [
      { text: 'BROOKLYN', x: 70, y: 490, anchor: 'start' },
      { text: 'MANHATTAN', x: 420, y: 24, anchor: 'start' },
    ],
    label: (i) =>
      i <= 5
        ? { transform: 'rotate(-45) translate(12 4)', anchor: 'start' }
        : { transform: 'translate(14 4)', anchor: 'start' },
  },
  tall: {
    viewBox: '0 0 360 720',
    d: 'M 44 36 V 690',
    boroughs: [
      { text: 'BROOKLYN', x: 44, y: 14, anchor: 'start' },
      { text: 'MANHATTAN', x: 44, y: 714, anchor: 'start' },
    ],
    label: () => ({ transform: 'translate(16 4)', anchor: 'start' }),
  },
};

const css = /* css */ `
.sw { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 1.5rem 2.5rem; align-items: center; color: var(--sw-ink); font-family: var(--sw-font, inherit); }
.sw.is-stacked { grid-template-columns: minmax(0, 1fr); }
.sw-map svg { display: block; width: 100%; height: auto; overflow: visible; }
.sw-track { fill: none; stroke: var(--sw-line); stroke-width: 9; stroke-linecap: round; stroke-linejoin: round; opacity: 0.3; }
.sw-tunnel { stroke-dasharray: 1 13; stroke-linecap: round; }
.sw-ride { fill: none; stroke: var(--sw-line); stroke-width: 9; stroke-linecap: round; stroke-linejoin: round; transition: stroke-dasharray 0.4s cubic-bezier(0.25, 1, 0.5, 1); }
.sw-water { stroke: var(--sw-water); stroke-width: 34; stroke-linecap: butt; }
.sw-water-label { fill: var(--sw-muted); font-size: 12px; font-style: italic; text-anchor: middle; letter-spacing: 0.06em; }
.sw-borough { fill: var(--sw-muted); font-size: 11px; font-weight: 700; letter-spacing: 0.16em; }
.sw-stop { cursor: pointer; outline: none; }
.sw-stop .hit { fill: transparent; }
.sw-stop .dot { fill: var(--sw-bg); stroke: var(--sw-ink); stroke-width: 2.5; }
.sw-stop.is-passed .dot { fill: var(--sw-ink); }
.sw-stop:focus-visible .dot { stroke: var(--sw-line); stroke-width: 5; }
.sw-label { fill: var(--sw-muted); font-size: 15px; pointer-events: none; }
.sw-stop.is-passed .sw-label { fill: var(--sw-ink); }
.sw-stop.is-current .sw-label { fill: var(--sw-ink); font-weight: 700; }
.sw-train { transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1); pointer-events: none; }
.sw-train circle { fill: var(--sw-line); stroke: var(--sw-bg); stroke-width: 3; }
.sw-train text { fill: var(--sw-on-line); font-size: 12px; font-weight: 700; text-anchor: middle; dominant-baseline: central; }
.sw-title { display: flex; align-items: center; gap: 0.4rem; margin: 0 0 0.9rem; font-weight: 700; }
.sw-bullet { display: inline-grid; place-items: center; width: 1.75em; height: 1.75em; border-radius: 50%; background: var(--sw-line); color: var(--sw-on-line); font-size: 0.9em; line-height: 1; }
.sw-readout { margin: 0 0 0.35rem; font-weight: 600; }
.sw-note { margin: 0 0 1rem; min-height: 4.5em; color: var(--sw-muted); font-style: italic; }
.sw-scrub { display: block; margin-bottom: 0.9rem; }
.sw-scrub input { width: 100%; accent-color: var(--sw-line); }
.sw-play { font: inherit; font-weight: 600; padding: 0.4em 1.1em; color: var(--sw-ink); background: transparent; border: 1.5px solid var(--sw-ink); border-radius: 2em; cursor: pointer; }
.sw-play:hover { background: var(--sw-ink); color: var(--sw-bg); }
.sw-play:focus-visible, .sw-scrub input:focus-visible { outline: 2px solid var(--sw-line); outline-offset: 3px; }
.sw-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) { .sw-ride, .sw-train { transition: none; } }
`;

function svgEl<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number> = {},
  parent?: Element,
): SVGElementTagNameMap[K] {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  parent?.append(node);
  return node;
}

export function mountSubway(mount: HTMLElement): void {
  if (!document.getElementById('sw-css')) {
    const style = document.createElement('style');
    style.id = 'sw-css';
    style.textContent = css;
    document.head.append(style);
  }

  const last = stops.length - 1;
  let index = 0;
  let kind: Kind = mount.clientWidth < 520 ? 'tall' : 'wide';
  let timer = 0;
  let update: () => void = () => {};

  mount.innerHTML = /* html */ `
    <div class="sw">
      <div class="sw-map"></div>
      <div class="sw-panel">
        <p class="sw-title"><span class="sw-bullet" aria-hidden="true">2</span><span class="sw-bullet" aria-hidden="true">3</span><span>Brooklyn Museum to Harlem</span></p>
        <p class="sw-readout" aria-live="polite"></p>
        <p class="sw-note"></p>
        <label class="sw-scrub"><span class="sw-sr">Ride the 2 and 3, stop by stop</span><input type="range" min="0" max="${last}" value="0" step="1"></label>
        <button type="button" class="sw-play">Ride</button>
      </div>
    </div>`;

  const root = mount.querySelector<HTMLElement>('.sw')!;
  const mapBox = mount.querySelector<HTMLElement>('.sw-map')!;
  const readout = mount.querySelector<HTMLElement>('.sw-readout')!;
  const note = mount.querySelector<HTMLElement>('.sw-note')!;
  const slider = mount.querySelector<HTMLInputElement>('input')!;
  const play = mount.querySelector<HTMLButtonElement>('.sw-play')!;

  const go = (i: number) => {
    index = i;
    update();
  };
  const halt = () => {
    window.clearInterval(timer);
    timer = 0;
    play.textContent = index === last ? 'Ride again' : 'Ride';
  };

  function draw() {
    const layout = layouts[kind];
    mapBox.replaceChildren();
    const svg = svgEl('svg', { viewBox: layout.viewBox, role: 'group', 'aria-label': 'Schematic map of the 2 and 3 subway lines from the Brooklyn Museum to 125th Street' }, mapBox);
    const water = svgEl('g', {}, svg);
    const path = svgEl('path', { d: layout.d, fill: 'none', stroke: 'none' }, svg);

    const total = path.getTotalLength();
    const weights = stops.map((_, i) => (i <= LAST_BROOKLYN ? i : i - 1 + RIVER_WEIGHT));
    const lens = weights.map((w) => (total * w) / weights[last]);
    const pts = lens.map((l) => path.getPointAtLength(l));

    const sample = (a: number, b: number) => {
      let d = '';
      for (let s = a; s < b; s += 3) {
        const p = path.getPointAtLength(s);
        d += `${d ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      }
      const e = path.getPointAtLength(b);
      return `${d}L${e.x.toFixed(1)} ${e.y.toFixed(1)}`;
    };

    // East River: a band perpendicular to the line, halfway through the river hop.
    const mid = (lens[LAST_BROOKLYN] + lens[LAST_BROOKLYN + 1]) / 2;
    const m = path.getPointAtLength(mid);
    const t0 = path.getPointAtLength(mid - 1);
    const t1 = path.getPointAtLength(mid + 1);
    const tl = Math.hypot(t1.x - t0.x, t1.y - t0.y) || 1;
    const n = { x: -(t1.y - t0.y) / tl, y: (t1.x - t0.x) / tl }; // normal to the line
    const [back, fwd, at] = kind === 'wide' ? [100, 130, 118] : [300, 30, -170];
    svgEl('line', { class: 'sw-water', x1: m.x - n.x * back, y1: m.y - n.y * back, x2: m.x + n.x * fwd, y2: m.y + n.y * fwd }, water);
    const lx = m.x + n.x * at;
    const ly = m.y + n.y * at;
    const angle = (Math.atan2(n.y, n.x) * 180) / Math.PI;
    const rot = angle > 90 || angle < -90 ? angle + 180 : angle;
    const wl = svgEl('text', { class: 'sw-water-label', transform: `translate(${lx} ${ly}) rotate(${rot})` }, water);
    wl.textContent = 'East River';

    svgEl('path', { class: 'sw-track', d: sample(0, lens[LAST_BROOKLYN]) }, svg);
    svgEl('path', { class: 'sw-track sw-tunnel', d: sample(lens[LAST_BROOKLYN], lens[LAST_BROOKLYN + 1]) }, svg);
    svgEl('path', { class: 'sw-track', d: sample(lens[LAST_BROOKLYN + 1], total) }, svg);
    const ride = svgEl('path', { class: 'sw-ride', d: layout.d }, svg);

    for (const b of layout.boroughs) {
      const t = svgEl('text', { class: 'sw-borough', x: b.x, y: b.y, 'text-anchor': b.anchor }, svg);
      t.textContent = b.text;
    }

    const stopEls = stops.map((s, i) => {
      const g = svgEl('g', { class: 'sw-stop', role: 'button', tabindex: 0, 'aria-label': `Stop ${i + 1} of ${stops.length}: ${s.name}`, transform: `translate(${pts[i].x} ${pts[i].y})` }, svg);
      svgEl('circle', { class: 'hit', r: 15 }, g);
      svgEl('circle', { class: 'dot', r: 5.5 }, g);
      g.addEventListener('click', () => {
        halt();
        go(i);
      });
      g.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          halt();
          go(i);
        }
      });
      return g;
    });

    stops.forEach((s, i) => {
      const l = layout.label(i);
      const t = svgEl('text', { class: 'sw-label', transform: l.transform, 'text-anchor': l.anchor }, stopEls[i]);
      t.textContent = s.name;
    });

    const train = svgEl('g', { class: 'sw-train' }, svg);
    svgEl('circle', { r: 11 }, train);
    const tt = svgEl('text', {}, train);
    tt.textContent = '2';

    update = () => {
      ride.style.strokeDasharray = `${lens[index]} ${total}`;
      train.style.transform = `translate(${pts[index].x}px, ${pts[index].y}px)`;
      stopEls.forEach((g, i) => {
        g.classList.toggle('is-passed', i <= index);
        g.classList.toggle('is-current', i === index);
      });
      readout.textContent = stops[index].name;
      note.textContent = stops[index].note ?? '';
      slider.value = String(index);
      slider.setAttribute('aria-valuetext', stops[index].name);
    };
    update();
  }

  slider.addEventListener('input', () => {
    halt();
    go(Number(slider.value));
  });

  play.addEventListener('click', () => {
    if (timer) return halt();
    if (index === last) go(0);
    play.textContent = 'Pause';
    timer = window.setInterval(() => {
      if (index >= last) return halt();
      go(index + 1);
      if (index === last) halt();
    }, 550);
  });

  const fit = () => {
    const w = mount.clientWidth;
    root.classList.toggle('is-stacked', w < 900);
    const next: Kind = w < 520 ? 'tall' : 'wide';
    if (next !== kind || !mapBox.firstChild) {
      kind = next;
      draw();
    }
  };
  new ResizeObserver(fit).observe(mount);
  fit();
}
