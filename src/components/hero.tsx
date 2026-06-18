"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SECTION_HEIGHT = 1800;

export const Hero = () => {
  return (
    <div style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }} className="relative w-full">
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-transparent to-white" />
    </div>
  );
};

// Center Video (same as before)
const CenterImage = () => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 1500], [1.4, 1]);
  const opacity = useTransform(scrollY, [SECTION_HEIGHT - 300, SECTION_HEIGHT + 300], [1, 0]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
      <motion.video
        src="/clg.mp4"
        className="h-full w-full object-cover"
        autoPlay loop muted playsInline
        style={{ scale, opacity }}
      />
      <motion.div className="absolute inset-0 bg-black/40" />
    </div>
  );
};

// Main Parallax Images
const ParallaxImages = () => {
  return (
    <>
      {/* Desktop View - Overlapping (Unchanged - Perfect as per you) */}
      <div className="hidden md:block">
        <DesktopParallaxImages />
      </div>

      {/* Mobile View Only - Stacked Vertical */}
      <div className="md:hidden">
        <MobileStackedImages />
      </div>
    </>
  );
};

/* ===================== DESKTOP (Your Original Overlapping Style) ===================== */
const DesktopParallaxImages = () => (
  <div className="mx-auto max-w-5xl px-4 pt-[200px] relative">
    <ParallaxImg
      src="https://i.pinimg.com/736x/3a/7d/08/3a7d084a604f586932598e6d7251f255.jpg"
      alt="Students studying"
      start={-200}
      end={200}
      className="w-1/3"
    />
    <ParallaxImg
      src="https://i.pinimg.com/736x/7f/d4/1f/7fd41fc5bf889c5ea953649ade847942.jpg"
      alt="Modern campus"
      start={200}
      end={-250}
      className="mx-auto w-2/3"
    />
    <ParallaxImg
      src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2670&auto=format&fit=crop"
      alt="Graduation ceremony"
      start={-200}
      end={200}
      className="ml-auto w-1/3"
    />
  </div>
);

/* ===================== MOBILE (Stacked Portrait Images) ===================== */
const MobileStackedImages = () => {
  return (
    <div className="px-4 pt-12 pb-20 space-y-20">
      <MobileStackedImage
        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&fit=crop" 
        alt="Students in class"
      />
      <MobileStackedImage
        src="https://images.unsplash.com/photo-1591115765373-5207767f7d7b?q=80&w=800&fit=crop"
        alt="Campus life"
      />
      <MobileStackedImage
        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&fit=crop"
        alt="Graduation moment"
      />
    </div>
  );
};

const MobileStackedImage = ({ src, alt }: { src: string; alt: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.85], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.2, 0.75], [0.88, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="w-full"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto rounded-3xl shadow-2xl object-cover"
        loading="lazy"
      />
    </motion.div>
  );
};

/* ===================== Desktop Parallax Image Component ===================== */
interface ParallaxImgProps {
  src: string;
  alt: string;
  start: number;
  end: number;
  className?: string;
}

const ParallaxImg = ({ src, alt, start, end, className }: ParallaxImgProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const opacity = useTransform(scrollYProgress, [0.65, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.6, 1], [1, 0.9]);

  return (
    <motion.div ref={ref} className={className} style={{ y, opacity, scale }}>
      <img src={src} alt={alt} className="w-full h-auto rounded-3xl shadow-2xl" loading="lazy" />
    </motion.div>
  );
};