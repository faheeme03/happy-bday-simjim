import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RotateCcw, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

export default function StageWishJar({ onNext }) {
  const [isPopped, setIsPopped] = useState(false);

  const wishes = [
    {
      id: 1,
      starColor: 'text-amber-400',
      bgColor: 'bg-amber-50/90 border-amber-200',
      text: 'A weekend getaway with zero phones & pure vibes 🏖️✨',
    },
    {
      id: 2,
      starColor: 'text-sky-400',
      bgColor: 'bg-sky-50/90 border-sky-200',
      text: 'Ticking off every sweet dessert café on your wishlist 🍧',
    },
    {
      id: 3,
      starColor: 'text-indigo-400',
      bgColor: 'bg-indigo-50/90 border-indigo-200',
      text: 'Late-night karaoke & drives singing our favorite songs 🎤',
    },
    {
      id: 4,
      starColor: 'text-teal-400',
      bgColor: 'bg-teal-50/90 border-teal-200',
      text: 'A year filled with unstoppable giggles, good health & peace 🌸',
    },
    {
      id: 5,
      starColor: 'text-blue-500',
      bgColor: 'bg-blue-50/90 border-blue-200',
      text: 'Many more magical birthdays side by side with Surya 💙',
    },
  ];

  const handlePopJar = () => {
    if (!isPopped) {
      sounds.playCorkPop();
      setIsPopped(true);

      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.55 },
        colors: ['#38BDF8', '#2563EB', '#FBBF24', '#34D399', '#A78BFA'],
      });
    }
  };

  const handleReset = () => {
    setIsPopped(false);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center select-none py-2 px-2 text-center">
      {/* Surprise Subtitle */}
      <div className="text-center mb-2">
        <span className="text-[11px] font-mono font-bold tracking-widest text-[#2563EB] uppercase">
          SURPRISE 04 • WISHES
        </span>
        <h2 className="font-serif text-3xl font-bold text-[#0F172A]">
          Wishes for Your New Year 🌟
        </h2>
      </div>

      {/* Main Glass Jar Canvas on Ambient Background */}
      <div className="w-full bg-[#FFFDF9] rounded-3xl p-5 sm:p-6 shadow-2luv border-2 border-blue-200 relative overflow-hidden flex flex-col items-center min-h-[460px]">
        {/* Soft Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/50 via-transparent to-blue-50/60 pointer-events-none" />

        {/* The 3D Glass Apothecary Wishing Jar */}
        <div
          onClick={handlePopJar}
          className="relative my-2 flex flex-col items-center cursor-pointer group"
        >
          {/* Cork Stopper that Pops Off */}
          <motion.div
            animate={
              isPopped
                ? { y: -65, x: 25, rotate: 20, opacity: [1, 0.8, 0] }
                : { y: 0, x: 0, rotate: 0, opacity: 1 }
            }
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-20 h-6 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 rounded-t-lg border-2 border-amber-900 shadow-md relative z-30 flex items-center justify-center -mb-1"
          >
            <span className="text-[8px] font-mono font-bold text-amber-200 tracking-wider">
              WISH CORK
            </span>
          </motion.div>

          {/* Neck Lip & Sky Blue Satin Bow */}
          <div className="w-24 h-3 bg-white/70 border-2 border-[#93C5FD] rounded-full shadow-sm relative z-20 flex items-center justify-center">
            {/* Satin Ribbon */}
            <div className="w-20 h-2 bg-[#60A5FA] rounded-full shadow-inner" />
          </div>

          {/* Glass Body */}
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="relative w-44 sm:w-48 h-56 rounded-3xl border-4 border-white/80 bg-gradient-to-b from-white/60 via-sky-100/40 to-blue-200/50 backdrop-blur-md shadow-[0_12px_36px_rgba(37,99,235,0.22)] flex flex-col items-center justify-between p-3 overflow-hidden group-hover:scale-102 transition-transform duration-300 z-10"
          >
            {/* Specular White Glass Reflections */}
            <div className="absolute top-2 left-3 w-3 h-44 bg-gradient-to-b from-white/80 via-white/40 to-transparent rounded-full opacity-70 pointer-events-none" />
            <div className="absolute top-2 right-4 w-1.5 h-36 bg-gradient-to-b from-white/70 via-white/20 to-transparent rounded-full opacity-60 pointer-events-none" />

            {/* Glowing Fairy Lights & Origami Lucky Stars Inside */}
            <div className="my-auto flex flex-wrap justify-center gap-2.5 p-2">
              {['⭐', '✨', '🌟', '💫', '⭐', '✨', '🌟'].map((star, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [-4, 4, -4],
                    rotate: [-10, 10, -10],
                    scale: [0.95, 1.1, 0.95],
                  }}
                  transition={{ repeat: Infinity, duration: 2.2 + i * 0.3 }}
                  className="text-2xl drop-shadow-[0_0_10px_rgba(56,189,248,0.85)]"
                >
                  {star}
                </motion.span>
              ))}
            </div>

            {/* Jar Label Badge */}
            <div className="px-3.5 py-1 rounded-full bg-white/95 text-[#1E3A8A] font-hand text-sm font-bold shadow-sm border border-blue-200 z-20">
              For Simjim 💙
            </div>
          </motion.div>

          {/* Tap Prompt */}
          {!isPopped && (
            <motion.p
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="mt-3 text-xs font-bold uppercase tracking-wider text-[#2563EB] flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#38BDF8]" />
              <span>Tap the jar to make a wish</span>
            </motion.p>
          )}
        </div>

        {/* Floating Wish Cards Released from Jar */}
        <AnimatePresence>
          {isPopped && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col items-center mt-3 z-20"
            >
              {/* 5 Horizontal Pastel Wish Pills */}
              <div className="w-full flex flex-col gap-2 my-2">
                {wishes.map((w, idx) => (
                  <motion.div
                    key={w.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.12 }}
                    className={`w-full p-3 rounded-2xl border shadow-sm flex items-center gap-2.5 text-left ${w.bgColor}`}
                  >
                    <Star className={`w-4 h-4 fill-current shrink-0 ${w.starColor}`} />
                    <span className="text-xs sm:text-sm font-semibold text-[#0F172A] leading-snug">
                      {w.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Wish Again Button */}
              <button
                onClick={handleReset}
                className="mt-3 px-5 py-2 rounded-full bg-white text-[#2563EB] border border-blue-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm hover:bg-blue-50 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>✨ Make a wish again</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Next Surprise Button */}
      <div className="w-full mt-4">
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-bold text-sm shadow-float hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Next surprise: Vintage Photo Booth 📸</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
