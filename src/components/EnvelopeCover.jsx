import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Heart, Sparkles } from 'lucide-react';

export default function EnvelopeCover({ onOpen }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 select-none relative z-10">
      {/* Floating ambient icons */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="text-4xl absolute top-12 left-10 opacity-70"
      >
        🎈
      </motion.div>
      <motion.div
        animate={{ y: [8, -8, 8], rotate: [8, -8, 8] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        className="text-4xl absolute top-20 right-12 opacity-70"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ y: [-10, 10, -10], scale: [0.9, 1.1, 0.9] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="text-4xl absolute bottom-16 left-12 opacity-70"
      >
        💙
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10], rotate: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
        className="text-4xl absolute bottom-20 right-16 opacity-70"
      >
        🎂
      </motion.div>

      {/* Main Envelope Presentation Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(37,99,235,0.18)] border-2 border-[#BFDBFE] text-center flex flex-col items-center relative overflow-hidden"
      >
        {/* Washi tape accents at corners */}
        <div className="washi-tape-stripes w-28 h-6 absolute -top-1 -left-4 -rotate-12" />
        <div className="washi-tape-stripes w-28 h-6 absolute -top-1 -right-4 rotate-12" />

        {/* Tag Header */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100/80 text-[#1E40AF] text-xs font-bold mb-4 tracking-wide border border-blue-200">
          <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>CONFIDENTIAL FOR SIMJIM 💌</span>
        </div>

        {/* Envelope Graphic Container */}
        <div className="relative my-4 w-48 h-36 flex items-center justify-center">
          {/* Blue Envelope Body */}
          <div className="w-full h-full bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] rounded-2xl border-2 border-[#93C5FD] shadow-md relative overflow-hidden flex items-center justify-center">
            {/* Envelope Flap Crease */}
            <div className="absolute inset-0 border-b-2 border-[#93C5FD] [clip-path:polygon(0_0,50%_55%,100%_0)] bg-[#EFF6FF]" />

            {/* Wax Seal / Stamp Button */}
            <motion.button
              onClick={onOpen}
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-[#2563EB] via-[#3B82F6] to-[#60A5FA] shadow-lg border-2 border-white flex flex-col items-center justify-center text-white cursor-pointer group"
              title="Click to Open Gift!"
            >
              <Heart className="w-7 h-7 fill-white group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-extrabold uppercase tracking-tighter">OPEN</span>
            </motion.button>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-script text-4xl sm:text-5xl font-bold text-[#1E3A8A] mt-2 mb-1">
          Happy Birthday, Simjim! 🎂💙
        </h1>

        <p className="font-diary text-xl sm:text-2xl text-[#3B82F6] font-semibold mb-6">
          A special digital scrapbook from Surya ✨
        </p>

        {/* Open Button */}
        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-bold text-base shadow-[0_10px_25px_rgba(37,99,235,0.35)] hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Gift className="w-5 h-5" />
          <span>Open Your Birthday Scrapbook 🎁</span>
        </motion.button>

        <p className="text-xs text-[#64748B] font-medium mt-4">
          Turn your sound on for the best experience 🎵✨
        </p>
      </motion.div>
    </div>
  );
}
