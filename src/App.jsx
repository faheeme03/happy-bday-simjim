import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Camera, Cake, Sparkles, Volume2, VolumeX, Heart, Image as ImageIcon } from 'lucide-react';
import EnvelopeCover from './components/EnvelopeCover';
import ScrapbookDiary from './components/ScrapbookDiary';
import PhotoboothStrip from './components/PhotoboothStrip';
import BirthdayCakeSection from './components/BirthdayCakeSection';
import MusicPlayerCard from './components/MusicPlayerCard';
import PhotoUploaderModal from './components/PhotoUploaderModal';
import { sounds } from './utils/audio';

export default function App() {
  const [hasOpened, setHasOpened] = useState(false);
  const [activeTab, setActiveTab] = useState('scrapbook'); // 'scrapbook' | 'photobooth' | 'cake'
  const [isMuted, setIsMuted] = useState(false);

  // LocalStorage-backed customizable photos
  const [photos, setPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('simjim_photobooth_photos');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
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
  });

  const [polaroidPhoto, setPolaroidPhoto] = useState(() => {
    try {
      const saved = localStorage.getItem('simjim_polaroid_photo');
      if (saved) return saved;
    } catch {}
    return 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80';
  });

  // Photo Uploader Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [targetSlot, setTargetSlot] = useState(0);

  // Handle Envelope Open
  const handleOpenEnvelope = () => {
    sounds.playOpenEnvelope();
    sounds.startMusic();
    setHasOpened(true);
  };

  const handleToggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const handleSelectPhotoToEdit = (slot) => {
    setTargetSlot(slot);
    setModalOpen(true);
  };

  const handleSavePhoto = (slot, newUrl, caption) => {
    if (slot === 'polaroid') {
      setPolaroidPhoto(newUrl);
      try {
        localStorage.setItem('simjim_polaroid_photo', newUrl);
      } catch {}
    } else {
      const updated = [...photos];
      updated[slot] = {
        ...updated[slot],
        url: newUrl,
        caption: caption || updated[slot].caption,
      };
      setPhotos(updated);
      try {
        localStorage.setItem('simjim_photobooth_photos', JSON.stringify(updated));
      } catch {}
    }
  };

  const handleResetDefaults = () => {
    try {
      localStorage.removeItem('simjim_photobooth_photos');
      localStorage.removeItem('simjim_polaroid_photo');
    } catch {}
    setPhotos([
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
    ]);
    setPolaroidPhoto('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80');
  };

  return (
    <div className="min-h-screen w-full bg-gingham font-sans antialiased text-[#1E3A8A] flex flex-col justify-between relative overflow-x-hidden selection:bg-[#BFDBFE]">
      {/* Floating Audio Mute Toggle */}
      <button
        onClick={handleToggleMute}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/90 backdrop-blur-md border border-[#93C5FD] shadow-md text-[#1E3A8A] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
        title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-[#64748B]" />
        ) : (
          <div className="flex items-center gap-1">
            <span className="w-1 bg-[#2563EB] h-3 rounded-full animate-pulse" />
            <span className="w-1 bg-[#2563EB] h-2 rounded-full animate-pulse delay-75" />
            <Volume2 className="w-4 h-4 text-[#2563EB]" />
          </div>
        )}
      </button>

      {/* Floating Customize Photos Pill Button */}
      {hasOpened && (
        <button
          onClick={() => handleSelectPhotoToEdit(0)}
          className="fixed bottom-4 right-4 z-50 px-4 py-2.5 rounded-full bg-white/95 backdrop-blur-md border-2 border-[#93C5FD] shadow-lg text-[#1E3A8A] hover:bg-blue-50 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer text-xs font-bold"
        >
          <ImageIcon className="w-4 h-4 text-[#2563EB]" />
          <span className="hidden sm:inline">Swap / Upload Photos</span>
          <span className="sm:hidden">Photos</span>
        </button>
      )}

      {/* Main Content Arena */}
      {!hasOpened ? (
        /* Envelope Unwrapping Experience */
        <EnvelopeCover onOpen={handleOpenEnvelope} />
      ) : (
        /* Unfolded Digital Scrapbook Experience */
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full flex-1 flex flex-col items-center p-4 sm:p-6 max-w-6xl mx-auto"
        >
          {/* Top Header Badge */}
          <header className="w-full flex flex-col items-center text-center my-3 sm:my-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#BFDBFE] shadow-sm text-xs font-bold text-[#1E40AF] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>OFFICIAL DIGITAL BIRTHDAY SCRAPBOOK 🎂✨</span>
            </div>
            <h1 className="font-script text-4xl sm:text-6xl font-bold text-[#1E3A8A] tracking-tight">
              Happy Birthday, Simjim! 💙
            </h1>
            <p className="font-diary text-xl sm:text-2xl text-[#2563EB] font-bold mt-1">
              "To Surya's favorite Thangapulla in the whole world"
            </p>

            {/* Interactive Scrapbook Navigation Tabs */}
            <nav className="flex items-center justify-center gap-2 sm:gap-4 mt-5 bg-white/85 p-1.5 rounded-full border border-[#93C5FD] shadow-sm">
              <button
                onClick={() => setActiveTab('scrapbook')}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'scrapbook'
                    ? 'bg-[#2563EB] text-white shadow-md'
                    : 'text-[#1E3A8A] hover:bg-blue-50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Diary & Letter</span>
              </button>

              <button
                onClick={() => setActiveTab('photobooth')}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'photobooth'
                    ? 'bg-[#2563EB] text-white shadow-md'
                    : 'text-[#1E3A8A] hover:bg-blue-50'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Photobooth Strip</span>
              </button>

              <button
                onClick={() => setActiveTab('cake')}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'cake'
                    ? 'bg-[#2563EB] text-white shadow-md'
                    : 'text-[#1E3A8A] hover:bg-blue-50'
                }`}
              >
                <Cake className="w-4 h-4" />
                <span>Blow Candles & Wish</span>
              </button>
            </nav>
          </header>

          {/* Active Tab View */}
          <main className="w-full flex-1 flex flex-col items-center justify-center my-4">
            <AnimatePresence mode="wait">
              {activeTab === 'scrapbook' ? (
                <motion.div
                  key="tab-scrapbook"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="w-full"
                >
                  <ScrapbookDiary
                    polaroidPhoto={polaroidPhoto}
                    onPhotoClick={() => handleSelectPhotoToEdit('polaroid')}
                  />
                </motion.div>
              ) : activeTab === 'photobooth' ? (
                <motion.div
                  key="tab-photobooth"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="w-full flex flex-col items-center"
                >
                  <PhotoboothStrip
                    photos={photos}
                    onSelectPhoto={handleSelectPhotoToEdit}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="tab-cake"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="w-full"
                >
                  <BirthdayCakeSection />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Retro Cassette Music Player Section */}
          <section className="w-full mt-6 mb-8 flex justify-center">
            <MusicPlayerCard />
          </section>

          {/* Footer Signature */}
          <footer className="w-full py-4 text-center border-t border-blue-200/60 mt-auto">
            <p className="font-diary text-base sm:text-lg text-[#1E3A8A] font-bold flex items-center justify-center gap-1.5">
              <span>Made with all my heart for my Thangapulla Simjim</span>
              <Heart className="w-4 h-4 fill-[#2563EB] text-[#2563EB]" />
              <span>• By your Surya</span>
            </p>
            <p className="text-[11px] text-[#64748B] mt-1">
              Forever & Always • Happy Birthday Simjim 🎂✨
            </p>
          </footer>
        </motion.div>
      )}

      {/* Photo Uploader / Customizer Modal */}
      <PhotoUploaderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        targetSlot={targetSlot}
        onSavePhoto={handleSavePhoto}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
