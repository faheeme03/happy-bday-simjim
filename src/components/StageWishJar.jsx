import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RotateCcw, Star, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

export default function StageWishJar({ onNext }) {
  const [isPopped, setIsPopped] = useState(false);

  const wishes = [
    { id: 1, text: 'A surprise weekend trip with zero worries & pure vibes 🏖️✨' },
    { id: 2, text: 'Ticking off every sweet dessert café on your wishlist 🍧' },
    { id: 3, text: 'A year filled with unstoppable giggles, good health & peace 🌸' },
    { id: 4, text: 'Watching all your biggest dreams and goals come true 🌟' },
  ];

  const handlePopJar = () => {
    if (!isPopped) {
      sounds.playCorkPop();
      setIsPopped(true);

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FDE047', '#38BDF8', '#F472B6', '#FBBF24'],
      });
    }
  };

  const handleReset = () => {
    setIsPopped(false);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center select-none py-3 px-2">
      {/* Surprise Subtitle */}
      <div className="text-center mb-3">
        <span className="text-[11px] font-mono font-bold tracking-widest text-[#E6496C] uppercase">
          SURPRISE 04 • WISHES
        </span>
        <h2 className="font-serif text-3xl font-bold text-[#2B1B2D]">
          The Star Wish Jar 🌟
        </h2>
      </div>

      {/* Main Glass Jar Canvas */}
      <div className="w-full bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-3xl p-6 shadow-2luv border-2 border-amber-200/40 relative overflow-hidden flex flex-col items-center text-white min-h-[400px]">
        {/* Floating Stars in Background */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          {[...Array(12)].map((_, i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 2 + (i % 3) }}
              className="absolute text-yellow-300 text-xs"
              style={{
                top: `${(i * 17) % 90}%`,
                left: `${(i * 23) % 90}%`,
              }}
            >
              ✦
            </motion.span>
          ))}
        </div>

        {!isPopped ? (
          /* Sealed Glowing Jar */
          <div
            onClick={handlePopJar}
            className="my-auto flex flex-col items-center cursor-pointer group"
          >
            {/* The 3D Glass Jar Graphic */}
            <div className="relative w-40 h-56 rounded-3xl border-4 border-white/60 bg-gradient-to-b from-white/20 via-sky-300/10 to-amber-200/20 backdrop-blur-md shadow-[0_0_30px_rgba(253,224,71,0.3)] flex flex-col items-center justify-between p-3 overflow-hidden group-hover:scale-105 transition-transform duration-300">
              {/* Cork Neck */}
              <div className="absolute -top-3 w-20 h-5 bg-amber-700 rounded-t border-2 border-amber-900 shadow-md flex items-center justify-center">
                <span className="text-[9px] font-mono text-amber-200 font-bold uppercase">
                  WISH CORK
                </span>
              </div>

              {/* Twine Bow */}
              <div className="w-24 h-1.5 bg-amber-800 rounded-full mt-2" />

              {/* Glowing Origami Stars inside Jar */}
              <div className="my-auto flex flex-wrap justify-center gap-2 p-2">
                {['⭐', '✨', '🌟', '💫', '⭐', '✨'].map((star, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [-3, 3, -3], rotate: [-8, 8, -8] }}
                    transition={{ repeat: Infinity, duration: 2 + i * 0.4 }}
                    className="text-2xl drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]"
                  >
                    {star}
                  </motion.span>
                ))}
              </div>

              {/* Jar Tag */}
              <div className="px-3 py-1 rounded bg-white/90 text-[#0F172A] font-hand text-sm font-bold shadow">
                For Simjim 💙
              </div>
            </div>

            {/* Tap prompt */}
            <motion.p
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="mt-5 text-xs font-bold uppercase tracking-widest text-amber-300 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Tap the jar to make a wish</span>
            </motion.p>
          </div>
        ) : (
          /* Popped Jar with Floating Wish Cards */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col items-center my-auto"
          >
            <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
              <Star className="w-4 h-4 fill-amber-300" />
              <span>Your Birthday Wishes for 2026</span>
            </div>

            {/* Wishes Stack */}
            <div className="w-full flex flex-col gap-2.5 my-2">
              {wishes.map((w, idx) => (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  className="w-full p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium leading-relaxed text-amber-100 flex items-center gap-2.5 shadow-sm"
                >
                  <span className="text-amber-400 text-base">✦</span>
                  <span>{w.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Wish Again Button */}
            <button
              onClick={handleReset}
              className="mt-4 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Make a wish again ↺</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Next Surprise Button */}
      <div className="w-full mt-4">
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E6496C] to-[#D12E57] text-white font-bold text-sm shadow-float hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Next surprise: Vintage Photo Booth 📸</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
