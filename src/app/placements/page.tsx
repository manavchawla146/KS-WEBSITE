"use client";

import React from "react";
import { ReactLenis } from "lenis/dist/lenis-react";
import { Nav } from "@/components/nav";
import { CurtainFooter } from "@/components/curtain-footer";
import { PlacementReveal } from "@/components/placement";

export default function PlacementsPage() {
  return (
    <div className="bg-white min-h-screen text-[#111111] flex flex-col">
      <ReactLenis root options={{ lerp: 0.05 }}>
        <Nav />
        
        {/* Main Content Section */}
        <main className="flex-grow pt-32 pb-24 relative z-10 flex flex-col min-h-screen">
          <PlacementReveal />
        </main>

        <CurtainFooter />
      </ReactLenis>
    </div>
  );
}
