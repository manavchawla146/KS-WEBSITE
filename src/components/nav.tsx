"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

/* -----------------------------------------------
   NAVIGATION
   ----------------------------------------------- */
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Announcements", href: "/announcements" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/#programs" },
  { label: "Placements", href: "/placements" },
  { label: "Contact", href: "/contact" },
  { label: "Papers", href: "/papers" },
];

const ABOUT_LINKS = [
  { label: "Message from Director's Desk", href: "/about/message-from-director" },
];

const FACULTY_LINKS = [
  { label: "MSc IT Faculty", href: "/faculty/msc-it" },
  { label: "MBA Faculty", href: "/faculty/mba" },
];

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <img src="/ks-logo.png" alt="KS School" className="h-10 w-auto" />
            <div className="hidden flex-col md:flex">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                KS School of
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-900">
                Business Management &amp; IT
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              link.label === 'About' ? (
                <div key="about" className="relative group py-2">
                  <button className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-zinc-900 cursor-pointer">
                    About <FiChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white border border-zinc-200 rounded-md shadow-lg p-2 mt-2 transition-all duration-300 origin-top scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible z-50">
                    {ABOUT_LINKS.map((sublink) => (
                      <a key={sublink.label} href={sublink.href} className="block p-3 text-[10px] font-medium uppercase tracking-wider text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-sm transition-all">
                        {sublink.label}
                      </a>
                    ))}
                    <a href="/about" className="block p-3 text-[10px] font-medium uppercase tracking-wider text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-sm transition-all">About K.S. School</a>
                  </div>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-zinc-900 after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-zinc-900 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              )
            ))}

            {/* Faculty Dropdown */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-zinc-900 cursor-pointer">
                Faculty <FiChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white border border-zinc-200 rounded-md shadow-lg p-2 mt-2 transition-all duration-300 origin-top scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible z-50">
                {FACULTY_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block p-3 text-[10px] font-medium uppercase tracking-wider text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-sm transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Apply Now button removed per request */}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-zinc-900 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </motion.nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

/* -----------------------------------------------
   MOBILE MENU
   ----------------------------------------------- */
const MobileMenu = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [facultyOpen, setFacultyOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-white/95 backdrop-blur-lg md:hidden overflow-y-auto py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {NAV_LINKS.map((link, i) => (
            link.label === 'About' ? (
              <div key="about-mobile" className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setAboutOpen(!aboutOpen)}
                  className="flex items-center gap-2 text-lg font-medium uppercase tracking-[0.3em] text-zinc-600 transition-colors hover:text-zinc-900 cursor-pointer"
                >
                  About <FiChevronDown className={`transition-transform duration-300 ${aboutOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {aboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col items-center gap-3 mt-2 overflow-hidden"
                    >
                      {ABOUT_LINKS.map((sublink) => (
                        <a key={sublink.label} href={sublink.href} onClick={onClose} className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 py-1">
                          {sublink.label}
                        </a>
                      ))}
                      <a href="/about" onClick={onClose} className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 py-1">About K.S. School</a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={onClose}
                className="text-lg font-medium uppercase tracking-[0.3em] text-zinc-600 transition-colors hover:text-zinc-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {link.label}
              </motion.a>
            )
          ))}

          {/* Faculty Collapsible Option in Mobile */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: NAV_LINKS.length * 0.05 }}
          >
            <button
              onClick={() => setFacultyOpen(!facultyOpen)}
              className="flex items-center gap-2 text-lg font-medium uppercase tracking-[0.3em] text-zinc-600 transition-colors hover:text-zinc-900 cursor-pointer"
            >
              Faculty <FiChevronDown className={`transition-transform duration-300 ${facultyOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {facultyOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col items-center gap-3 mt-2 overflow-hidden"
                >
                  {FACULTY_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={onClose}
                      className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 py-1"
                    >
                      {link.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Apply Now (mobile) removed per request */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
