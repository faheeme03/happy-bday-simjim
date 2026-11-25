import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Clock, Heart, Sparkles } from 'lucide-react';

export default function StageCalendar({ onNext }) {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center select-none py-2 px-2">
      {/* Surprise Subtitle */}
      <div className="text-center mb-2">
        <span className="text-[11px] font-mono font-bold tracking-widest text-[#2563EB] uppercase">
          SURPRISE 06 • OUR DATE
        </span>
        <h2 className="font-serif text-3xl font-bold text-[#0F172A]">
          A Date to Keep 🗓️
        </h2>
      </div>

      {/* Desk Calendar Card */}
      <div className="w-full bg-[#FFFDF9] rounded-3xl p-6 shadow-2luv border-2 border-blue-200 relative overflow-hidden flex flex-col items-center text-center">
        {/* Spiral Binder Rings on top */}
        <div className="flex items-center gap-3 -mt-3 mb-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="w-2.5 h-5 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full shadow-sm" />
              <span className="w-2 h-2 rounded-full bg-gray-300 -mt-1" />
            </div>
          ))}
        </div>

        {/* Calendar Month & Day Display */}
        <div className="w-full max-w-[240px] bg-white rounded-2xl border-2 border-[#BFDBFE] shadow-sm p-4 mb-4">
          <span className="text-xs font-mono font-bold text-[#2563EB] tracking-widest uppercase">
            SPECIAL BIRTHDAY DATE
          </span>
          <div className="my-2">
            <span className="font-serif text-6xl font-bold text-[#0F172A]">
              25
            </span>
          </div>
          <span className="font-serif text-lg font-bold text-[#2563EB]">
            NOVEMBER
          </span>
        </div>

        {/* Counter Badge */}
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-sky-50 to-blue-50 border border-blue-200 shadow-inner flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EVERY SECOND TREASURED</span>
          </div>
          <h4 className="font-serif text-2xl font-bold text-[#0F172A]">
            Surya ❤️ Simjim
          </h4>
          <p className="text-xs text-[#475569] font-medium mt-1">
            "From the moment we met to every birthday ahead, you will always be my forever Thangapulla."
          </p>
        </div>
      </div>

      {/* Next Surprise Button */}
      <div className="w-full mt-4">
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-bold text-sm shadow-float hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Next surprise: Our Song 🎶</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
