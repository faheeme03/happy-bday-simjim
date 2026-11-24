import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wind, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

export default function BirthdayCakeSection() {
  const [candlesBlown, setCandlesBlown] = useState(false);

  const handleBlowCandles = () => {
    sounds.playBlowCandles();
    setCandlesBlown(true);

    // Launch multi-burst blue & gold celebration fireworks
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#2563EB', '#38BDF8', '#60A5FA', '#FBBF24', '#F59E0B', '#93C5FD'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleRelight = () => {
    setCandlesBlown(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center select-none text-center">
      {/* Cake Container Card */}
      <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 shadow-scrapbook border-2 border-[#BFDBFE] relative overflow-hidden flex flex-col items-center">
        {/* Washi tape on top */}
        <div className="washi-tape-stripes w-32 h-5 absolute -top-2 left-1/2 -translate-x-1/2 -rotate-1" />

        {/* Header */}
        <h2 className="font-script text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-1">
          Make a Birthday Wish, Simjim! 🎂✨
        </h2>
        <p className="font-diary text-base text-[#3B82F6] font-semibold mb-6">
          Close your eyes, make your deepest wish, and blow the candles 🕯️
        </p>

        {/* 3D-Styled SVG Birthday Cake */}
        <div className="relative w-56 h-48 flex flex-col items-center justify-end my-2">
          {/* Candles & Flames */}
          <div className="flex items-center gap-6 mb-1 z-20">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="flex flex-col items-center relative">
                {/* Flame */}
                <AnimatePresence>
                  {!candlesBlown ? (
                    <motion.div
                      key="flame"
                      initial={{ scale: 0 }}
                      animate={{
                        scale: [1, 1.25, 1],
                        opacity: [0.9, 1, 0.9],
                        y: [-1, 1, -1],
                      }}
                      exit={{ scale: 0, opacity: 0, y: -10 }}
                      transition={{ repeat: Infinity, duration: 0.6 + idx * 0.1, ease: 'easeInOut' }}
                      className="w-3.5 h-6 rounded-full bg-gradient-to-t from-amber-500 via-amber-300 to-yellow-100 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
                    />
                  ) : (
                    /* Cute Smoke Puff */
                    <motion.span
                      key="smoke"
                      initial={{ opacity: 0, y: 0, scale: 0.5 }}
                      animate={{ opacity: [0.8, 0], y: -20, scale: 1.4 }}
                      transition={{ duration: 1.2 }}
                      className="text-xs text-gray-400 absolute -top-4"
                    >
                      💨
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Candle Stick */}
                <div className="w-2.5 h-10 bg-gradient-to-r from-blue-300 via-white to-blue-300 rounded-t border border-blue-400 shadow-sm" />
              </div>
            ))}
          </div>

          {/* Top Cake Tier */}
          <div className="w-28 h-12 bg-gradient-to-r from-[#DBEAFE] via-[#BFDBFE] to-[#93C5FD] rounded-t-2xl border-2 border-[#60A5FA] relative flex items-center justify-center shadow-sm">
            {/* Frosting Drips */}
            <div className="absolute -top-1 w-full flex justify-around">
              <span className="w-4 h-3 bg-white rounded-full shadow-sm" />
              <span className="w-5 h-4 bg-white rounded-full shadow-sm" />
              <span className="w-4 h-3 bg-white rounded-full shadow-sm" />
            </div>
            {/* Sprinkles */}
            <div className="flex gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
            </div>
          </div>

          {/* Bottom Cake Tier */}
          <div className="w-44 h-16 bg-gradient-to-r from-[#BFDBFE] via-[#93C5FD] to-[#60A5FA] rounded-2xl border-2 border-[#3B82F6] relative flex items-center justify-center shadow-md">
            {/* White Frosting Wave */}
            <div className="absolute top-1 w-full flex justify-around">
              <span className="w-6 h-3 bg-white rounded-full" />
              <span className="w-8 h-4 bg-white rounded-full" />
              <span className="w-6 h-3 bg-white rounded-full" />
              <span className="w-7 h-3 bg-white rounded-full" />
            </div>
            <p className="font-script text-white text-xl font-bold tracking-wide drop-shadow">
              Simjim 👑
            </p>
          </div>

          {/* Cake Stand Plate */}
          <div className="w-52 h-4 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-full border border-gray-300 shadow-sm mt-0.5" />
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-col items-center gap-3 w-full">
          {!candlesBlown ? (
            <motion.button
              onClick={handleBlowCandles}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-bold text-base shadow-[0_8px_25px_rgba(37,99,235,0.4)] hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Wind className="w-5 h-5" />
              <span>Make a Wish & Blow Candles 🕯️✨</span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="w-full flex flex-col items-center"
            >
              {/* Official Wish Granted Certificate Card */}
              <div className="w-full bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] rounded-2xl p-4 sm:p-5 border-2 border-[#93C5FD] shadow-md my-2 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold mb-2 border border-emerald-300">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>BIRTHDAY WISH GRANTED 🌟</span>
                </div>
                <h3 className="font-script text-2xl sm:text-3xl font-bold text-[#1E3A8A]">
                  YAAAY! Happy Birthday Simjim! 🎉💙
                </h3>
                <p className="font-diary text-base text-[#1E40AF] mt-1">
                  "May all your prayers, wishes, and secret dreams come true this year!"
                </p>
              </div>

              {/* Relight button */}
              <button
                onClick={handleRelight}
                className="mt-2 px-5 py-2 rounded-full bg-white text-[#1E3A8A] text-xs font-bold border border-[#93C5FD] shadow-sm hover:bg-blue-50 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Relight candles & wish again ↺</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
