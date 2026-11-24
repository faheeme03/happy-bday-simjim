import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Heart, Image as ImageIcon, Upload } from 'lucide-react';

export default function PhotoboothStrip({ photos, onSelectPhoto }) {
  // Default cute aesthetic illustrations/photos if none provided
  const defaultPhotos = [
    {
      id: 0,
      url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80',
      caption: 'The prettiest birthday girl ✨',
    },
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
      caption: 'Your radiant smile 🌸',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80',
      caption: "Surya's Thangapulla forever 👑💙",
    },
  ];

  const currentPhotos = photos && photos.length === 3 ? photos : defaultPhotos;

  return (
    <div className="flex flex-col items-center select-none">
      {/* 3D Tilted Vintage Photobooth Strip */}
      <motion.div
        whileHover={{ rotate: 0, scale: 1.02 }}
        initial={{ rotate: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="w-[260px] sm:w-[280px] bg-[#FAF8F5] rounded-xl p-3.5 shadow-strip border-2 border-[#E2E8F0] relative flex flex-col items-center"
      >
        {/* Top washi tape ribbon holding the strip */}
        <div className="washi-tape-stripes w-28 h-5 absolute -top-3 left-1/2 -translate-x-1/2 -rotate-2 z-20" />

        {/* Photobooth Header Stamp */}
        <div className="w-full flex items-center justify-between px-1 mb-2.5 text-[#1E3A8A]">
          <div className="flex items-center gap-1">
            <Camera className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[10px] font-black uppercase tracking-widest font-mono">
              PHOTOBOOTH
            </span>
          </div>
          <span className="text-[10px] font-bold text-[#64748B] font-mono">
            SERIES 2026
          </span>
        </div>

        {/* 3 Photo Frames */}
        <div className="w-full flex flex-col gap-3">
          {currentPhotos.map((photo, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="relative w-full aspect-[4/3] bg-blue-50 rounded-lg overflow-hidden border border-[#CBD5E1] shadow-inner group cursor-pointer"
              onClick={() => onSelectPhoto && onSelectPhoto(index)}
              title="Click to zoom or change photo"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Soft film grain / vintage gloss overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />

              {/* Number watermark */}
              <span className="absolute top-1.5 left-2 text-[10px] font-mono font-bold text-white/90 drop-shadow">
                0{index + 1}
              </span>

              {/* Caption */}
              <span className="absolute bottom-1.5 left-2 right-2 text-center text-[11px] font-diary text-white font-bold drop-shadow">
                {photo.caption}
              </span>

              {/* Hover Edit Hint */}
              <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white text-xs font-bold">
                <Upload className="w-4 h-4" />
                <span>Swap Photo</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Barcode & Timestamp Footer */}
        <div className="w-full mt-3 pt-2 border-t border-dashed border-[#CBD5E1] flex flex-col items-center text-center">
          {/* Simulated Barcode */}
          <div className="h-5 w-40 flex justify-between items-end gap-[2px] opacity-75 my-1">
            {[4, 2, 5, 1, 3, 6, 2, 4, 1, 5, 3, 2, 6, 4, 2, 5, 1, 3].map((h, i) => (
              <span
                key={i}
                className="bg-[#1E293B] rounded-[0.5px]"
                style={{ width: `${(i % 3) + 1}px`, height: `${h * 3}px` }}
              />
            ))}
          </div>
          <p className="text-[9px] font-mono font-semibold tracking-wider text-[#475569]">
            SIMJIM • FOREVER LOVED • 2026
          </p>
          <div className="flex items-center gap-1 mt-1 text-[10px] font-diary text-[#2563EB] font-bold">
            <Heart className="w-3 h-3 fill-[#2563EB]" />
            <span>Forever Surya's Thangapulla</span>
            <Heart className="w-3 h-3 fill-[#2563EB]" />
          </div>
        </div>

        {/* Sticker at bottom corner */}
        <span className="absolute -bottom-2 -right-2 text-xl drop-shadow">⭐</span>
      </motion.div>

      {/* Helper text */}
      <p className="text-[11px] text-[#64748B] font-medium mt-3">
        💡 Tip: Click on any photo to swap with your own pictures!
      </p>
    </div>
  );
}
