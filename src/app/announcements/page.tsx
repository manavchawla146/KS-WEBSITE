import React from "react";
import { ReactLenis } from "lenis/dist/lenis-react";
import { Nav } from '@/components/nav';
import { CurtainFooter } from '@/components/curtain-footer';
import AnnouncementsSection from '@/components/AnnouncementsSection';

export const metadata = {
  title: 'Announcements - KS School',
};

export default function AnnouncementsPage() {
  return (
    <div className="bg-white min-h-screen text-[#111111]">
      <ReactLenis root options={{ lerp: 0.05 }}>
        <Nav />

        <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10">
          <AnnouncementsSection />
        </main>

        <CurtainFooter />
      </ReactLenis>
    </div>
  );
}
