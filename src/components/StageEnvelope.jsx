import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronUp, ArrowRight, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function StageEnvelope({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      sounds.playWaxSeal();
      setIsOpen(true);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center select-none py-4 px-2">
      {/* Surprise Subtitle */}
      <div className="text-center mb-4">
        <span className="text-[11px] font-mono font-bold tracking-widest text-[#E6496C] uppercase">
          SURPRISE 01 • THE LETTER
        </span>
        <h2 className="font-serif text-3xl font-bold text-[#2B1B2D] mt-0.5">
          A Message from Surya
        </h2>
      </div>

      {/* Envelope Presentation Area */}
      <div className="relative w-full min-h-[380px] sm:min-h-[420px] flex flex-col items-center justify-center my-2">
        {!isOpen ? (
          /* Sealed Envelope View */
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full flex flex-col items-center cursor-pointer group"
            onClick={handleOpen}
          >
            {/* 3D Envelope */}
            <div className="relative w-72 sm:w-80 h-52 bg-gradient-to-br from-[#FFE4E6] to-[#FECDD3] rounded-2xl border-2 border-white shadow-2luv flex flex-col items-center justify-center overflow-hidden">
              {/* Flap creases */}
              <div className="absolute inset-0 [clip-path:polygon(0_0,50%_60%,100_0)] bg-[#FFF1F2] border-b-2 border-white/60" />

              {/* Glossy Red Wax Seal with Heart */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-[#BE123C] via-[#E11D48] to-[#FB7185] shadow-lg border-2 border-white flex flex-col items-center justify-center text-white cursor-pointer group"
              >
                <Heart className="w-7 h-7 fill-white group-hover:scale-110 transition-transform" />
              </motion.button>
            </div>

            {/* Prompt */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="flex items-center gap-1.5 mt-5 text-xs font-bold text-[#E6496C] uppercase tracking-wider"
            >
              <ChevronUp className="w-4 h-4 animate-bounce" />
              <span>Tap wax seal to open letter</span>
            </motion.div>
          </motion.div>
        ) : (
          /* Unfolded Letter View */
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="w-full bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 shadow-2luv border-2 border-[#FFE4E6] relative flex flex-col items-center text-center"
          >
            {/* Decorative washi tape */}
            <div className="washi-tape-pink w-28 h-5 absolute -top-2 left-1/2 -translate-x-1/2 -rotate-1" />

            {/* Photo inside letter */}
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-pink-400 to-amber-300 shadow-md mb-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                alt="Simjim"
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            {/* Heading */}
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B2D]">
              Dearest Simjim, 🌸
            </h3>
            <p className="font-hand text-xl text-[#E6496C] font-bold mt-0.5 mb-3">
              My favorite Thangapulla
            </p>

            {/* Letter Text */}
            <p className="text-xs sm:text-sm text-[#4A3E4D] leading-relaxed font-sans font-medium">
              Happy Birthday! 🎉 Today is all about celebrating you—the most joyful, kindhearted, and wonderful person. Thank you for making every day brighter with your smiles and laughter.
            </p>
            <p className="text-xs sm:text-sm text-[#4A3E4D] leading-relaxed font-sans font-medium mt-2">
              I hope this year brings you unlimited happiness, beautiful memories, and that every single dream of yours comes true. You will always be deeply loved! 💙
            </p>

            {/* Signoff */}
            <div className="mt-4 pt-3 border-t border-dashed border-pink-200 w-full flex items-center justify-between px-2">
              <span className="text-[11px] font-mono text-[#8C7D8E]">SEALED WITH LOVE</span>
              <span className="font-script text-2xl font-bold text-[#E6496C]">Surya 👑</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Next Surprise Button */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full mt-4"
        >
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E6496C] to-[#D12E57] text-white font-bold text-sm shadow-float hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Next surprise: What I Love 🕹️</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
