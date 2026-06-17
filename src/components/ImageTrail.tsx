"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
const getDistance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.hypot(x2 - x1, y2 - y1);

const unsplashImages = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
];

interface ImageTrailProps {
  images?: string[];
  trailDistance?: number;
  className?: string;
}

export default function ImageTrail({
  images = unsplashImages,
  trailDistance = 100,
  className = "",
}: ImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLImageElement | null)[]>([]);

  const state = useRef({
    mousePos: { x: 0, y: 0 },
    cacheMousePos: { x: 0, y: 0 },
    lastMousePos: { x: 0, y: 0 },
    imgPosition: 0,
    zIndexVal: 1,
  });

  useEffect(() => {
    const handleMouseMove = (ev: MouseEvent) => {
      state.current.mousePos = { x: ev.clientX, y: ev.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    let frameId: number;

    const render = () => {
      const { mousePos, cacheMousePos, lastMousePos } = state.current;

      const distance = getDistance(
        mousePos.x,
        mousePos.y,
        lastMousePos.x,
        lastMousePos.y
      );

      state.current.cacheMousePos.x = lerp(
        cacheMousePos.x,
        mousePos.x,
        0.1
      );
      state.current.cacheMousePos.y = lerp(
        cacheMousePos.y,
        mousePos.y,
        0.1
      );

      if (distance > trailDistance) {
        showNextImage();
        state.current.lastMousePos = { ...mousePos };
      }

      frameId = requestAnimationFrame(render);
    };

    const showNextImage = () => {
      const { imgPosition, zIndexVal, cacheMousePos, mousePos } =
        state.current;

      const img = itemsRef.current[imgPosition];
      if (!img) return;

      gsap.killTweensOf(img);

      const rect = img.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      const tl = gsap.timeline();

      tl.set(img, {
        opacity: 1,
        scale: 1,
        zIndex: zIndexVal,
        x: cacheMousePos.x - w / 2,
        y: cacheMousePos.y - h / 2,
      })
        .to(
          img,
          {
            duration: 0.9,
            ease: "expo.out",
            x: mousePos.x - w / 2,
            y: mousePos.y - h / 2,
          },
          0
        )
        .to(
          img,
          {
            duration: 1,
            ease: "power1.out",
            opacity: 0,
          },
          0.4
        )
        .to(
          img,
          {
            duration: 1,
            ease: "quint.out",
            scale: 0.2,
          },
          0.4
        );

      state.current.zIndexVal++;
      state.current.imgPosition =
        imgPosition < itemsRef.current.length - 1
          ? imgPosition + 1
          : 0;
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
    >
      {images.map((url, index) => (
        <img
          key={index}
          ref={(el) => {
            itemsRef.current[index] = el;
          }}
          className="absolute top-0 left-0 opacity-0 w-[200px] aspect-[2/3] object-cover shadow-2xl rounded-sm"
          src={url}
          alt=""
        />
      ))}
    </div>
  );
}