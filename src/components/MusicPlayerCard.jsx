import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function MusicPlayerCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    const playing = sounds.toggleMusic();
    setIsPlaying(playing);
  };

  const toggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="w-full max-w-md mx-auto select-none">
      <div className="bg-gradient-to-br from-[#EFF6FF] via-[#DBEAFE] to-[#BFDBFE] p-4 sm:p-5 rounded-2xl border-2 border-[#93C5FD] shadow-md relative overflow-hidden flex flex-col items-center">
        {/* Cassette Tape Visual Header */}
        <div className="w-full bg-[#1E3A8A] rounded-xl p-3 text-white flex items-center justify-between mb-3 shadow-inner relative overflow-hidden">
          {/* Subtle tape window in the center */}
          <div className="absolute left-1/2 -translate-x-1/2 w-28 h-8 bg-[#0F172A] rounded border border-white/20 flex items-center justify-around px-2">
            {/* Spinning Spool 1 */}
            <motion.div
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="w-5 h-5 rounded-full border-2 border-dashed border-white/80 flex items-center justify-center"
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
            </motion.div>

            {/* Tape line */}
            <div className="h-[2px] w-8 bg-amber-400/80" />

            {/* Spinning Spool 2 */}
            <motion.div
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="w-5 h-5 rounded-full border-2 border-dashed border-white/80 flex items-center justify-center"
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
            </motion.div>
          </div>

          {/* Left Label */}
          <span className="text-[10px] font-mono font-bold tracking-wider text-blue-200 z-10">
            A-SIDE
          </span>

          {/* Right Label */}
          <span className="text-[10px] font-mono font-bold tracking-wider text-blue-200 z-10">
            SURYA'S MIX
          </span>
        </div>

        {/* Track Details & Waveform */}
        <div className="w-full flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#60A5FA] flex items-center justify-center text-white shadow-sm">
              <Music className={`w-5 h-5 ${isPlaying ? 'animate-bounce' : ''}`} />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#1E3A8A] leading-tight">
                Simjim's Birthday Song 🎶
              </h3>
              <p className="text-xs text-[#2563EB] font-medium font-diary text-[13px]">
                Sweet Lo-Fi Birthday Chimes
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-md hover:bg-[#1D4ED8] transition-colors cursor-pointer"
              title={isPlaying ? 'Pause Music' : 'Play Music'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </motion.button>

            <button
              onClick={toggleMute}
              className="p-2 rounded-full text-[#1E3A8A] hover:bg-white/50 transition-colors cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Equalizer animation bar when playing */}
        {isPlaying && (
          <div className="w-full flex items-center justify-center gap-1.5 mt-3 pt-2 border-t border-blue-200">
            {[4, 12, 8, 16, 6, 14, 10, 18, 8, 12, 6].map((h, i) => (
              <motion.span
                key={i}
                animate={{ height: [4, h, 4] }}
                transition={{ repeat: Infinity, duration: 0.8 + (i % 3) * 0.2, ease: 'easeInOut' }}
                className="w-1 bg-[#2563EB] rounded-full"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
