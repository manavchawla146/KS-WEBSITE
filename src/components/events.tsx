"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Music, Trophy, Users } from "lucide-react";

const EVENTS = [
  {
    title: "Rang Tarang",
    subtitle: "Cultural Night",
    date: "Feb 2025",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
    tag: "Flagship",
    color: "bg-rose-500",
    size: "large",
  },
  {
    title: "Annual Sports Day",
    subtitle: "Athletics Championship",
    date: "Jan 2025",
    image: "https://i.pinimg.com/736x/bf/20/91/bf20914d328a1beaee5eab4dee75d334.jpg",
    tag: "Sports",
    color: "bg-emerald-500",
    size: "small",
  },
  {
    title: "Tech Fusion",
    subtitle: "Annual Tech Fest",
    date: "Mar 2026",
    image: "https://i.pinimg.com/736x/52/09/ea/5209ead76e6cdccdf61a48397fd7b565.jpg",
    tag: "Tech",
    color: "bg-blue-500",
    size: "small",
  },
  {
    title: "Aarambh",
    subtitle: "Fresher's Welcome",
    date: "Aug 2024",
    image: "https://i.pinimg.com/736x/a9/fc/1f/a9fc1fa3a5aaa2d11cf9d681d1cc9554.jpg",
    tag: "Community",
    color: "bg-amber-500",
    size: "large",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const EventsContent = () => (
  <motion.div 
    className="h-full w-full bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center px-4 sm:px-6 md:px-16 py-6 md:py-8"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
  >
    <div className="max-w-6xl w-full h-full flex flex-col justify-center">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-rose-500" />
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gray-500">
              Campus Life
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            Events That <span className="text-gray-400">Define Us</span>
          </h2>
        </div>
        <div className="flex gap-6 lg:gap-10">
          <div className="text-center lg:text-right">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">50+</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 mt-0.5">Events/Year</p>
          </div>
          <div className="text-center lg:text-right">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">15+</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 mt-0.5">Active Clubs</p>
          </div>
        </div>
      </motion.div>

      {/* Bento Grid - More Compact */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 flex-1 min-h-0">
        {/* Featured - Large */}
        <motion.div
          variants={itemVariants}
          className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg shadow-gray-200"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={EVENTS[0].image}
            alt={EVENTS[0].title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className={`${EVENTS[0].color} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg`}>
              {EVENTS[0].tag}
            </span>
          </div>
          <div className="absolute bottom-5 left-5 right-5">
            <p className="text-[11px] text-gray-300 mb-1">{EVENTS[0].date}</p>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{EVENTS[0].title}</h3>
            <p className="text-sm text-gray-200 mt-1">{EVENTS[0].subtitle}</p>
          </div>
        </motion.div>

        {/* Sports */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg shadow-gray-200"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={EVENTS[1].image}
            alt={EVENTS[1].title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className={`${EVENTS[1].color} text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full`}>
              {EVENTS[1].tag}
            </span>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-[10px] text-gray-300">{EVENTS[1].date}</p>
            <h3 className="text-base sm:text-lg font-bold text-white">{EVENTS[1].title}</h3>
          </div>
        </motion.div>

        {/* Tech */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg shadow-gray-200"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={EVENTS[2].image}
            alt={EVENTS[2].title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className={`${EVENTS[2].color} text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full`}>
              {EVENTS[2].tag}
            </span>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-[10px] text-gray-300">{EVENTS[2].date}</p>
            <h3 className="text-base sm:text-lg font-bold text-white">{EVENTS[2].title}</h3>
          </div>
        </motion.div>

        {/* Freshers - Spans 2 cols on mobile, 2 cols on lg */}
        <motion.div
          variants={itemVariants}
          className="col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg shadow-gray-200"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={EVENTS[3].image}
            alt={EVENTS[3].title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className={`${EVENTS[3].color} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg`}>
              {EVENTS[3].tag}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-[11px] text-gray-300 mb-1">{EVENTS[3].date}</p>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{EVENTS[3].title}</h3>
            <p className="text-sm text-gray-200 mt-0.5">{EVENTS[3].subtitle}</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Stats - Compact */}
      <motion.div variants={itemVariants} className="mt-5 pt-5 border-t border-gray-200 grid grid-cols-4 gap-4">
        {[
          { icon: Sparkles, value: "8", label: "Cultural", color: "text-rose-500" },
          { icon: Music, value: "12", label: "Music", color: "text-blue-500" },
          { icon: Trophy, value: "6", label: "Competitions", color: "text-emerald-500" },
          { icon: Users, value: "2,000+", label: "Participants", color: "text-amber-500" },
        ].map((stat, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <stat.icon size={14} className={stat.color} />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900">{stat.value}</p>
              <p className="text-[9px] uppercase tracking-[0.1em] text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  </motion.div>
);
