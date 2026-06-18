"use client";

import React from "react";
import { ReactLenis } from "lenis/dist/lenis-react";
import { Nav } from "@/components/nav";
import { CurtainFooter } from "@/components/curtain-footer";
import { Building2, ArrowUpRight, Trophy, Users, Globe, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen text-[#111111]">
      <ReactLenis root options={{ lerp: 0.05 }}>
        <Nav />
        
        {/* Main Content Section */}
        <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10">
          {/* Top Heading */}
          <div className="mb-16">
            <p className="text-[#e31e24] font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Who We Are</p>
            <h1 className="editorial-title text-[#111111] mb-6">ABOUT US</h1>
            <p className="text-xl text-zinc-500 max-w-2xl font-medium">
              Discover our history, values, and what makes KS School of Business Management & IT a center of academic excellence.
            </p>
          </div>

          {/* Bento Grid layout */}
          <div className="relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f0f0f2]/30 -skew-x-12 translate-x-1/4 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-center">
                <div className="lg:col-span-7">
                  <p className="text-[#e31e24] font-bold uppercase tracking-[0.3em] text-[10px] mb-4">The Legacy</p>
                  <h2 className="editorial-title text-[#111111] mb-0">
                    Rooted in <br />
                    <span className="italic font-light">Tradition</span>, <br />
                    Built for <span className="italic text-[#e31e24]">Impact</span>.
                  </h2>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-[#111111] text-lg leading-relaxed font-medium border-l-4 border-[#e31e24] pl-8">
                    Established in 1993, K.S. School of Business Management is a pioneer in integrated education, offering unique 5-year programs that blend academic rigor with industry relevance.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Main Campus Card */}
                <div className="md:col-span-8 bento-card border-none relative overflow-hidden group min-h-[350px]">
                  <img 
                    src="https://picsum.photos/seed/campus-arch/1200/800" 
                    alt="Campus" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f0f0f2]/85 via-[#f0f0f2]/20 to-transparent" />
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#e31e24] shadow-sm">
                        <Building2 size={24} />
                      </div>
                      <div className="bg-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#111111]">
                        Campus
                      </div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-display font-bold mb-3 text-[#111111]">World-Class Campus</h3>
                      <p className="text-[#111111] max-w-md leading-relaxed font-medium">
                        Located in the heart of Gujarat University, our campus provides a serene yet dynamic environment for learning and growth.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="md:col-span-4 bento-card !bg-[#e31e24] text-white border-none flex flex-col justify-center items-start md:items-center text-left md:text-center py-10">
                  <Trophy size={40} className="mb-4 text-white/80" />
                  <div className="text-7xl font-display font-bold mb-1 tracking-tighter text-white">30+</div>
                  <div className="text-white uppercase tracking-[0.2em] text-[10px] font-bold">Years of Excellence</div>
                </div>

                {/* Alumni Card */}
                <div className="md:col-span-4 bento-card !bg-[#111111] text-white border-none flex flex-col justify-between min-h-[180px]">
                  <Users size={32} className="text-[#e31e24]" />
                  <div>
                    <div className="text-4xl font-display font-bold mb-1 text-white">10k+</div>
                    <div className="text-white uppercase tracking-widest text-[10px] font-bold">Global Alumni</div>
                  </div>
                </div>

                {/* Small Feature Cards */}
                <div className="md:col-span-4 bento-card border-black/5 hover:bg-white transition-colors">
                  <Globe size={24} className="mb-4 text-[#e31e24]" />
                  <h4 className="text-lg font-display font-bold mb-2">Global Reach</h4>
                  <p className="text-[#111111] text-xs leading-relaxed font-medium">Leading innovation in top multinationals across the globe.</p>
                </div>

                <div className="md:col-span-4 bento-card border-black/5 hover:bg-white transition-colors">
                  <ShieldCheck size={24} className="mb-4 text-[#e31e24]" />
                  <h4 className="text-lg font-display font-bold mb-2">Affiliated</h4>
                  <p className="text-[#111111] text-xs leading-relaxed font-medium">Gujarat University standards maintained for decades.</p>
                </div>

                
              </div>
            </div>
          </div>
        </main>

        <CurtainFooter />
      </ReactLenis>
    </div>
  );
}
