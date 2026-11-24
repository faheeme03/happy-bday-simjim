import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wind, RotateCcw, Heart, Award, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

export default function StageCandles({ onReplay }) {
  const [candlesBlown, setCandlesBlown] = useState(false);

  const handleBlowCandles = () => {
    sounds.playBlowCandles();
    setCandlesBlown(true);

    // Full celebration confetti cannon
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#E6496C', '#F472B6', '#38BDF8', '#FBBF24', '#B7E4C7', '#E8DEF8'];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.65 },
        colors: colors,
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.65 },
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
    <div className="w-full max-w-md mx-auto flex flex-col items-center select-none py-3 px-2 text-center">
      {/* Surprise Subtitle */}
      <div className="text-center mb-3">
        <span className="text-[11px] font-mono font-bold tracking-widest text-[#E6496C] uppercase">
          SURPRISE 08 • THE CANDLES
        </span>
        <h2 className="font-serif text-3xl font-bold text-[#2B1B2D]">
          Make Your Wish 🕯️
        </h2>
      </div>

      {/* Main Cake Stage Canvas */}
      <div className="w-full bg-[#FFFDF9] rounded-3xl p-6 shadow-2luv border-2 border-pink-200 relative overflow-hidden flex flex-col items-center">
        {/* Floating party balloons */}
        <motion.div
          animate={{ y: [-6, 6, -6], rotate: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute top-4 left-4 text-3xl opacity-80"
        >
          🎈
        </motion.div>
        <motion.div
          animate={{ y: [6, -6, 6], rotate: [4, -4, 4] }}
          transition={{ repeat: Infinity, duration: 4.5 }}
          className="absolute top-4 right-4 text-3xl opacity-80"
        >
          ✨
        </motion.div>

        {/* 3D Birthday Cake Graphics */}
        <div className="relative w-56 h-52 flex flex-col items-center justify-end my-4">
          {/* Candle Flames */}
          <div className="flex items-center gap-6 mb-1 z-20">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="flex flex-col items-center relative">
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
                      exit={{ scale: 0, opacity: 0, y: -12 }}
                      transition={{ repeat: Infinity, duration: 0.6 + idx * 0.1, ease: 'easeInOut' }}
                      className="w-3.5 h-6 rounded-full bg-gradient-to-t from-amber-500 via-amber-300 to-yellow-100 shadow-[0_0_12px_rgba(245,158,11,0.85)]"
                    />
                  ) : (
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
                <div className="w-2.5 h-9 bg-gradient-to-r from-pink-300 via-white to-pink-300 rounded-t border border-pink-400 shadow-sm" />
              </div>
            ))}
          </div>

          {/* Top Cake Tier */}
          <div className="w-32 h-14 bg-gradient-to-r from-[#FED7AA] via-[#FDE68A] to-[#FBCFE8] rounded-t-2xl border-2 border-white relative flex items-center justify-center shadow-md">
            <span className="text-xs font-hand text-[#2B1B2D] font-bold">Simjim 👑</span>
          </div>

          {/* Bottom Cake Tier */}
          <div className="w-48 h-18 bg-gradient-to-r from-[#FBCFE8] via-[#F472B6] to-[#E6496C] rounded-2xl border-2 border-white relative flex items-center justify-center shadow-lg">
            <p className="font-serif text-white text-base font-bold tracking-wide drop-shadow">
              Happy Birthday!
            </p>
          </div>

          {/* Cake Plate */}
          <div className="w-56 h-4 bg-gradient-to-r from-white via-gray-100 to-white rounded-full border border-gray-200 shadow-sm mt-0.5" />
        </div>

        {/* Action Controls */}
        {!candlesBlown ? (
          <div className="w-full flex flex-col items-center mt-2">
            <p className="text-xs text-[#6B5E6E] font-medium mb-3">
              Make a wish and blow out the candles 🕯️
            </p>
            <motion.button
              onClick={handleBlowCandles}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#E6496C] to-[#D12E57] text-white font-bold text-base shadow-float flex items-center justify-center gap-2 cursor-pointer"
            >
              <Wind className="w-5 h-5" />
              <span>Blow out the candles 🕯️💨</span>
            </motion.button>
          </div>
        ) : (
          /* Grand Finale Wish Granted Card */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full flex flex-col items-center mt-2"
          >
            {/* Climax Certificate */}
            <div className="w-full bg-gradient-to-br from-[#FFF1F2] to-[#FFE4E6] p-5 rounded-2xl border-2 border-pink-300 shadow-sm text-center my-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#E6496C] text-xs font-bold mb-2 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>YOUR WISH IS ON ITS WAY! 🌟</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B2D]">
                Happy Birthday, Simjim! 🎂💙
              </h3>

              <p className="text-xs sm:text-sm text-[#4A3E4D] font-medium leading-relaxed mt-2">
                "May your year be filled with endless smiles, pure peace, good health, and all the love in the universe. You are officially Surya's favorite Thangapulla forever!"
              </p>

              <div className="mt-3 pt-2 border-t border-pink-200 text-xs font-hand text-[#E6496C] font-bold text-base">
                Forever with love, Surya 👑✨
              </div>
            </div>

            {/* Relight & Replay Options */}
            <div className="w-full flex items-center gap-2 mt-3">
              <button
                onClick={handleRelight}
                className="flex-1 py-2.5 rounded-xl bg-white border border-pink-200 text-[#2B1B2D] text-xs font-bold hover:bg-pink-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#E6496C]" />
                <span>Relight candles ↺</span>
              </button>

              <button
                onClick={onReplay}
                className="flex-1 py-2.5 rounded-xl bg-[#E6496C] text-white text-xs font-bold hover:bg-[#D12E57] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Replay gift ↺</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
