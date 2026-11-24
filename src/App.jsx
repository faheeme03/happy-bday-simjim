import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import HeroCover from './components/HeroCover';
import StageEnvelope from './components/StageEnvelope';
import StageClawMachine from './components/StageClawMachine';
import StageStorybook from './components/StageStorybook';
import StageWishJar from './components/StageWishJar';
import StagePhotobooth from './components/StagePhotobooth';
import StageCalendar from './components/StageCalendar';
import StageTurntable from './components/StageTurntable';
import StageCandles from './components/StageCandles';
import { sounds } from './utils/audio';

export default function App() {
  // Stage 0 = Hero Cover, 1..8 = The 8 Surprises
  const [stage, setStage] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const startJourney = () => {
    sounds.startBGM();
    setStage(1);
  };

  const nextStage = () => {
    setStage((prev) => Math.min(8, prev + 1));
  };

  const prevStage = () => {
    setStage((prev) => Math.max(0, prev - 1));
  };

  const replayAll = () => {
    setStage(0);
  };

  const toggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF8F3] font-sans antialiased text-[#2B1B2D] flex flex-col justify-between relative overflow-x-hidden selection:bg-[#FBCFE8]">
      {/* Top Fixed Control Bar */}
      <header className="fixed top-0 inset-x-0 z-50 p-4 flex items-center justify-between max-w-xl mx-auto pointer-events-none">
        {/* Previous Stage Button (Shown in Stages 1 to 8) */}
        {stage > 0 ? (
          <button
            onClick={prevStage}
            className="p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-pink-200 shadow-sm text-[#2B1B2D] hover:bg-pink-50 active:scale-95 transition-all pointer-events-auto cursor-pointer"
            title="Previous Surprise"
          >
            <ArrowLeft className="w-4 h-4 text-[#E6496C]" />
          </button>
        ) : (
          <div />
        )}

        {/* Progress Pill Indicator */}
        {stage > 0 && (
          <div className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-pink-200 shadow-sm flex items-center gap-1.5 pointer-events-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <span
                key={s}
                onClick={() => setStage(s)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  stage === s
                    ? 'w-6 bg-[#E6496C]'
                    : stage > s
                    ? 'w-2 bg-[#FDA4AF]'
                    : 'w-2 bg-gray-200'
                }`}
                title={`Surprise ${s}`}
              />
            ))}
          </div>
        )}

        {/* Audio Toggle */}
        <button
          onClick={toggleMute}
          className="p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-pink-200 shadow-sm text-[#2B1B2D] hover:bg-pink-50 active:scale-95 transition-all pointer-events-auto cursor-pointer"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-gray-400" />
          ) : (
            <div className="flex items-center gap-1">
              <span className="w-1 bg-[#E6496C] h-3 rounded-full animate-pulse" />
              <span className="w-1 bg-[#E6496C] h-2 rounded-full animate-pulse delay-75" />
              <Volume2 className="w-4 h-4 text-[#E6496C]" />
            </div>
          )}
        </button>
      </header>

      {/* Main Interactive Stage Presentation */}
      <main className="w-full flex-1 flex flex-col items-center justify-center pt-14 pb-6 px-3">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.div
              key="stage-0"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <HeroCover onOpen={startJourney} />
            </motion.div>
          )}

          {stage === 1 && (
            <motion.div
              key="stage-1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <StageEnvelope onNext={nextStage} />
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="stage-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <StageClawMachine onNext={nextStage} />
            </motion.div>
          )}

          {stage === 3 && (
            <motion.div
              key="stage-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <StageStorybook onNext={nextStage} />
            </motion.div>
          )}

          {stage === 4 && (
            <motion.div
              key="stage-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <StageWishJar onNext={nextStage} />
            </motion.div>
          )}

          {stage === 5 && (
            <motion.div
              key="stage-5"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <StagePhotobooth onNext={nextStage} />
            </motion.div>
          )}

          {stage === 6 && (
            <motion.div
              key="stage-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <StageCalendar onNext={nextStage} />
            </motion.div>
          )}

          {stage === 7 && (
            <motion.div
              key="stage-7"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <StageTurntable onNext={nextStage} />
            </motion.div>
          )}

          {stage === 8 && (
            <motion.div
              key="stage-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <StageCandles onReplay={replayAll} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center border-t border-pink-200/50 mt-auto">
        <p className="font-hand text-base sm:text-lg text-[#2B1B2D] font-bold flex items-center justify-center gap-1.5">
          <span>Made with all my heart for my Thangapulla Simjim</span>
          <Heart className="w-4 h-4 fill-[#E6496C] text-[#E6496C]" />
          <span>• By your Surya</span>
        </p>
        <p className="text-[10px] font-mono font-bold tracking-widest text-[#8C7D8E] uppercase mt-0.5">
          2-LUV BIRTHDAY EDITION • SIMJIM 2026
        </p>
      </footer>
    </div>
  );
}
