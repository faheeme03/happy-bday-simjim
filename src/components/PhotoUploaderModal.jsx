import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Image as ImageIcon, Check, RotateCcw } from 'lucide-react';

export default function PhotoUploaderModal({
  isOpen,
  onClose,
  targetSlot, // index 0, 1, 2 for photobooth or 'polaroid'
  onSavePhoto,
  onResetDefaults,
}) {
  const [previewUrl, setPreviewUrl] = useState('');
  const [customCaption, setCustomCaption] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (previewUrl) {
      onSavePhoto(targetSlot, previewUrl, customCaption);
      setPreviewUrl('');
      setCustomCaption('');
      onClose();
    }
  };

  const slotTitle =
    targetSlot === 'polaroid'
      ? 'Scrapbook Polaroid Photo'
      : `Photobooth Photo #${typeof targetSlot === 'number' ? targetSlot + 1 : 1}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border-2 border-[#BFDBFE] relative flex flex-col items-center"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="w-10 h-10 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center mb-2">
            <ImageIcon className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-[#1E3A8A] text-center">
            Customize {slotTitle}
          </h3>
          <p className="text-xs text-[#64748B] text-center mb-4">
            Upload any photo from your phone or laptop!
          </p>

          {/* File Upload Area */}
          <label className="w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-[#93C5FD] bg-blue-50/50 hover:bg-blue-50 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group transition-colors">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-1.5 p-4 text-center">
                <Upload className="w-8 h-8 text-[#3B82F6] group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-[#1E40AF]">
                  Click to select photo
                </span>
                <span className="text-[10px] text-[#64748B]">
                  PNG, JPG, or WEBP supported
                </span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Optional Caption Input */}
          <div className="w-full mt-3">
            <label className="text-[11px] font-bold text-[#1E3A8A] block mb-1">
              Custom Caption (Optional):
            </label>
            <input
              type="text"
              placeholder="e.g. Beautiful memories 💙"
              value={customCaption}
              onChange={(e) => setCustomCaption(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#2563EB] text-[#1E293B]"
            />
          </div>

          {/* Action Buttons */}
          <div className="w-full flex items-center gap-2 mt-4">
            <button
              onClick={handleSave}
              disabled={!previewUrl}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                previewUrl
                  ? 'bg-[#2563EB] hover:bg-[#1D4ED8] shadow-md'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Save Photo</span>
            </button>

            <button
              onClick={() => {
                onResetDefaults && onResetDefaults();
                onClose();
              }}
              className="px-3 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              title="Reset to default cute illustration"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
