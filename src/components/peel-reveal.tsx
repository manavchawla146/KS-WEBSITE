"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* -----------------------------------------------
   PEEL REVEAL — white fold peels away to reveal
   custom content behind it. Site vibe: zinc/
   white, minimal, premium.
   ----------------------------------------------- */
export const PeelReveal = ({
  foldTitle,
  foldSubtitle,
  children,
  containerHeight = "h-[300vh]",
}: {
  foldTitle: string;
  foldSubtitle: string;
  children: React.ReactNode;
  containerHeight?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className={`${containerHeight} bg-zinc-900 relative`}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">{children}</div>

        <motion.div
          className="absolute inset-0 bg-white flex flex-col items-center justify-center origin-top-right z-10"
          style={{
            rotate: useTransform(scrollYProgress, [0, 1], [0, -90]),
            x: useTransform(scrollYProgress, [0, 1], [0, -500]),
            y: useTransform(scrollYProgress, [0, 1], [0, 500]),
            borderRadius: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]),
          }}
        >
          <p className="text-xs font-light uppercase tracking-[0.5em] text-zinc-400 mb-6">
            Discover
          </p>
          <h2 className="text-6xl md:text-8xl font-black text-zinc-900 tracking-tighter text-center leading-[0.9] whitespace-pre-line">
            {foldTitle}
          </h2>
          <p className="text-lg md:text-xl font-light text-zinc-400 mt-6 tracking-wide">
            {foldSubtitle}
          </p>
          <div className="mt-10 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-900">
            <span>Scroll to explore</span>
            <ArrowRight size={14} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
