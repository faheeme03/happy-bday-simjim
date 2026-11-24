// Web Audio API Synthesizer for Birthday Music & Scrapbook SFX
class SoundController {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isPlayingMusic = false;
    this.timer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isPlayingMusic) {
      this.stopMusic();
    }
    return this.isMuted;
  }

  playTone(freq, type = 'sine', duration = 0.35, gainVal = 0.12) {
    if (this.isMuted) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {}
  }

  // Envelope opening / Page flip swoosh chime
  playOpenEnvelope() {
    this.init();
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((f, i) => {
      setTimeout(() => {
        this.playTone(f, 'sine', 0.45, 0.16);
      }, i * 75);
    });
  }

  // Camera shutter click for photobooth
  playShutter() {
    this.init();
    if (this.isMuted) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);

      setTimeout(() => {
        this.playTone(1200, 'sine', 0.09, 0.15);
      }, 90);
    } catch {}
  }

  // Blow out candle sound effect (wind whoosh + sparkle)
  playBlowCandles() {
    this.init();
    if (this.isMuted) return;
    try {
      // Gentle puff whoosh
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);

      // Magical sparkle celebration fanfare
      setTimeout(() => {
        const fanfare = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
        fanfare.forEach((f, i) => {
          setTimeout(() => {
            this.playTone(f, 'triangle', 0.6, 0.18);
          }, i * 90);
        });
      }, 350);
    } catch {}
  }

  // Gentle music box "Happy Birthday" lo-fi lullaby loop
  startMusic() {
    this.init();
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    // Happy birthday melody notes in C Major (C4, D4, E4, F4, G4, A4, B4, C5)
    const melody = [
      { f: 523.25, d: 0.35, pause: 400 }, // C
      { f: 523.25, d: 0.35, pause: 400 }, // C
      { f: 587.33, d: 0.6,  pause: 650 }, // D
      { f: 523.25, d: 0.6,  pause: 650 }, // C
      { f: 698.46, d: 0.6,  pause: 650 }, // F
      { f: 659.25, d: 1.1,  pause: 1100 }, // E

      { f: 523.25, d: 0.35, pause: 400 }, // C
      { f: 523.25, d: 0.35, pause: 400 }, // C
      { f: 587.33, d: 0.6,  pause: 650 }, // D
      { f: 523.25, d: 0.6,  pause: 650 }, // C
      { f: 783.99, d: 0.6,  pause: 650 }, // G
      { f: 698.46, d: 1.1,  pause: 1100 }, // F

      { f: 523.25, d: 0.35, pause: 400 }, // C
      { f: 523.25, d: 0.35, pause: 400 }, // C
      { f: 1046.50, d: 0.6, pause: 650 }, // C' (Octave)
      { f: 880.00, d: 0.6,  pause: 650 }, // A
      { f: 698.46, d: 0.6,  pause: 650 }, // F
      { f: 659.25, d: 0.6,  pause: 650 }, // E
      { f: 587.33, d: 0.9,  pause: 950 }, // D

      { f: 932.33, d: 0.35, pause: 400 }, // Bb
      { f: 932.33, d: 0.35, pause: 400 }, // Bb
      { f: 880.00, d: 0.6,  pause: 650 }, // A
      { f: 698.46, d: 0.6,  pause: 650 }, // F
      { f: 783.99, d: 0.6,  pause: 650 }, // G
      { f: 698.46, d: 1.4,  pause: 1600 } // F
    ];

    let noteIndex = 0;
    const playNextNote = () => {
      if (!this.isPlayingMusic) return;
      const current = melody[noteIndex % melody.length];
      if (!this.isMuted) {
        this.playTone(current.f, 'sine', current.d, 0.08);
        // Soft harmony bass note
        this.playTone(current.f * 0.5, 'triangle', current.d * 0.8, 0.04);
      }
      noteIndex++;
      this.timer = setTimeout(playNextNote, current.pause);
    };

    playNextNote();
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.timer) clearTimeout(this.timer);
  }

  toggleMusic() {
    if (this.isPlayingMusic) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }
}

export const sounds = new SoundController();
