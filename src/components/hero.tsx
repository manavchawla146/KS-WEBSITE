"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

const SECTION_HEIGHT = 1500;

/* -----------------------------------------------
   HERO SECTION
   ----------------------------------------------- */
export const Hero = () => (
  <div
    style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
    className="relative w-full"
  >
    <CenterImage />
    <ParallaxImages />
    <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-white/0 to-white" />
  </div>
);

/* -----------------------------------------------
   CENTER VIDEO (with cinematic dimming overlay)
   ----------------------------------------------- */
const CenterImage = () => {
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Scale + fade out - GPU accelerated
  const scale = useTransform(scrollY, [0, 1500], [1.5, 1]);
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  // 🌘 Dark overlay opacity - simplified
  const overlayOpacity = useTransform(
    scrollY,
    [0, 600, 1200],
    [0, 0.35, 0.55]
  );

  return (
    <div
      ref={containerRef}
      className="sticky top-0 h-screen w-full overflow-hidden bg-black"
    >
      {/* Video Container with fade-in + scroll zoom */}
      <motion.div
        className="h-full w-full"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ 
          opacity: videoLoaded ? 1 : 0,
          scale: videoLoaded ? 1 : 1.04 
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          scale: videoLoaded ? scale : undefined,
          opacity: videoLoaded ? opacity : undefined,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        {/* 🎥 Background Video - optimized */}
        {videoError ? (
          <div className="h-full w-full flex items-center justify-center bg-gray-900">
            <p className="text-white">Video failed to load</p>
          </div>
        ) : (
          <video
            src="/clg.mp4"
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => {
              console.error("Video failed to load");
              setVideoError(true);
            }}
            style={{ 
              transform: "translateZ(0)",
              willChange: "transform"
            }}
          />
        )}
      </motion.div>

      {/* 🌘 Cinematic Dark Overlay - separate layer */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ 
          opacity: overlayOpacity,
          willChange: "opacity",
        }}
      />
    </div>
  );
};

/* -----------------------------------------------
   PARALLAX IMAGES
   ----------------------------------------------- */
const ParallaxImages = () => (
  <motion.div
    className="mx-auto max-w-5xl px-4 pt-[200px]"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
  >
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
    <ParallaxImg
      src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
      alt="Classroom session"
      start={0}
      end={-500}
      className="ml-24 w-5/12"
    />
  </motion.div>
);

interface ParallaxImgProps {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}

/* -----------------------------------------------
   INDIVIDUAL PARALLAX IMAGE
   ----------------------------------------------- */
const ParallaxImg = ({
  className,
  alt,
  src,
  start,
  end,
}: ParallaxImgProps) => {
  const ref = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);

  return (
    <motion.div
      className={className}
      ref={ref}
      style={{ 
        y,
        scale,
        opacity,
        willChange: "transform",
        transformOrigin: "center center",
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto"
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  );
};