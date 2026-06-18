"use client";

import React, { useEffect } from "react";
import { ReactLenis } from "lenis/dist/lenis-react";
import { Nav } from "@/components/nav";
import { CurtainFooter } from "@/components/curtain-footer";
import { motion } from "framer-motion";

export default function DirectorMessagePage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  const image = "https://source.unsplash.com/1200x1200/?portrait,person,leader";

  return (
    <div className="bg-white min-h-screen text-[#111111]">
      <ReactLenis root options={{ lerp: 0.05 }}>
        <Nav />

        <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10">
          <div className="mb-12">
            <p className="text-[#e31e24] font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Message</p>
            <h1 className="editorial-title text-[#111111] mb-6">Message from Director's Desk</h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-6 order-1 lg:order-1">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={image}
                  alt="Director"
                  className="w-full h-[420px] object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "https://picsum.photos/seed/director/1200/1200";
                  }}
                />
              </div>
            </div>

            <div className="lg:col-span-6 order-2 lg:order-2">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <p className="text-xl text-zinc-700 leading-relaxed mb-6">
                  Welcome to KS School of Business Management &amp; IT. It is my privilege to lead an institution committed to excellence in education, research and character building. Our students engage with industry-aligned curricula and experiential learning that prepares them to be responsible leaders.
                </p>
                <p className="text-zinc-600 mb-4">
                  At KS School, we focus on holistic development — combining strong academics with practical exposure through internships, industry projects and industry interaction.
                </p>
                <p className="text-zinc-600">
                  We invite you to explore our programs, meet our faculty, and become part of a community that values innovation, integrity and impact.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </main>

        <CurtainFooter />
      </ReactLenis>
    </div>
  );
}
