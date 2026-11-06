import React, { useEffect, useRef } from "react";

// A small me, in the navy hoodie and sunglasses from the Paris clip, who steps off the bottom of the hero,
// opens an umbrella and floats down the page on a dashed route as you scroll: down one side of a section,
// swooping across the gap to the other side for the next, until he lands on the "Let's talk" card and waves.
//
// The route is built from the page itself: every element marked data-journey is a stop, in page order.
// "start" is where he stands (its bottom edge), "end" is where he lands (its top edge), and everything in
// between is a section he floats past. Sections are opaque and sit above the route, so the line shows in the
// gaps and gutters and seems to thread behind the cards.
//
// Scroll position maps to distance along the route, not straight to height, so the swoops across a gap take a
// little extra scroll instead of happening in one flick. All motion runs off one rAF loop writing styles
// directly; nothing here re-renders React. Reduced motion: no traveller, no route, nothing hidden.

const AMBER = "#f5b041";
const PAD = 150; // how much scroll, either side of a gap, the swoop borrows from the straight runs

const MiniMe = () => (
  <svg viewBox="0 0 60 100" className="h-full w-full overflow-visible" aria-hidden="true">
    {/* shadow, shown only while standing */}
    <ellipse className="mm-shadow" cx="30" cy="99" rx="13" ry="2.4" fill="rgba(0,0,0,0.35)" />
    {/* umbrella */}
    <g className="mm-canopy">
      <path d="M5 23 Q30 -5 55 23 Q49 19 43 23 Q36.5 19 30 23 Q23.5 19 17 23 Q11 19 5 23Z" fill={AMBER} />
      <path d="M30 2.5 Q22 10 17 23 Q23.5 19 30 23Z M30 2.5 Q38 10 43 23 Q36.5 19 30 23Z" fill="#f6eedb" opacity="0.9" />
      <path d="M30 0.5V3" stroke="#2a1a00" strokeWidth="1.6" strokeLinecap="round" />
    </g>
    <path d="M30 22V45q0 3.5-3.5 3.5" fill="none" stroke="#2a1a00" strokeWidth="1.6" strokeLinecap="round" />
    {/* legs */}
    <g className="mm-leg mm-leg-l"><path d="M26.5 80V94" stroke="#141823" strokeWidth="5.2" strokeLinecap="round" /><ellipse cx="25.5" cy="96.5" rx="3.8" ry="2.2" fill="#f6eedb" /></g>
    <g className="mm-leg mm-leg-r"><path d="M33.5 80V94" stroke="#141823" strokeWidth="5.2" strokeLinecap="round" /><ellipse cx="34.5" cy="96.5" rx="3.8" ry="2.2" fill="#f6eedb" /></g>
    {/* hoodie */}
    <path d="M21 82V69a9 9 0 0 1 18 0v13z" fill="#1d2436" />
    <path d="M25 63.5q5 4 10 0" fill="none" stroke="#2c3550" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M25.5 75h9" stroke="#2c3550" strokeWidth="1.4" strokeLinecap="round" />
    {/* arm holding the umbrella */}
    <path d="M36.5 66 Q41 55 31.5 41.5" fill="none" stroke="#1d2436" strokeWidth="4.6" strokeLinecap="round" />
    <circle cx="31" cy="41.5" r="2.6" fill="#c98d62" />
    {/* the other arm: hangs, or waves once he has landed */}
    <g className="mm-wave">
      <path d="M23.5 66 Q18.5 72 20 79" fill="none" stroke="#1d2436" strokeWidth="4.6" strokeLinecap="round" />
      <circle cx="20.2" cy="80" r="2.6" fill="#c98d62" />
    </g>
    {/* head */}
    <circle cx="30" cy="53" r="8.6" fill="#c98d62" />
    <path d="M21.4 52.5c-.6-6.5 3.6-10.2 9-10 5.6.2 8.8 3.6 8.2 9.6-1.4-2.6-3.6-4-6-4.4-3.2-.5-7.6.6-11.2 4.8z" fill="#141414" />
    <rect x="23.3" y="51.4" width="5.9" height="3.6" rx="1.6" fill="#141414" />
    <rect x="30.8" y="51.4" width="5.9" height="3.6" rx="1.6" fill="#141414" />
    <path d="M29.2 52.6h1.6" stroke="#141414" strokeWidth="1" />
    <path d="M26.8 57.8q3.2 2.4 6.4 0" fill="none" stroke="#5a2e1a" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

type Stop = { el: HTMLElement; role: string };

export default function Journey({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const ghost = useRef<SVGPathElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const dots = useRef<SVGGElement>(null);
  const traveller = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);

  // Sections rise into place as they scroll in. Only ones still below the fold on load are hidden first,
  // so nothing already on screen blinks, and without JavaScript nothing is hidden at all.
  useEffect(() => {
    const host = root.current;
    if (!host || window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") return;
    const items = Array.from(host.querySelectorAll<HTMLElement>("[data-reveal]"))
      .filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.remove("reveal-pending");
        e.target.classList.add("reveal-done");
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach((el) => { el.classList.add("reveal-pending"); io.observe(el); });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const host = root.current;
    const box = svg.current, g = ghost.current, tr = trail.current, dotLayer = dots.current;
    const who = traveller.current, lean = tilt.current;
    if (!host || !box || !g || !tr || !dotLayer || !who || !lean) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let total = 0;
    let knots: { y: number; len: number }[] = [];
    let waypoints: { len: number; el: SVGGElement }[] = [];
    let endEl: HTMLElement | null = null;
    let len = 0, target = 0, x = 0, rot = 0, raf = 0, ready = false;
    let pose = "";
    // Without a gutter to walk in, he ducks out of sight wherever any part of him would cover a section:
    // from when his feet reach its top until his head has cleared its bottom. Bands are in route y.
    let hidden: { top: number; bottom: number }[] = [];

    const build = () => {
      const hostRect = host.getBoundingClientRect();
      const W = hostRect.width;
      const stops: Stop[] = Array.from(host.querySelectorAll<HTMLElement>("[data-journey]")).map((el) => ({ el, role: el.dataset.journey || "" }));
      const start = stops.find((s) => s.role === "start");
      const end = stops.find((s) => s.role === "end");
      const mids = stops.filter((s) => s !== start && s !== end && s.el.offsetParent !== null);
      if (!start || !end) return;
      endEl = end.el;

      // Layout positions, not on-screen ones: sections still waiting to rise in are drawn shifted down,
      // and the route should run where they will end up.
      const rel = (el: HTMLElement) => {
        let top = 0;
        for (let n: HTMLElement | null = el; n && n !== host; n = n.offsetParent as HTMLElement | null) top += n.offsetTop;
        return { top, bottom: top + el.offsetHeight };
      };

      // Lanes: the middle of the gutters when there is room. Otherwise the thin page margin, where only the line
      // fits: the figure is wider than that, so he slips behind each card and reappears in the gap below it.
      const gutter = (document.documentElement.clientWidth - W) / 2;
      const roomy = gutter >= 90;
      const margin = Math.max(gutter / 2, 0);
      const [laneL, laneR] = roomy ? [-Math.min(gutter / 2, 80), W + Math.min(gutter / 2, 80)] : [-margin, W + margin];
      const small = W < 640;

      // He starts just under the status row: in the right gutter when there is one. Without one there is no
      // clear spot beside the text, so he stays out of sight until he has dropped clear of it.
      // In the gutter he stands a little way down, so he is clear of the big surname at the hero's bottom.
      const s = { x: roomy ? laneR : W - 60, y: rel(start.el).bottom + (roomy ? 56 : 0) };
      const e = { x: W - (small ? 70 : 170), y: rel(end.el).top };

      // Assemble the route and remember where each straight run starts and stops, as y and as distance along it.
      let d = `M${s.x} ${s.y}`;
      let prev = s;
      const runs: { a: { x: number; y: number }; b: { x: number; y: number }; bottom: number }[] = [];
      // He hangs below his feet's point on the route, so in the gutters he drops a body's height below a card
      // before swooping across, keeping his head clear of whatever sits at the bottom of the card.
      const tall = (who.firstElementChild as HTMLElement | null)?.offsetHeight ?? 80;
      const swoop = (p: { x: number; y: number }, q: { x: number; y: number }) => {
        const h = Math.max(q.y - p.y, 1);
        return ` C${p.x} ${p.y + h * 0.62} ${q.x} ${q.y - h * 0.62} ${q.x} ${q.y}`;
      };
      mids.forEach((m, i) => {
        const r = rel(m.el);
        // With gutters he starts in the right one, so the first leg drops straight down it instead of
        // cutting back across the status row.
        const lane = (i + (roomy ? 1 : 0)) % 2 === 0 ? laneL : laneR;
        const nextTop = i + 1 < mids.length ? rel(mids[i + 1].el).top : e.y;
        const drop = roomy ? Math.max(0, Math.min(tall + 6, nextTop - r.bottom - 36)) : 0;
        const a = { x: lane, y: r.top }, b = { x: lane, y: r.bottom + drop };
        d += swoop(prev, a) + ` L${b.x} ${b.y}`;
        runs.push({ a, b, bottom: r.bottom });
        prev = b;
      });
      d += swoop(prev, e);

      box.setAttribute("width", String(W));
      box.setAttribute("height", String(host.offsetHeight));
      g.setAttribute("d", d);
      tr.setAttribute("d", d);
      total = g.getTotalLength();
      tr.style.strokeDasharray = `${total} ${total}`;

      // Distance along the route at each run's ends: rebuild the prefix up to that point and measure it.
      const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
      box.appendChild(probe);
      const lengthTo = (upto: number, withRun: boolean) => {
        let pd = `M${s.x} ${s.y}`;
        let p = s;
        for (let i = 0; i <= upto; i++) {
          pd += swoop(p, runs[i].a);
          if (i < upto || withRun) { pd += ` L${runs[i].b.x} ${runs[i].b.y}`; p = runs[i].b; }
        }
        probe.setAttribute("d", pd);
        return probe.getTotalLength();
      };

      // Knots tie a scroll anchor height to a distance. Each swoop starts PAD early and finishes PAD late,
      // which spreads its sideways travel over more scroll.
      knots = [{ y: s.y, len: 0 }];
      hidden = roomy ? [] : [{ top: -Infinity, bottom: s.y }];
      runs.forEach((run, i) => {
        const lA = lengthTo(i, false), lB = lengthTo(i, true);
        // A card's empty padding is fair to overlap, so only its content area counts.
        const cs = getComputedStyle(mids[i].el);
        // Full-bleed strips reach into the gutters too, so he slips behind those on every layout.
        if (!roomy || mids[i].el.offsetWidth > W + 1) hidden.push({ top: run.a.y + parseFloat(cs.paddingTop), bottom: run.bottom - parseFloat(cs.paddingBottom) });
        const pad = Math.min(PAD, (run.b.y - run.a.y) / 2);
        knots.push({ y: run.a.y + pad, len: lA + pad });
        knots.push({ y: run.b.y - pad, len: lB - pad });
      });
      knots.push({ y: e.y, len: total });
      probe.remove();

      // A marker where the route meets each section, and a landing pad at the end.
      dotLayer.innerHTML = "";
      waypoints = runs.map((run, i) => {
        const node = document.createElementNS("http://www.w3.org/2000/svg", "g");
        node.setAttribute("class", "jr-dot");
        node.setAttribute("transform", `translate(${run.a.x} ${run.a.y})`);
        node.innerHTML = `<circle class="jr-ping" r="6" /><circle class="jr-core" r="5" />`;
        dotLayer.appendChild(node);
        return { len: lengthTo(i, false), el: node };
      });
      const pad = document.createElementNS("http://www.w3.org/2000/svg", "g");
      pad.setAttribute("class", "jr-dot jr-pad");
      pad.setAttribute("transform", `translate(${e.x} ${e.y})`);
      pad.innerHTML = `<ellipse class="jr-core" rx="18" ry="4" />`;
      dotLayer.appendChild(pad);
      waypoints.push({ len: total - 1, el: pad });

      ready = true;
      measure();
      if (!raf) { len = target; paint(true); }
    };

    // Where the anchor (a little below the middle of the screen) sits on the route.
    const measure = () => {
      if (!ready) return;
      const top = host.getBoundingClientRect().top;
      const y = window.innerHeight * 0.6 - top;
      if (y <= knots[0].y) { target = 0; return; }
      const last = knots[knots.length - 1];
      if (y >= last.y) { target = total; return; }
      for (let i = 1; i < knots.length; i++) {
        const a = knots[i - 1], b = knots[i];
        if (y <= b.y) {
          const t = b.y === a.y ? 1 : (y - a.y) / (b.y - a.y);
          target = a.len + (b.len - a.len) * t;
          return;
        }
      }
    };

    const setPose = (next: string) => {
      if (next === pose) return;
      if (next === "land" && pose && endEl) {
        endEl.classList.remove("journey-thud");
        void endEl.offsetWidth;
        endEl.classList.add("journey-thud");
      }
      pose = next;
      who.dataset.pose = next;
    };

    const paint = (instant = false) => {
      const p = g.getPointAtLength(len);
      const dx = instant ? 0 : p.x - x;
      x = p.x;
      who.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      // Fade out just after his feet pass a section's top, back in once his head is clear of its bottom.
      let seen = 1;
      const tall = who.firstElementChild ? (who.firstElementChild as HTMLElement).offsetHeight + 8 : 90;
      for (const h of hidden) {
        const a = Math.max(0, Math.min(1, (p.y - h.top + 36) / 16));
        const b = Math.max(0, Math.min(1, (h.bottom + tall - p.y) / 16));
        seen = Math.min(seen, 1 - Math.min(a, b));
      }
      who.style.opacity = String(seen);
      tr.style.strokeDashoffset = String(total - len);
      // Lean into the swing: the umbrella leads and his feet trail behind.
      const want = Math.max(-30, Math.min(30, dx * 1.4));
      rot += (want - rot) * 0.18;
      lean.style.transform = `rotate(${rot.toFixed(2)}deg)`;
      setPose(len < 1 ? "stand" : len > total - 1 ? "land" : "float");
      who.dataset.moving = Math.abs(target - len) > 2 ? "1" : "";
      waypoints.forEach((w) => w.el.classList.toggle("is-passed", len >= w.len));
    };

    const loop = () => {
      const diff = target - len;
      len = Math.abs(diff) < 0.4 ? target : len + diff * 0.12;
      paint();
      if (len !== target || Math.abs(rot) > 0.2) raf = requestAnimationFrame(loop);
      else { raf = 0; who.dataset.moving = ""; }
    };

    const onScroll = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(loop);
    };

    let pending = 0;
    const rebuild = () => { cancelAnimationFrame(pending); pending = requestAnimationFrame(build); };
    const ro = new ResizeObserver(rebuild);
    ro.observe(host);
    window.addEventListener("resize", rebuild);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.fonts?.ready.then(rebuild);
    build();

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", rebuild);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(pending);
    };
  }, []);

  return (
    <div ref={root} className="journey relative">
      <svg ref={svg} className="journey-route pointer-events-none absolute left-0 top-0 overflow-visible" aria-hidden="true">
        <path ref={ghost} fill="none" stroke={AMBER} strokeOpacity="0.35" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
        <path ref={trail} fill="none" stroke={AMBER} strokeWidth="2.5" strokeLinecap="round" />
        <g ref={dots} />
      </svg>
      {children}
      <div ref={traveller} className="journey-traveller pointer-events-none absolute left-0 top-0 z-40 opacity-0" aria-hidden="true">
        <div className="absolute bottom-0 left-0 h-[60px] w-[36px] -translate-x-1/2 sm:h-[78px] sm:w-[47px] lg:h-[96px] lg:w-[58px]">
          <span className="mm-bubble absolute -top-9 left-1/2 rounded-full bg-cream px-2.5 py-1 text-base leading-none text-black shadow-lg">👋</span>
          <div ref={tilt} className="h-full w-full origin-[50%_10%]">
            <div className="mm-sway h-full w-full origin-[50%_10%]">
              <MiniMe />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
