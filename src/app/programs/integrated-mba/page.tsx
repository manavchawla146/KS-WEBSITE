"use client";

import React from "react";
import { ReactLenis } from "lenis/dist/lenis-react";
import { Nav } from "@/components/nav";
import { CurtainFooter } from "@/components/curtain-footer";
import { motion } from "framer-motion";

export default function MBAPage() {
  const image = "https://source.unsplash.com/1600x900/?business,leadership,team";
  return (
    <div className="bg-white min-h-screen text-[#111111]">
      <ReactLenis root options={{ lerp: 0.05 }}>
        <Nav />

        <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10">
          <div className="mb-12">
            <p className="text-[#e31e24] font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Program</p>
            <h1 className="editorial-title text-[#111111] mb-6">Integrated MBA</h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-6 order-2 lg:order-1">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <p className="text-xl text-zinc-700 leading-relaxed mb-6">
                  The Integrated MBA prepares students for leadership roles by combining management theory with practical exposure. Over five years students undertake projects, case-studies and internships that prepare them for the corporate world.
                </p>
                <ul className="list-disc pl-5 text-zinc-600 space-y-2">
                  <li>Core topics: Finance, Marketing, Strategy, Operations.</li>
                  <li>Live projects, industry mentors and placement support.</li>
                  <li>Leadership labs and soft-skill development.</li>
                </ul>
              </motion.div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={image}
                  alt="Integrated MBA"
                  className="w-full h-[420px] object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "https://picsum.photos/seed/program-mba/1600/900";
                  }}
                />
              </div>
            </div>
          </motion.div>
        </main>

        <CurtainFooter />
      </ReactLenis>
    </div>
  );
}
