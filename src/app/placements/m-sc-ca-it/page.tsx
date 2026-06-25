"use client";

import React, { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/dist/lenis-react";
import { Nav } from "@/components/nav";
import { CurtainFooter } from "@/components/curtain-footer";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// --- 🎛️ MARQUEE CONFIG ---
const TIME_PER_LOOP = 29; // lower = faster base speed (was 25)
const SCROLL_POWER = 0.003;
const BRAKE_DURATION = 0.8;

export default function PlacementsMSc() {
  const marqueeRowRef = useRef(null);
  const firstLogoRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  // GSAP rolling marquee — replaces the CSS keyframe version
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const row = marqueeRowRef.current;
    const firstLogo = firstLogoRef.current;
    if (!row || !firstLogo) return;

    // 1. AUTO-FILL: clone the logo set until the row is wide enough
    function populateMarquee() {
      const content = firstLogo.outerHTML;
      let currentWidth = firstLogo.offsetWidth;
      const targetWidth = window.innerWidth * 3;

      while (currentWidth < targetWidth) {
        row.insertAdjacentHTML("beforeend", content);
        currentWidth += firstLogo.offsetWidth;
      }
    }
    populateMarquee();

    // 2. GSAP ROLL ENGINE
    function roll(targets, vars, reverse) {
      vars = vars || {};
      vars.ease || (vars.ease = "none");

      const tl = gsap.timeline({
          repeat: -1,
          onReverseComplete() {
            this.totalTime(this.rawTime() + this.duration() * 10);
          }
        }),
        elements = gsap.utils.toArray(targets),
        clones = elements.map((el) => {
          let clone = el.cloneNode(true);
          el.parentNode.appendChild(clone);
          return clone;
        }),
        positionClones = () =>
          elements.forEach((el, i) =>
            gsap.set(clones[i], {
              position: "absolute",
              overwrite: false,
              top: el.offsetTop,
              left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth)
            })
          );

      positionClones();

      elements.forEach((el, i) =>
        tl.to([el, clones[i]], { xPercent: reverse ? 100 : -100, ...vars }, 0)
      );

      const handleResize = () => {
        let time = tl.totalTime();
        tl.totalTime(0);
        positionClones();
        tl.totalTime(time);
      };
      window.addEventListener("resize", handleResize);
      tl._cleanupResize = () => window.removeEventListener("resize", handleResize);

      return tl;
    }

    // 3. START ANIMATION
    let direction = 1;
    const marquee = roll(row, { duration: TIME_PER_LOOP }, true);

    // 4. SCROLL VELOCITY DRIVES SPEED
    let scrollTimeout;
    const trigger = ScrollTrigger.create({
      onUpdate(self) {
        let velocity = self.getVelocity();

        if (Math.abs(velocity) > 5) {
          direction = velocity > 0 ? 1 : -1;
        }

        let velocityFactor = 1 + Math.abs(velocity) * SCROLL_POWER;
        gsap.to(marquee, {
          timeScale: velocityFactor * direction,
          duration: 0.1,
          overwrite: true
        });

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          gsap.to(marquee, {
            timeScale: direction,
            duration: BRAKE_DURATION,
            overwrite: true
          });
        }, 100);
      }
    });

    // CLEANUP
    return () => {
      clearTimeout(scrollTimeout);
      trigger.kill();
      marquee.kill();
      if (marquee._cleanupResize) marquee._cleanupResize();
      if (row) row.innerHTML = "";
    };
  }, []);

  const hero = "https://picsum.photos/seed/placement-hero-msc/1200/900";
  const logos = [
    "https://picsum.photos/seed/company1/300/120",
    "https://picsum.photos/seed/company2/300/120",
    "https://picsum.photos/seed/company3/300/120",
    "https://picsum.photos/seed/company4/300/120",
    "https://picsum.photos/seed/company5/300/120",
    "https://picsum.photos/seed/company6/300/120",
    "https://picsum.photos/seed/company7/300/120",
    "https://picsum.photos/seed/company8/300/120",
  ];

  return (
    <div className="bg-white min-h-screen text-[#111111]">
      <ReactLenis root options={{ lerp: 0.05 }}>
        <Nav />

        <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10">
          <div className="mb-12">
            <p className="text-[#e31e24] font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Placements</p>
            <h1 className="editorial-title text-[#111111] mb-6">MSc (CA & IT) Placements</h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12"
          >
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="prose prose-lg text-zinc-700 space-y-6">
                <p>
                  Under the five year integrated programme, on successful completion of three years, students are awarded BSc degree and on completion of fifth year MSc degree.
                </p>

                <p>
                  In the first three years the focus is on teaching fundamentals in communication, mathematics etc. BSC course covers basic programming languages, web designing, basic data base and networking. The pedagogy used is core class room teaching supported with real business world examples and practical laboratory sessions.
                </p>

                <p>
                  MSC syllabus includes advanced level networking, software project management etc. The pedagogy at this level is dissertation, live projects in addition to class room teaching and laboratory sessions.
                </p>
                <p>
                  The students are trained in the latest technologies and tools used in the industry. The students are also given training in soft skills, communication skills, aptitude and reasoning. The students are also given training in entrepreneurship and innovation.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img src={hero} alt="Placements" className="w-full h-[420px] object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </motion.div>

          {/* Logo marquee — GSAP scroll-velocity driven */}
          <section className="mt-8">
            <h3 className="text-center text-xl font-semibold mb-6">Some Of Our Past Recruiters</h3>
            <div className="relative overflow-hidden h-20">
              <div
                className="flex gap-8 items-center h-20 absolute top-0 left-0"
                ref={marqueeRowRef}
              >
                {logos.map((src, i) => (
                  <div
                    key={i}
                    className="w-40 h-20 flex items-center justify-center shrink-0"
                    ref={i === 0 ? firstLogoRef : null}
                  >
                    <img src={src} alt={`logo-${i}`} className="max-h-12 object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <CurtainFooter />
      </ReactLenis>
    </div>
  );
}