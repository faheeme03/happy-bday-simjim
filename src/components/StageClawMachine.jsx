import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, List, Gamepad2, X, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

export default function StageClawMachine({ onNext }) {
  const [clawX, setClawX] = useState(50); // percentage 15% to 85%
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [activeReason, setActiveReason] = useState(null);
  const [revealedIds, setRevealedIds] = useState([]);
  const [viewMode, setViewMode] = useState('game'); // 'game' | 'list'

  const reasons = [
    {
      id: 1,
      title: '01 • Your Beautiful Laugh',
      text: 'How your laughter lights up any room and instantly makes my day a million times better. ✨',
      color: 'from-pink-400 to-rose-500',
    },
    {
      id: 2,
      title: '02 • The Fry Thief',
      text: 'How you say "I am not hungry" and then steal 80% of my french fries with the cutest smile! 🍟',
      color: 'from-amber-400 to-yellow-500',
    },
    {
      id: 3,
      title: '03 • Your Pure Heart',
      text: 'Your deep empathy, kindness, and how you genuinely care for the people you love. 💙',
      color: 'from-sky-400 to-blue-500',
    },
    {
      id: 4,
      title: '04 • Late Night Talks',
      text: 'Our late-night drives, silly banter, and conversations about everything and nothing. 🌙',
      color: 'from-purple-400 to-indigo-500',
    },
    {
      id: 5,
      title: '05 • My Thangapulla',
      text: 'The fact that no matter what, you will always be Surya’s number one favorite person. 👑',
      color: 'from-emerald-400 to-teal-500',
    },
  ];

  const moveLeft = () => {
    if (isGrabbing) return;
    sounds.playClawMove();
    setClawX((prev) => Math.max(15, prev - 15));
  };

  const moveRight = () => {
    if (isGrabbing) return;
    sounds.playClawMove();
    setClawX((prev) => Math.min(85, prev + 15));
  };

  const handleGrab = () => {
    if (isGrabbing) return;
    setIsGrabbing(true);
    sounds.playClawGrab();

    // Claw descends, grabs, returns and drops in chute after 1.8s
    setTimeout(() => {
      // Pick a random unrevealed reason or cycle
      const unrevealed = reasons.filter((r) => !revealedIds.includes(r.id));
      const chosen = unrevealed.length > 0 ? unrevealed[0] : reasons[Math.floor(Math.random() * reasons.length)];

      setIsGrabbing(false);
      setActiveReason(chosen);
      setRevealedIds((prev) => Array.from(new Set([...prev, chosen.id])));
      sounds.playPrizeWin();

      // Confetti burst
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#E6496C', '#38BDF8', '#F59E0B', '#B7E4C7'],
      });
    }, 1800);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center select-none py-3 px-2">
      {/* Surprise Subtitle */}
      <div className="text-center mb-3">
        <span className="text-[11px] font-mono font-bold tracking-widest text-[#E6496C] uppercase">
          SURPRISE 02 • WHAT I LOVE
        </span>
        <h2 className="font-serif text-3xl font-bold text-[#2B1B2D]">
          The Claw Machine 🕹️
        </h2>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2 mb-3 bg-white/80 p-1 rounded-full border border-pink-200 shadow-sm text-xs font-bold">
        <button
          onClick={() => setViewMode('game')}
          className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
            viewMode === 'game' ? 'bg-[#E6496C] text-white shadow-sm' : 'text-[#6B5E6E] hover:text-[#2B1B2D]'
          }`}
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Arcade Game</span>
        </button>

        <button
          onClick={() => setViewMode('list')}
          className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
            viewMode === 'list' ? 'bg-[#E6496C] text-white shadow-sm' : 'text-[#6B5E6E] hover:text-[#2B1B2D]'
          }`}
        >
          <List className="w-3.5 h-3.5" />
          <span>List View ({revealedIds.length}/5)</span>
        </button>
      </div>

      {viewMode === 'game' ? (
        /* =================== CLAW MACHINE CABINET =================== */
        <div className="w-full bg-gradient-to-b from-[#FFE4E6] to-[#FED7AA] rounded-3xl p-4 shadow-arcade border-4 border-white relative flex flex-col items-center">
          {/* Marquee Header */}
          <div className="w-full bg-[#E11D48] text-white py-1.5 px-3 rounded-xl flex items-center justify-between shadow-inner mb-3">
            <span className="text-[10px] font-mono font-black tracking-widest uppercase">
              ★ REASONS I LOVE YOU ★
            </span>
            <span className="text-[10px] font-mono font-bold bg-white/20 px-2 py-0.5 rounded">
              {revealedIds.length}/5 FOUND
            </span>
          </div>

          {/* Glass Enclosure */}
          <div className="relative w-full h-56 bg-gradient-to-b from-sky-50/70 to-blue-100/80 rounded-2xl border-2 border-white/80 shadow-inner overflow-hidden">
            {/* Top Crane Track */}
            <div className="w-full h-3 bg-gray-400 border-b border-gray-500 relative">
              {/* Claw Trolley */}
              <motion.div
                animate={{ left: `${clawX}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="absolute -top-1 w-8 h-4 bg-gray-700 rounded-sm -translate-x-1/2 flex flex-col items-center"
              >
                {/* Claw Cable */}
                <motion.div
                  animate={{ height: isGrabbing ? '120px' : '30px' }}
                  transition={{ duration: 0.9, repeat: isGrabbing ? 1 : 0, repeatType: 'reverse' }}
                  className="w-1 bg-gray-600 relative"
                >
                  {/* The Claw Prongs */}
                  <div className="absolute -bottom-4 -left-3 w-7 h-5 flex items-center justify-between">
                    <span className="w-2 h-4 border-2 border-gray-800 rounded-bl-full" />
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    <span className="w-2 h-4 border-2 border-gray-800 rounded-br-full" />
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Capsules at the bottom */}
            <div className="absolute bottom-2 inset-x-2 flex justify-around items-end">
              {reasons.map((r, i) => (
                <motion.div
                  key={r.id}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2 + i * 0.3 }}
                  className={`w-9 h-9 rounded-full bg-gradient-to-tr ${r.color} shadow-md border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                >
                  <Heart className="w-4 h-4 fill-white" />
                </motion.div>
              ))}
            </div>

            {/* Prize Chute on the left */}
            <div className="absolute bottom-0 left-2 w-12 h-14 bg-gray-900/40 rounded-t border-t-2 border-r-2 border-white/50 flex items-center justify-center text-[9px] font-mono text-white/80">
              CHUTE
            </div>
          </div>

          {/* Arcade Controls Deck */}
          <div className="w-full mt-3 p-3 bg-white/90 rounded-2xl shadow-sm border border-pink-200 flex items-center justify-between">
            {/* Left & Right Directional Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={moveLeft}
                disabled={isGrabbing}
                className="w-12 h-12 rounded-xl bg-pink-100 text-[#E11D48] flex items-center justify-center font-bold shadow active:scale-90 hover:bg-pink-200 transition-all cursor-pointer disabled:opacity-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={moveRight}
                disabled={isGrabbing}
                className="w-12 h-12 rounded-xl bg-pink-100 text-[#E11D48] flex items-center justify-center font-bold shadow active:scale-90 hover:bg-pink-200 transition-all cursor-pointer disabled:opacity-50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Glowing Big Red GRAB Button */}
            <motion.button
              onClick={handleGrab}
              disabled={isGrabbing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#E11D48] to-[#BE123C] text-white font-extrabold text-sm shadow-[0_6px_20px_rgba(225,29,72,0.4)] active:scale-95 transition-all cursor-pointer disabled:opacity-60 flex items-center gap-1.5"
            >
              <span>{isGrabbing ? 'GRABBING...' : 'GRAB! 🎯'}</span>
            </motion.button>
          </div>
        </div>
      ) : (
        /* =================== LIST VIEW =================== */
        <div className="w-full flex flex-col gap-2.5 my-2">
          {reasons.map((r) => {
            const isFound = revealedIds.includes(r.id);
            return (
              <div
                key={r.id}
                onClick={() => isFound && setActiveReason(r)}
                className={`w-full p-4 rounded-2xl border transition-all cursor-pointer ${
                  isFound
                    ? 'bg-white shadow-sm border-pink-200 hover:border-pink-300'
                    : 'bg-white/50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#2B1B2D]">
                    {isFound ? r.title : `0${r.id} • Hidden Surprise`}
                  </h4>
                  <span className="text-xs font-bold text-[#E6496C]">
                    {isFound ? 'Discovered ✨' : 'Grab in Arcade 🕹️'}
                  </span>
                </div>
                {isFound && <p className="text-xs text-[#6B5E6E] mt-1 font-medium">{r.text}</p>}
              </div>
            );
          })}
        </div>
      )}

      {/* Capsule Prize Modal */}
      <AnimatePresence>
        {activeReason && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border-2 border-pink-200 relative flex flex-col items-center text-center"
            >
              <button
                onClick={() => setActiveReason(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full text-gray-400 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 text-white flex items-center justify-center shadow-md mb-3">
                <Sparkles className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#2B1B2D]">
                {activeReason.title}
              </h3>
              <p className="text-sm text-[#4A3E4D] font-medium leading-relaxed mt-2 mb-4">
                {activeReason.text}
              </p>

              <button
                onClick={() => setActiveReason(null)}
                className="px-6 py-2.5 rounded-full bg-[#E6496C] text-white font-bold text-xs shadow-md hover:bg-[#D12E57] cursor-pointer"
              >
                Got It! 💙
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Next Surprise Button */}
      <div className="w-full mt-4">
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E6496C] to-[#D12E57] text-white font-bold text-sm shadow-float hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Next surprise: Our Storybook 📖</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
