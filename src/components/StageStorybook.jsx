import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, ArrowRight, Heart } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function StageStorybook({ onNext }) {
  const [currentPage, setCurrentPage] = useState(0);

  const chapters = [
    {
      chapter: 'CHAPTER 01',
      title: 'The First Spark 🌸',
      date: 'WHERE IT ALL BEGAN',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop&q=80',
      text: 'From the very first moment we spoke, something just clicked. Your warmth, easy laughter, and cheerful energy turned an ordinary day into the beginning of my favorite journey.',
    },
    {
      chapter: 'CHAPTER 02',
      title: 'Endless Giggles & Food 🍟',
      date: 'THE BEST ADVENTURES',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&auto=format&fit=crop&q=80',
      text: 'Late-night cravings, endless inside jokes that nobody else understands, and stealing each other\'s food. Every single memory with you is packed with pure joy and zero dull moments.',
    },
    {
      chapter: 'CHAPTER 03',
      title: 'Always by Your Side 💙',
      date: 'THROUGH EVERYTHING',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80',
      text: 'Through every high and low, you\'ve shown what a pure and loyal soul you are. I promise to always cheer you on, protect your smile, and pamper you forever.',
    },
    {
      chapter: 'CHAPTER 04',
      title: 'To Be Continued... 💫',
      date: 'OUR FUTURE TOGETHER',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      text: 'Today we celebrate your birthday, but our story is just getting started. Here\'s to a lifetime of more trips, laughter, and happiness together. Happy Birthday, Simjim!',
    },
  ];

  const nextPage = () => {
    if (currentPage < chapters.length - 1) {
      sounds.playPageTurn();
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      sounds.playPageTurn();
      setCurrentPage((prev) => prev - 1);
    }
  };

  const curr = chapters[currentPage];

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center select-none py-2 px-2">
      {/* Surprise Subtitle */}
      <div className="text-center mb-2">
        <span className="text-[11px] font-mono font-bold tracking-widest text-[#2563EB] uppercase">
          SURPRISE 03 • OUR STORY
        </span>
        <h2 className="font-serif text-3xl font-bold text-[#0F172A]">
          The Storybook 📖
        </h2>
      </div>

      {/* 3D Storybook Presentation */}
      <div className="w-full bg-[#FFFDF9] rounded-3xl p-5 shadow-2luv border-2 border-blue-200 relative overflow-hidden flex flex-col items-center">
        {/* Washi tape header */}
        <div className="washi-tape-blue w-28 h-5 absolute -top-2 left-1/2 -translate-x-1/2 -rotate-1" />

        {/* Page flip animation container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col items-center text-center"
          >
            {/* Chapter Header */}
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#2563EB] uppercase mt-1">
              {curr.chapter} • {curr.date}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#0F172A] mt-1 mb-3">
              {curr.title}
            </h3>

            {/* Chapter Photo */}
            <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-inner border border-blue-100 mb-3 bg-blue-50">
              <img
                src={curr.image}
                alt={curr.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Chapter Text */}
            <p className="text-xs sm:text-sm text-[#334155] font-medium leading-relaxed font-sans px-2">
              {curr.text}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Page Navigation Chevrons & Dots */}
        <div className="w-full flex items-center justify-between mt-5 pt-3 border-t border-dashed border-blue-100">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="p-2 rounded-full text-[#2563EB] hover:bg-blue-50 disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-1.5">
            {chapters.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentPage === i ? 'w-5 bg-[#2563EB]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === chapters.length - 1}
            className="p-2 rounded-full text-[#2563EB] hover:bg-blue-50 disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
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
          <span>Next surprise: The Star Wish Jar 🌟</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
