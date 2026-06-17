"use client";

import React from "react";
import { ReactLenis } from "lenis/dist/lenis-react";
import { Nav } from "@/components/nav";
import { CurtainFooter } from "@/components/curtain-footer";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MScPage() {
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
                <p className="text-xl text-zinc-700 leading-relaxed mb-6">
                  The M.Sc. (CA & IT) program is a five-year integrated course designed to build strong foundations in computer applications, software development and information systems. Students gain hands-on experience with modern technologies and industry-relevant projects.
                </p>
                <ul className="list-disc pl-5 text-zinc-600 space-y-2">
                  <li>Core topics: Programming, Databases, Networking, Algorithms.</li>
                  <li>Industry projects and internships with partner companies.</li>
                  <li>Focus on applied skills, cloud, and data technologies.</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </main>

        <CurtainFooter />
      </ReactLenis>
    </div>
  );
}
