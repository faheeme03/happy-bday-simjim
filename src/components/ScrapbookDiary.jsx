import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Pin, Star, CheckCircle } from 'lucide-react';

export default function ScrapbookDiary({ polaroidPhoto, onPhotoClick }) {
  const defaultPolaroid = polaroidPhoto || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80';

  return (
    <div className="w-full max-w-4xl mx-auto select-none">
      {/* The Open 2-Page Scrapbook Container */}
      <div className="relative bg-[#FFFDF9] rounded-2xl sm:rounded-3xl shadow-scrapbook border-2 border-[#BFDBFE] p-5 sm:p-8 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
        {/* Notebook Spiral Spine down the center (visible on desktop) */}
        <div className="hidden md:flex absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex-col justify-around py-6 z-20 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className="w-4 h-2.5 rounded-full bg-gradient-to-r from-[#94A3B8] to-[#CBD5E1] shadow-sm -mr-1" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E293B]/20" />
            </div>
          ))}
        </div>

        {/* ===================== LEFT PAGE: MEMORIES & POLAROID ===================== */}
        <div className="relative flex flex-col items-center justify-between z-10 border-b md:border-b-0 md:border-r border-dashed border-[#BFDBFE] pb-6 md:pb-0 md:pr-6">
          {/* Page Header */}
          <div className="w-full flex items-center justify-between mb-4">
            <span className="font-diary text-sm text-[#3B82F6] font-bold">
              PAGE 01 • MEMORIES
            </span>
            <div className="flex items-center gap-1 text-xs text-[#2563EB] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thangapulla's Special Day</span>
            </div>
          </div>

          {/* Tilted Polaroid Frame */}
          <motion.div
            whileHover={{ scale: 1.04, rotate: -1 }}
            className="w-full max-w-[240px] bg-white p-3 pb-5 rounded-lg shadow-polaroid border border-[#E2E8F0] rotate-[-2deg] relative cursor-pointer group"
            onClick={onPhotoClick}
            title="Click to change photo"
          >
            {/* Washi tape over polaroid */}
            <div className="washi-tape-blue w-20 h-4 absolute -top-2 left-1/2 -translate-x-1/2 rotate-1" />

            <div className="w-full aspect-[4/3] rounded overflow-hidden bg-blue-50 relative">
              <img
                src={defaultPolaroid}
                alt="Simjim Birthday Memory"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                Click to Swap Photo
              </div>
            </div>

            <p className="font-diary text-center text-base sm:text-lg font-bold text-[#1E3A8A] mt-2.5">
              The girl with the sweetest smile 📸💙
            </p>
          </motion.div>

          {/* Sticky Notes & Doodles Section */}
          <div className="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Sticky Note 1 */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: -1 }}
              className="bg-[#FEF9C3] rounded-xl p-3 shadow-sm border border-yellow-300 rotate-[-1deg] relative"
            >
              <Pin className="w-3.5 h-3.5 text-red-500 absolute -top-2 right-2 fill-red-500" />
              <p className="font-diary font-bold text-xs text-[#854D0E] mb-1">
                ⭐ Surya's Favorite Things:
              </p>
              <ul className="font-diary text-xs text-[#713F12] space-y-0.5 leading-tight">
                <li>• Your beautiful laugh 🥰</li>
                <li>• Stealing 80% of my food 🍟</li>
                <li>• Always being my Thangapulla 💙</li>
              </ul>
            </motion.div>

            {/* Sticky Note 2 */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: 1 }}
              className="bg-[#E0F2FE] rounded-xl p-3 shadow-sm border border-blue-300 rotate-[2deg] relative"
            >
              <Pin className="w-3.5 h-3.5 text-blue-500 absolute -top-2 left-2 fill-blue-500" />
              <p className="font-diary font-bold text-xs text-[#0369A1] mb-1">
                🎂 Birthday Wish:
              </p>
              <p className="font-diary text-xs text-[#0C4A6E] leading-snug">
                May your day be filled with unlimited joy, laughs & infinite love! ✨
              </p>
            </motion.div>
          </div>

          {/* Cute Sticker Row */}
          <div className="w-full flex items-center justify-center gap-6 mt-4 text-xl">
            <span title="Crowned Princess">👑</span>
            <span title="Blue Heart">💙</span>
            <span title="Sparkles">✨</span>
            <span title="Camera">📸</span>
            <span title="Birthday Cake">🎂</span>
          </div>
        </div>

        {/* ===================== RIGHT PAGE: SURYA'S HEARTFELT LETTER ===================== */}
        <div className="relative flex flex-col justify-between z-10 lined-paper p-2 sm:p-4 rounded-xl">
          {/* Page Header */}
          <div className="w-full flex items-center justify-between mb-3">
            <span className="font-diary text-sm text-[#3B82F6] font-bold">
              PAGE 02 • FROM THE HEART
            </span>
            <span className="text-xs font-mono font-semibold text-[#64748B]">
              FOR: SIMJIM 💌
            </span>
          </div>

          {/* Letter Body */}
          <div className="space-y-3.5">
            <h2 className="font-script text-3xl sm:text-4xl font-bold text-[#1E3A8A]">
              Dearest Simjim, 🌸
            </h2>

            <p className="font-diary text-base sm:text-lg text-[#1E40AF] leading-relaxed">
              Happy Birthday to the most wonderful person in the world! 🎉
            </p>

            <p className="font-diary text-sm sm:text-base text-[#334155] leading-relaxed">
              Today is the most special day because it's the day you came into this world.
              Thank you for filling every single day with happiness, fun banter, and endless smiles.
              Having you in my life makes everything brighter and so much more meaningful.
            </p>

            <p className="font-diary text-sm sm:text-base text-[#334155] leading-relaxed">
              On your birthday, I wish you all the happiness, success, and peace in the universe.
              Keep shining, keep being your cheerful self, and remember that you will always be
              my favorite Thangapulla! 💙✨
            </p>
          </div>

          {/* Signoff & Wax Seal Stamp */}
          <div className="mt-6 pt-4 border-t border-dashed border-[#93C5FD] flex items-end justify-between">
            <div>
              <p className="font-diary text-xs sm:text-sm text-[#64748B] italic">
                Always & Forever Yours,
              </p>
              <p className="font-script text-3xl font-bold text-[#1E3A8A]">
                Surya 👑💙
              </p>
            </div>

            {/* Official Sealed Stamp */}
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#2563EB] bg-blue-50/70 p-1 flex flex-col items-center justify-center text-center rotate-[-8deg] shadow-sm">
              <CheckCircle className="w-4 h-4 text-[#2563EB]" />
              <span className="text-[8px] font-black uppercase tracking-tighter text-[#1E3A8A]">
                SEALED
              </span>
              <span className="text-[7px] font-bold text-[#2563EB]">WITH LOVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
