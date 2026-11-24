import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ArrowRight, Printer, X, Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function StagePhotobooth({ onNext, customPhotos, onUploadClick }) {
  const [isPrinted, setIsPrinted] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

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
      caption: 'Late night giggles & snacks 🍟',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
      caption: "Surya's Thangapulla forever 👑💙",
    },
  ];

  const photos = customPhotos && customPhotos.length === 4 ? customPhotos : defaultPhotos;

  const handlePrint = () => {
    sounds.playPhotoPrint();
    setIsPrinted(true);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center select-none py-3 px-2">
      {/* Surprise Subtitle */}
      <div className="text-center mb-3">
        <span className="text-[11px] font-mono font-bold tracking-widest text-[#E6496C] uppercase">
          SURPRISE 05 • MOMENTS
        </span>
        <h2 className="font-serif text-3xl font-bold text-[#2B1B2D]">
          The Photo Booth 📸
        </h2>
      </div>

      {/* Photo Booth Graphic & Strip Ejection */}
      <div className="w-full bg-[#FFFDF9] rounded-3xl p-5 shadow-2luv border-2 border-pink-200 relative overflow-hidden flex flex-col items-center">
        {!isPrinted ? (
          /* Pre-print Photo Booth Cabinet */
          <div className="flex flex-col items-center my-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#E6496C] to-[#FDA4AF] shadow-lg flex items-center justify-center text-white mb-4">
              <Camera className="w-10 h-10" />
            </div>

            <h3 className="font-serif text-xl font-bold text-[#2B1B2D]">
              Capture The Moments
            </h3>
            <p className="text-xs text-[#6B5E6E] font-medium max-w-xs text-center mt-1 mb-5">
              4 special memory frames printed from our retro photobooth.
            </p>

            <motion.button
              onClick={handlePrint}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E6496C] to-[#D12E57] text-white font-bold text-sm shadow-float flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Photo Booth Strip 📸</span>
            </motion.button>
          </div>
        ) : (
          /* Ejected Vertical Photobooth Strip */
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="w-full flex flex-col items-center"
          >
            {/* The Vintage Filmstrip */}
            <div className="w-[260px] bg-[#FAF8F5] rounded-xl p-3 shadow-polaroid border border-gray-300 relative flex flex-col items-center">
              {/* Top washi tape */}
              <div className="washi-tape-pink w-28 h-5 absolute -top-2.5 left-1/2 -translate-x-1/2 -rotate-1 z-10" />

              {/* Film Strip Header */}
              <div className="w-full flex items-center justify-between text-[10px] font-mono font-bold text-[#E6496C] px-1 mb-2">
                <span>PHOTOBOOTH</span>
                <span>SERIES 2026</span>
              </div>

              {/* 4 Photo Frames */}
              <div className="w-full flex flex-col gap-2.5">
                {photos.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActivePhoto(p)}
                    className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 border border-gray-300 cursor-pointer group"
                    title="Click to view polaroid"
                  >
                    <img
                      src={p.url}
                      alt={p.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                      View Polaroid ✨
                    </div>
                    <span className="absolute bottom-1 left-2 text-[10px] font-hand font-bold text-white drop-shadow">
                      {p.caption}
                    </span>
                  </div>
                ))}
              </div>

              {/* Barcode Footer */}
              <div className="w-full mt-2 pt-2 border-t border-dashed border-gray-300 text-center">
                <span className="text-[9px] font-mono font-bold text-gray-500">
                  SIMJIM • 2-LUV MEMORIES • 2026
                </span>
              </div>
            </div>

            {/* Helper Hint */}
            <p className="text-[11px] text-[#6B5E6E] font-medium mt-3">
              💡 Tip: Tap any photo above to inspect polaroid!
            </p>
          </motion.div>
        )}
      </div>

      {/* Polaroid Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="w-full max-w-xs bg-white p-4 pb-6 rounded-2xl shadow-2xl relative flex flex-col items-center"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-2 right-2 p-1.5 rounded-full text-gray-400 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3 mt-1 shadow-inner">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="font-hand text-xl font-bold text-[#2B1B2D] text-center">
                {activePhoto.caption}
              </p>
              <span className="text-[10px] font-mono text-[#E6496C] font-bold mt-1">
                FOR SIMJIM 💙 FROM SURYA
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Next Surprise Button */}
      {isPrinted && (
        <div className="w-full mt-4">
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E6496C] to-[#D12E57] text-white font-bold text-sm shadow-float hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Next surprise: Our Date 🗓️</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
