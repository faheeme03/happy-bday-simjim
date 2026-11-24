import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';

export default function HeroCover({ onOpen }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between p-6 sm:p-10 select-none relative z-10 max-w-xl mx-auto text-center">
      {/* Top Date Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-4"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/90 shadow-sm border border-[#FBCFE8] text-[11px] font-bold tracking-widest text-[#E6496C] uppercase font-mono">
          NOVEMBER 2026 • BIRTHDAY EDITION
        </span>
      </motion.div>

      {/* Main Hero Group */}
      <div className="w-full flex flex-col items-center my-auto py-6">
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-5xl sm:text-6xl font-bold text-[#2B1B2D] leading-[1.15] tracking-tight"
        >
          Happy birthday, <br />
          <span className="text-[#E6496C] italic font-serif">Simjim!</span>
        </motion.h1>

        {/* Handwritten Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-hand text-2xl sm:text-3xl text-[#E6496C] font-bold mt-2"
        >
          "for being Surya's favorite Thangapulla"
        </motion.p>

        {/* 3D-styled Animated Birthday Cake with Candles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.35 }}
          className="relative my-8 w-56 h-52 flex flex-col items-center justify-end"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-pink-300/30 to-amber-200/40 rounded-full blur-2xl pointer-events-none" />

          {/* Floating Party Balloon Decors */}
          <motion.div
            animate={{ y: [-8, 8, -8], rotate: [-6, 6, -6] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
            className="absolute -top-4 -left-6 text-3xl"
          >
            🎈
          </motion.div>
          <motion.div
            animate={{ y: [8, -8, 8], rotate: [6, -6, 6] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            className="absolute -top-6 -right-6 text-3xl"
          >
            ✨
          </motion.div>

          {/* Cake Candles */}
          <div className="flex items-center gap-5 mb-1 z-20">
            {[0, 1].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <motion.div
                  animate={{ scale: [1, 1.25, 1], opacity: [0.85, 1, 0.85] }}
                  transition={{ repeat: Infinity, duration: 0.7 + i * 0.15, ease: 'easeInOut' }}
                  className="w-3.5 h-6 rounded-full bg-gradient-to-t from-amber-500 via-amber-300 to-yellow-100 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
                />
                <div className="w-2.5 h-8 bg-gradient-to-r from-pink-300 via-white to-pink-300 rounded-t border border-pink-400" />
              </div>
            ))}
          </div>

          {/* Top Cake Tier */}
          <div className="w-32 h-14 bg-gradient-to-r from-[#FED7AA] via-[#FDE68A] to-[#FBCFE8] rounded-t-2xl border-2 border-white shadow-md relative flex items-center justify-center">
            <span className="text-xs font-hand text-[#2B1B2D] font-bold">Simjim 👑</span>
          </div>

          {/* Bottom Cake Tier */}
          <div className="w-48 h-18 bg-gradient-to-r from-[#FBCFE8] via-[#F472B6] to-[#E6496C] rounded-2xl border-2 border-white shadow-lg relative flex items-center justify-center">
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-white/80" />
              <span className="w-2 h-2 rounded-full bg-amber-300" />
              <span className="w-2 h-2 rounded-full bg-white/80" />
            </div>
          </div>

          {/* Plate */}
          <div className="w-56 h-4 bg-gradient-to-r from-white via-gray-100 to-white rounded-full border border-gray-200 shadow-sm mt-0.5" />
        </motion.div>

        {/* Subtitle announcement */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-sm font-medium text-[#6B5E6E] max-w-xs"
        >
          Someone threw a little party just for you.
        </motion.p>
      </div>

      {/* Primary CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="w-full pb-6"
      >
        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="w-full py-4 rounded-full bg-gradient-to-r from-[#E6496C] to-[#D12E57] text-white font-bold text-base shadow-float hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Open my gift</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
