"use client";

import { motion } from "framer-motion";
import { ScrollFloat } from "./scroll-float";

export const SchoolTitle = () => {
  return (
    <section id="intro-reveal" className="relative bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-16 md:px-10 md:py-24">
        <motion.p
          className="mb-5 text-center text-xs font-light uppercase tracking-[0.5em] text-zinc-400 md:text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          Welcome to
        </motion.p>

        <ScrollFloat
          className="mb-2 text-center font-black uppercase tracking-[0.05em] text-zinc-900 leading-[1.2]"
          stagger={0.018}
        >
          KS School of Business
        </ScrollFloat>

        <ScrollFloat
          className="mb-2 text-center font-black uppercase tracking-[0.05em] text-zinc-800 leading-[1.2]"
          stagger={0.018}
        >
          Management &amp;
        </ScrollFloat>

        <ScrollFloat
          className="text-center font-black uppercase tracking-[0.05em] text-zinc-700 leading-[1.2]"
          stagger={0.018}
        >
          Information Technology
        </ScrollFloat>

        <motion.div
          className="mx-auto mb-5 mt-7 h-[1px] w-24 bg-zinc-300"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        />

        <motion.p
          className="mx-auto max-w-md px-6 text-center text-sm font-light leading-relaxed text-zinc-400 md:text-[15px]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          Empowering minds through business excellence and cutting-edge
          technology education.
        </motion.p>
      </div>
    </section>
  );
};
