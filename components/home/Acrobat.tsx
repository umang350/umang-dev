import React, { useEffect, useRef } from "react";
import { MiniMe } from "./Journey";

// While the page rests at the top, the mini-me stands on the surname and runs a little routine on a loop:
// a backflip, cartwheels along the letters, a wave, and a float on the umbrella. Once you scroll he hops off
// (the one in Journey takes over the trip down the page), and he comes back when you return to the top and
// stop for a moment. The routine itself is CSS (globals.css, "acro-"); this only decides when he's on stage.
// Reduced motion: he just stands there.
export default function Acrobat({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer = 0;
    const update = () => {
      window.clearTimeout(timer);
      if (window.scrollY > 40) { el.dataset.on = "0"; return; }
      // Back at the top: give it a beat after the scroll stops before he hops back on.
      timer = window.setTimeout(() => { el.dataset.on = "1"; }, el.dataset.on === "0" ? 700 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => { window.removeEventListener("scroll", update); window.clearTimeout(timer); };
  }, []);

  return (
    <span ref={ref} data-on="1" aria-hidden="true" className={`acro pointer-events-none absolute z-30 block ${className}`}>
      <span className="acro-x block h-full w-full">
        <span className="acro-y block h-full w-full">
          <span className="acro-r block h-full w-full">
            <MiniMe />
          </span>
        </span>
      </span>
    </span>
  );
}
