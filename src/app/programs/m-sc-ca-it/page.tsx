"use client";

import React, { useEffect } from "react";
import { ReactLenis } from "lenis/dist/lenis-react";
import { Nav } from "@/components/nav";
import { CurtainFooter } from "@/components/curtain-footer";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MScPage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);
  const image = "https://source.unsplash.com/1600x900/?technology,software,code";
  return (
    <div className="bg-white min-h-screen text-[#111111]">
      <ReactLenis root options={{ lerp: 0.05 }}>
        <Nav />

        <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10">
          <div className="mb-12">
            <p className="text-[#e31e24] font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Program</p>
            <h1 className="editorial-title text-[#111111] mb-6">M.Sc. (CA & IT)</h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={image}
                  alt="M.Sc. (CA & IT)"
                  className="w-full h-[420px] object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "https://picsum.photos/seed/program-msc/1600/900";
                  }}
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div className="prose prose-lg text-zinc-700 space-y-6">
                  <p>
                    Under the five year integrated programme, on successful completion of three years, students are awarded BSc degree and on completion of fifth year MSc degree.
                  </p>

                  <p>
                    In the first three years, the focus is on teaching fundamentals in communication, mathematics etc. BSC course covers basic programming languages, web designing, basic data base and networking. The pedagogy used is core class room teaching supported with real business world examples and practical laboratory sessions.
                  </p>

                  <p>
                    MSC syllabus includes advanced level networking, software project management etc. The pedagogy at this level is dissertation, live projects in addition to class room teaching and laboratory sessions.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </main>

        <CurtainFooter />
      </ReactLenis>
    </div>
  );
}
