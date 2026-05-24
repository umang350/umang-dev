import { SVGProps, useEffect, useState } from "react";
import Link from "next/link";
import { routes, routesJA, Route } from "../../data/global";
import useDelayedRender from "@/lib/ga/useDelayedRender";
import styles from './MobileNavbar.module.css';
import { useRouter } from "next/router";

export default function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    isMenuOpen,
    {
      enterDelay: 20,
      exitDelay: 300,
    }
  );

  const { locale, pathname } = useRouter();
  let routesData: Route[];
  let pageLogoText = "";

  if (locale === "ja") {
    routesData = routesJA;
    pageLogoText = "ウマング.dev";
  } else {
    routesData = routes;
    pageLogoText = "UMANG.dev";
  }

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = "";
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = "hidden";
    }
  }

  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <nav className="bg-dash-sidebar/95 glass border-b border-dash-border">
      <div className="flex items-center justify-between px-5 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-dash-acc to-dash-acc2 flex items-center justify-center text-sm font-extrabold text-white shadow-lg shadow-dash-acc/30">
            U
          </div>
          <span className="text-sm font-bold text-dash-text">{pageLogoText}</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {isMenuOpen && (
            <div className="flex gap-2 items-center">
              <a
                href="https://www.linkedin.com/in/thisumang/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-dash-border flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="text-dash-muted" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </a>
              <a
                href="mailto:job@umang.dev"
                className="text-xs font-bold text-dash-acc border border-dash-acc/30 rounded-lg px-3 py-1.5"
              >
                Contact
              </a>
            </div>
          )}

          <button
            className={`${styles.burger} visible lg:hidden`}
            aria-label="Toggle menu"
            type="button"
            onClick={toggleMenu}
          >
            <MenuIcon data-hide={isMenuOpen} />
            <CrossIcon data-hide={!isMenuOpen} />
          </button>
        </div>
      </div>

      {isMenuMounted && (
        <ul
          className={`${styles.menu} flex flex-col bg-dash-bg sticky z-50 ${isMenuRendered && styles.menuRendered}`}
        >
          {routesData.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <li
                className={`border-b border-dash-border text-sm font-semibold ${isActive ? "text-dash-acc" : "text-dash-text"}`}
                style={{ transitionDelay: `${150 + index * 25}ms` }}
                key={item.title}
              >
                <Link href={item.path} className="flex w-auto pb-4" onClick={() => { setIsMenuOpen(false); document.body.style.overflow = ""; }}>
                  <span className="mr-3 text-[11px] opacity-50">
                    {item.title === "Home" || item.title === "ホーム" ? "◆" :
                     item.title === "About Me" || item.title === "私について" ? "◉" :
                     item.title === "Projects" || item.title === "プロジェクト" ? "◈" :
                     item.title === "Impact" || item.title === "インパクト" ? "◫" :
                     "▸"}
                  </span>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}


function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="h-5 w-5 absolute text-dash-text"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path d="M2.5 7.5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 12.5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="h-5 w-5 absolute text-dash-text"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
