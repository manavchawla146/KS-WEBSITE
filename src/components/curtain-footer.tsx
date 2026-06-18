"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

/* -----------------------------------------------
   CURTAIN FOOTER
   Fixed to bottom — revealed as content scrolls
   away above it. Curtain effect: the previous
   section lifts like a curtain to show the footer.
   ----------------------------------------------- */
export const CurtainFooter = () => {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";

  const handleAnchor = useCallback((e: any, item: { href: string; open?: string }) => {
    const href = item.href;
    if (!href || !href.startsWith("#")) return;
    const targetId = href.replace(/^#/, "");
    // If we're already on the homepage, prevent default and smooth-scroll
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      // If item has an `open` id, set search param so the component picks it up
      if (item.open) {
        const newUrl = `/?open=${encodeURIComponent(item.open)}#${targetId}`;
        history.replaceState(null, "", newUrl);

        // dispatch open after updating URL so Infrastructure can open immediately
        try {
          window.dispatchEvent(new CustomEvent("openInfrastructure", { detail: { open: item.open } }));
        } catch (err) {
          // ignore
        }
      } else {
        // For plain "Infrastructure" clicks, first request the infrastructure to close any active item,
        // then replace the URL (removing ?open) and scroll into view.
        try {
          window.dispatchEvent(new CustomEvent("closeInfrastructure"));
        } catch (err) {
          // ignore
        }

        const base = window.location.pathname.split("?")[0] || "/";
        history.replaceState(null, "", `${base}#${targetId}`);
      }

      // Try to scroll to the target element, retrying briefly if it's not yet in the DOM
      const tryScroll = (attempt = 0) => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        if (attempt < 10) {
          setTimeout(() => tryScroll(attempt + 1), 50);
        }
      };
      tryScroll();
    }
    // Otherwise let the Link navigate to `/?open=...#infrastructure` (href supplied below)
  }, []);
  return (
    <div
      className="relative md:h-[800px] h-auto"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="w-full md:fixed md:bottom-0 md:h-[800px]">
        <div className="bg-[#0a0a0a] text-[#a1a1aa] h-full flex flex-col justify-between p-8 md:p-16 lg:p-24">

          {/* Grain texture */}
          <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat pointer-events-none" />

          {/* top spacing (logo removed for cleaner footer) */}

          {/* Top section */}
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div className="flex flex-col items-start md:w-1/2">
              <div className="flex items-center gap-6">
                <h2 className="text-7xl md:text-[6.5rem] leading-none font-extrabold text-white">KS</h2>
                <div className="hidden md:block text-lg text-zinc-300">
                  <div className="leading-tight">School of Business Management</div>
                  <div className="leading-tight">&amp; Information Technology</div>
                </div>
              </div>

              <div className="block md:hidden mt-3 text-sm text-zinc-300">
                <div>School of Business Management</div>
                <div>&amp; Information Technology</div>
                <div className="mt-1 text-sm text-zinc-400">Gujarat, India</div>
              </div>
              {/* small spacer (logo removed) */}
            </div>

            <div className="hidden md:block text-right space-y-2 md:w-1/2">
              <p className="text-base text-zinc-300">KS School of Business Management</p>
              <p className="text-base text-zinc-300">&amp; Information Technology</p>
              <p className="text-sm text-zinc-400 mt-3">Gujarat, India</p>
            </div>
          </div>

          {/* Middle: Quick links grid */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600 mb-4">Programs</p>
              <div className="space-y-3">
                {[
                  { label: "M.Sc. (CA & IT)", href: "/programs/m-sc-ca-it" },
                  { label: "Integrated MBA", href: "/programs/integrated-mba" },
                ].map((p, i) => (
                  <Link
                    key={i}
                    href={p.href}
                    className="block text-base text-zinc-500 hover:text-white transition-colors duration-300"
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600 mb-4">Campus</p>
              <div className="space-y-3">
                {[
                  { label: "Infrastructure", href: "#infrastructure" },
                  { label: "Auditorium", href: "#infrastructure", open: "auditorium" },
                  { label: "Labs", href: "#infrastructure", open: "lab" },
                ].map((item, i) => {
                  // Render a stable href on server to avoid hydration mismatch.
                  const href = item.open ? `/?open=${item.open}#infrastructure` : `/#infrastructure`;
                  return (
                    <Link
                      key={i}
                      href={href}
                      onClick={(e) => handleAnchor(e, item)}
                      className="block text-base text-zinc-500 hover:text-white transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600 mb-4">Connect</p>
              <div className="space-y-3">
                {[
                  { label: "Contact Us", href: "/contact" },
                  { label: "Placements", href: "/placements" },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="block text-base text-zinc-500 hover:text-white transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom: Social links + copyright */}
          <div className="relative z-10 border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
                {[
                  { label: "LinkedIn", href: "https://www.linkedin.com/school/k-s-school-business-management-and-information-technology/posts/?feedView=all" },
                  { label: "Instagram", href: "https://www.instagram.com/ks_mscit_official?igsh=MW5qY3B2aWtzbTMwZg==" },
                  { label: "YouTube", href: "https://www.youtube.com/@k.s.schoolofbusinessmanage1447" }
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between text-xl hover:text-white transition-colors duration-300"
                  >
                    {s.label}
                    <ArrowUpRight
                      size={18}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </a>
                ))}
              </div>
              <div className="flex flex-col items-start md:items-end flex-shrink-0">
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-700">
                  &copy; 2026 KS SBMIT. All rights reserved.
                </p>
                <p className="text-sm md:text-base text-zinc-20 mt-2 font-semibold">Made by MANAV &amp; RAJ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
