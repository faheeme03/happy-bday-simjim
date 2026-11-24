import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Disc, Play, Pause, ArrowRight, Music, Sparkles, Volume2 } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function StageTurntable({ onNext }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleTurntable = () => {
    if (!isPlaying) {
      sounds.playVinylStart();
      sounds.startBGM();
      setIsPlaying(true);
    } else {
      sounds.stopBGM();
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center select-none py-3 px-2">
      {/* Surprise Subtitle */}
      <div className="text-center mb-3">
        <span className="text-[11px] font-mono font-bold tracking-widest text-[#E6496C] uppercase">
          SURPRISE 07 • OUR SONG
        </span>
        <h2 className="font-serif text-3xl font-bold text-[#2B1B2D]">
          The Record Player 🎶
        </h2>
      </div>

      {/* Pastel Turntable Presentation */}
      <div className="w-full bg-[#FFFDF9] rounded-3xl p-6 shadow-2luv border-2 border-pink-200 relative overflow-hidden flex flex-col items-center">
        {/* Turntable Base Cabinet */}
        <div className="relative w-72 sm:w-80 h-72 sm:h-80 bg-gradient-to-br from-[#FFE4E6] via-[#FED7AA]/60 to-[#FBCFE8] rounded-3xl p-5 shadow-inner border-4 border-white flex items-center justify-center">
          {/* Vinyl Record */}
          <motion.div
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            onClick={toggleTurntable}
            className="relative w-52 sm:w-60 h-52 sm:h-60 rounded-full bg-[#18181B] shadow-2xl border-4 border-gray-900 flex items-center justify-center cursor-pointer group"
          >
            {/* Vinyl Grooves */}
            <div className="absolute inset-3 rounded-full border border-gray-700/60 pointer-events-none" />
            <div className="absolute inset-7 rounded-full border border-gray-700/60 pointer-events-none" />
            <div className="absolute inset-11 rounded-full border border-gray-700/60 pointer-events-none" />
            <div className="absolute inset-15 rounded-full border border-gray-700/60 pointer-events-none" />

            {/* Vinyl Center Label (Lavender / Pastel Pink) */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#E6496C] via-[#F472B6] to-[#FED7AA] border-2 border-white flex flex-col items-center justify-center text-center p-1 shadow-md">
              <span className="text-[8px] font-mono font-bold text-white uppercase tracking-tighter">
                SIMJIM
              </span>
              <Music className="w-3.5 h-3.5 text-white my-0.5" />
              <span className="text-[7px] font-bold text-white/90">SIDE A</span>
            </div>

            {/* Spindle hole */}
            <div className="w-2.5 h-2.5 rounded-full bg-gray-900 border border-white absolute" />
          </motion.div>

          {/* Tonearm */}
          <motion.div
            animate={isPlaying ? { rotate: 22 } : { rotate: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            className="absolute top-6 right-6 w-5 h-28 origin-top-right pointer-events-none flex flex-col items-center"
          >
            {/* Tonearm Base */}
            <div className="w-7 h-7 rounded-full bg-gray-300 border-2 border-gray-400 shadow-sm" />
            {/* Metallic Arm */}
            <div className="w-1.5 h-20 bg-gradient-to-b from-gray-300 via-gray-100 to-gray-400 shadow" />
            {/* Cartridge Head */}
            <div className="w-4 h-6 bg-red-500 rounded-sm shadow-sm -mt-1" />
          </motion.div>
        </div>

        {/* Track Info & Equalizer */}
        <div className="w-full mt-4 flex items-center justify-between px-2">
          <div>
            <h4 className="font-serif text-lg font-bold text-[#2B1B2D]">
              Simjim's Birthday Melody 🎶
            </h4>
            <p className="font-hand text-base text-[#E6496C] font-bold">
              Surya's Mixtape for his Thangapulla
            </p>
          </div>

          <motion.button
            onClick={toggleTurntable}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-[#E6496C] to-[#D12E57] text-white flex items-center justify-center shadow-float cursor-pointer"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </motion.button>
        </div>

        {/* Dancing Equalizer Bars */}
        {isPlaying && (
          <div className="w-full flex items-center justify-center gap-1.5 mt-3 pt-2 border-t border-pink-200">
            {[6, 16, 10, 20, 8, 18, 12, 22, 10, 16, 8, 14].map((h, i) => (
              <motion.span
                key={i}
                animate={{ height: [4, h, 4] }}
                transition={{ repeat: Infinity, duration: 0.7 + (i % 4) * 0.2, ease: 'easeInOut' }}
                className="w-1 bg-[#E6496C] rounded-full"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
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
          <span>Next surprise: The Candles 🎂</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
