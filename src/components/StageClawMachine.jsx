import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, List, Gamepad2, X, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

export default function StageClawMachine({ onNext }) {
  // Gantry position (percentage: 12% is chute, 25% to 85% is capsule play area)
  const [clawX, setClawX] = useState(55);
  // Animation states: 'idle' | 'descending' | 'grabbing' | 'hoisting' | 'moving_to_chute' | 'dropping'
  const [grabPhase, setGrabPhase] = useState('idle');
  const [grabbedCapsuleId, setGrabbedCapsuleId] = useState(null);
  const [activeReason, setActiveReason] = useState(null);
  const [revealedIds, setRevealedIds] = useState([]);
  const [viewMode, setViewMode] = useState('game'); // 'game' | 'list'

  const reasons = [
    {
      id: 1,
      x: 30,
      title: '01 • Your Beautiful Laugh',
      text: 'How your laughter lights up any room and instantly makes my day a million times brighter. ✨',
      color: 'from-sky-400 to-blue-600',
    },
    {
      id: 2,
      x: 45,
      title: '02 • The Fry Thief',
      text: 'How you say "I am not hungry" and then happily steal 80% of my french fries with the cutest smile! 🍟',
      color: 'from-amber-400 to-yellow-500',
    },
    {
      id: 3,
      x: 60,
      title: '03 • Your Pure Heart',
      text: 'Your deep empathy, kindness, and how you genuinely care for the people you love. 💙',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      id: 4,
      x: 75,
      title: '04 • Late Night Talks',
      text: 'Our late-night drives, silly banter, and conversations about everything and nothing under the stars. 🌙',
      color: 'from-cyan-400 to-sky-500',
    },
    {
      id: 5,
      x: 85,
      title: '05 • My Thangapulla',
      text: 'The fact that no matter what happens, you will always be Surya’s number one favorite person in the universe. 👑',
      color: 'from-emerald-400 to-teal-600',
    },
  ];

  const isBusy = grabPhase !== 'idle';

  const moveLeft = () => {
    if (isBusy) return;
    sounds.playClawMove();
    setClawX((prev) => Math.max(25, prev - 12));
  };

  const moveRight = () => {
    if (isBusy) return;
    sounds.playClawMove();
    setClawX((prev) => Math.min(85, prev + 12));
  };

  // The Full Multi-Step Grabbing Sequence
  const handleGrab = () => {
    if (isBusy) return;

    // 1. Identify closest capsule to clawX
    let closest = reasons[0];
    let minDiff = 999;
    reasons.forEach((r) => {
      const diff = Math.abs(r.x - clawX);
      if (diff < minDiff) {
        minDiff = diff;
        closest = r;
      }
    });

    // Step 1: Descent (0 -> 900ms)
    setGrabPhase('descending');
    sounds.playClawMove();

    // Step 2: Grab at bottom (900ms -> 1300ms)
    setTimeout(() => {
      setGrabPhase('grabbing');
      setGrabbedCapsuleId(closest.id);
      sounds.playClawGrab();
    }, 900);

    // Step 3: Hoist upwards with capsule attached (1300ms -> 2200ms)
    setTimeout(() => {
      setGrabPhase('hoisting');
    }, 1300);

    // Step 4: Move trolley to Chute on the left at x=12% (2200ms -> 3000ms)
    setTimeout(() => {
      setGrabPhase('moving_to_chute');
      setClawX(12);
    }, 2200);

    // Step 5: Release and drop capsule into chute (3000ms -> 3500ms)
    setTimeout(() => {
      setGrabPhase('dropping');
    }, 3000);

    // Step 6: Prize reveal modal + confetti (3500ms)
    setTimeout(() => {
      setGrabPhase('idle');
      setGrabbedCapsuleId(null);
      setActiveReason(closest);
      setRevealedIds((prev) => Array.from(new Set([...prev, closest.id])));
      sounds.playPrizeWin();

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#2563EB', '#38BDF8', '#60A5FA', '#FBBF24', '#34D399'],
      });
    }, 3600);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center select-none py-2 px-2">
      {/* Surprise Subtitle */}
      <div className="text-center mb-2">
        <span className="text-[11px] font-mono font-bold tracking-widest text-[#2563EB] uppercase">
          SURPRISE 02 • WHAT I LOVE
        </span>
        <h2 className="font-serif text-3xl font-bold text-[#0F172A]">
          The Claw Machine 🕹️
        </h2>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2 mb-3 bg-white/90 p-1 rounded-full border border-blue-200 shadow-sm text-xs font-bold">
        <button
          onClick={() => setViewMode('game')}
          className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
            viewMode === 'game' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-[#475569] hover:text-[#0F172A]'
          }`}
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Arcade Game</span>
        </button>

        <button
          onClick={() => setViewMode('list')}
          className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
            viewMode === 'list' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-[#475569] hover:text-[#0F172A]'
          }`}
        >
          <List className="w-3.5 h-3.5" />
          <span>List View ({revealedIds.length}/5)</span>
        </button>
      </div>

      {viewMode === 'game' ? (
        /* =================== ARCADE CLAW MACHINE CABINET =================== */
        <div className="w-full bg-gradient-to-b from-[#BFDBFE] via-[#DBEAFE] to-[#93C5FD] rounded-3xl p-3.5 sm:p-4 shadow-arcade border-4 border-white relative flex flex-col items-center">
          {/* Marquee Header */}
          <div className="w-full bg-[#1E3A8A] text-white py-1.5 px-3 rounded-xl flex items-center justify-between shadow-inner mb-2.5">
            <span className="text-[10px] font-mono font-black tracking-widest uppercase text-blue-200">
              ★ REASONS SURYA LOVES YOU ★
            </span>
            <span className="text-[10px] font-mono font-bold bg-white/20 px-2 py-0.5 rounded text-white">
              {revealedIds.length}/5 FOUND
            </span>
          </div>

          {/* Glass Chamber Area */}
          <div className="relative w-full h-64 bg-gradient-to-b from-[#F0F7FF] via-[#E0F2FE] to-[#BAE6FD] rounded-2xl border-2 border-white/90 shadow-inner overflow-hidden">
            {/* Top Horizontal Rail */}
            <div className="w-full h-3 bg-gray-400 border-b border-gray-500 relative">
              {/* Gantry Trolley (Moves smoothly to clawX) */}
              <motion.div
                animate={{ left: `${clawX}%` }}
                transition={{
                  type: grabPhase === 'moving_to_chute' ? 'tween' : 'spring',
                  duration: grabPhase === 'moving_to_chute' ? 0.8 : undefined,
                  stiffness: 280,
                  damping: 24,
                }}
                className="absolute -top-1 w-9 h-4 bg-gray-800 rounded-sm -translate-x-1/2 flex flex-col items-center z-30"
              >
                {/* Chain Cable that extends & retracts */}
                <motion.div
                  animate={{
                    height:
                      grabPhase === 'descending' || grabPhase === 'grabbing'
                        ? '145px'
                        : grabPhase === 'hoisting' || grabPhase === 'moving_to_chute' || grabPhase === 'dropping'
                        ? '28px'
                        : '28px',
                  }}
                  transition={{ duration: 0.85, ease: 'easeInOut' }}
                  className="w-1 bg-gray-700 relative flex flex-col items-center"
                >
                  {/* Claw Mechanism Assembly */}
                  <div className="absolute -bottom-5 w-8 h-6 flex items-center justify-center">
                    {/* Center Hub */}
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 border border-white z-20" />

                    {/* Left Prong */}
                    <motion.span
                      animate={{
                        rotate: grabPhase === 'descending' || grabPhase === 'dropping' ? -28 : 12,
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-2.5 h-5 border-2 border-gray-900 rounded-bl-full absolute -left-1 origin-top"
                    />

                    {/* Right Prong */}
                    <motion.span
                      animate={{
                        rotate: grabPhase === 'descending' || grabPhase === 'dropping' ? 28 : -12,
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-2.5 h-5 border-2 border-gray-900 rounded-br-full absolute -right-1 origin-top"
                    />

                    {/* Grabbed Capsule (Held inside claw when attached!) */}
                    {grabbedCapsuleId && (grabPhase === 'grabbing' || grabPhase === 'hoisting' || grabPhase === 'moving_to_chute') && (
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1, y: [0, 2, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 border-2 border-white shadow-md absolute -bottom-5 flex items-center justify-center z-10"
                      >
                        <Heart className="w-4 h-4 fill-white text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Prize Chute on the Left (x = 12%) */}
            <div className="absolute bottom-0 left-1 w-14 h-16 bg-gradient-to-b from-gray-900/60 to-gray-900/90 rounded-t-xl border-t-2 border-r-2 border-white/60 flex flex-col items-center justify-center text-[9px] font-mono font-bold text-white z-20 shadow-md">
              <span className="text-[10px]">CHUTE</span>
              <span className="text-blue-300 text-xs">▼</span>
            </div>

            {/* Dropping Capsule into Chute Animation */}
            {grabPhase === 'dropping' && (
              <motion.div
                initial={{ y: 35, x: 12, opacity: 1 }}
                animate={{ y: 190, opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeIn' }}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 border-2 border-white shadow-lg absolute left-3 flex items-center justify-center z-30"
              >
                <Heart className="w-4 h-4 fill-white text-white" />
              </motion.div>
            )}

            {/* Capsules Pile at the bottom */}
            <div className="absolute bottom-2 inset-x-16 flex justify-around items-end z-10">
              {reasons.map((r) => {
                const isGrabbedRightNow = grabbedCapsuleId === r.id && isBusy;
                return (
                  <motion.div
                    key={r.id}
                    animate={{
                      y: isGrabbedRightNow ? -999 : [0, -3, 0],
                      opacity: isGrabbedRightNow ? 0 : 1,
                    }}
                    transition={{ repeat: Infinity, duration: 2 + (r.id % 3) * 0.4 }}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr ${r.color} shadow-md border-2 border-white flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:scale-110 transition-transform`}
                  >
                    <Heart className="w-4 h-4 fill-white" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Arcade Controls Deck */}
          <div className="w-full mt-3 p-3 bg-white/95 rounded-2xl shadow-sm border border-blue-200 flex items-center justify-between">
            {/* Left & Right Directional Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={moveLeft}
                disabled={isBusy}
                className="w-12 h-12 rounded-xl bg-blue-100 text-[#1E3A8A] flex items-center justify-center font-bold shadow active:scale-90 hover:bg-blue-200 transition-all cursor-pointer disabled:opacity-40"
                title="Move Claw Left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={moveRight}
                disabled={isBusy}
                className="w-12 h-12 rounded-xl bg-blue-100 text-[#1E3A8A] flex items-center justify-center font-bold shadow active:scale-90 hover:bg-blue-200 transition-all cursor-pointer disabled:opacity-40"
                title="Move Claw Right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Glowing Big Blue GRAB Button */}
            <motion.button
              onClick={handleGrab}
              disabled={isBusy}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-extrabold text-sm shadow-[0_6px_20px_rgba(37,99,235,0.4)] active:scale-95 transition-all cursor-pointer disabled:opacity-60 flex items-center gap-1.5"
            >
              <span>{isBusy ? 'GRABBING...' : 'GRAB! 🎯'}</span>
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
                    ? 'bg-white shadow-sm border-blue-200 hover:border-blue-400'
                    : 'bg-white/50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#0F172A]">
                    {isFound ? r.title : `0${r.id} • Hidden Surprise`}
                  </h4>
                  <span className="text-xs font-bold text-[#2563EB]">
                    {isFound ? 'Discovered ✨' : 'Grab in Arcade 🕹️'}
                  </span>
                </div>
                {isFound && <p className="text-xs text-[#475569] mt-1 font-medium">{r.text}</p>}
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
              className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border-2 border-blue-200 relative flex flex-col items-center text-center"
            >
              <button
                onClick={() => setActiveReason(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full text-gray-400 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 text-white flex items-center justify-center shadow-md mb-3">
                <Sparkles className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#0F172A]">
                {activeReason.title}
              </h3>
              <p className="text-sm text-[#334155] font-medium leading-relaxed mt-2 mb-4">
                {activeReason.text}
              </p>

              <button
                onClick={() => setActiveReason(null)}
                className="px-6 py-2.5 rounded-full bg-[#2563EB] text-white font-bold text-xs shadow-md hover:bg-[#1D4ED8] cursor-pointer"
              >
                Add to My List 💙
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
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-bold text-sm shadow-float hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Next surprise: Our Storybook 📖</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
