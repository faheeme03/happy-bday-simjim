// Web Audio API Synthesizer for 2-Luv Birthday Experience SFX & Ambient Music
class SoundEngine {
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
      this.stopBGM();
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

  // 1. Wax Seal Break & Open Envelope Chime
  playWaxSeal() {
    this.init();
    if (this.isMuted) return;
    try {
      // Crackle sound
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);

      // Chime progression
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((f, i) => {
        setTimeout(() => {
          this.playTone(f, 'sine', 0.45, 0.14);
        }, 80 + i * 70);
      });
    } catch {}
  }

  // 2. Claw Machine: Move sound
  playClawMove() {
    this.init();
    if (this.isMuted) return;
    this.playTone(420, 'square', 0.06, 0.05);
  }

  // 2. Claw Machine: Grab click
  playClawGrab() {
    this.init();
    if (this.isMuted) return;
    this.playTone(320, 'triangle', 0.12, 0.15);
    setTimeout(() => {
      this.playTone(480, 'sine', 0.15, 0.12);
    }, 120);
  }

  // 2. Claw Machine: Capsule open fanfare
  playPrizeWin() {
    this.init();
    if (this.isMuted) return;
    const fanfare = [523.25, 659.25, 783.99, 1046.50];
    fanfare.forEach((f, i) => {
      setTimeout(() => {
        this.playTone(f, 'triangle', 0.35, 0.16);
      }, i * 90);
    });
  }

  // 3. Page Turn sound
  playPageTurn() {
    this.init();
    if (this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {}
  }

  // 4. Star Wish Jar: Cork Pop & Star Shimmer
  playCorkPop() {
    this.init();
    if (this.isMuted) return;
    try {
      // Pop!
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);

      // Shimmering stars rising
      const sparkles = [659.25, 783.99, 987.77, 1318.51, 1567.98, 1975.53];
      sparkles.forEach((f, i) => {
        setTimeout(() => {
          this.playTone(f, 'sine', 0.4, 0.12);
        }, 80 + i * 65);
      });
    } catch {}
  }

  // 5. Photo Booth: Camera shutter & mechanical print
  playPhotoPrint() {
    this.init();
    if (this.isMuted) return;
    this.playTone(850, 'triangle', 0.07, 0.2);
    setTimeout(() => {
      this.playTone(1300, 'sine', 0.08, 0.15);
    }, 70);
    // Mechanical print sound
    setTimeout(() => {
      this.playTone(220, 'sawtooth', 0.25, 0.04);
    }, 180);
  }

  // 6. Turntable: Tonearm scratch & vinyl spin
  playVinylStart() {
    this.init();
    if (this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(340, this.ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {}
  }

  // 7. Candle Blowing & Grand Victory Fanfare
  playBlowCandles() {
    this.init();
    if (this.isMuted) return;
    try {
      // Wind breath puff
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, this.ctx.currentTime + 0.45);
      gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.45);

      // Celebration fanfare
      setTimeout(() => {
        const fanfare = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
        fanfare.forEach((f, i) => {
          setTimeout(() => {
            this.playTone(f, 'triangle', 0.6, 0.18);
          }, i * 100);
        });
      }, 350);
    } catch {}
  }

  // Ambient Lo-Fi Background Music
  startBGM() {
    this.init();
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    // Gentle chord progression in F Major / D Minor (warm & dreamy)
    const melody = [
      { f: 659.25, d: 0.8, p: 900 },  // E5
      { f: 587.33, d: 0.8, p: 900 },  // D5
      { f: 523.25, d: 1.2, p: 1300 }, // C5
      { f: 659.25, d: 0.8, p: 900 },  // E5
      { f: 783.99, d: 1.0, p: 1100 }, // G5
      { f: 698.46, d: 1.4, p: 1500 }, // F5
      { f: 523.25, d: 0.8, p: 900 },  // C5
      { f: 587.33, d: 1.2, p: 1300 }  // D5
    ];

    let idx = 0;
    const loop = () => {
      if (!this.isPlayingMusic) return;
      if (!this.isMuted) {
        const note = melody[idx % melody.length];
        this.playTone(note.f, 'sine', note.d, 0.07);
        // Harmony note
        this.playTone(note.f * 0.75, 'sine', note.d * 0.8, 0.03);
      }
      idx++;
      this.timer = setTimeout(loop, melody[(idx - 1) % melody.length].p);
    };

    loop();
  }

  stopBGM() {
    this.isPlayingMusic = false;
    if (this.timer) clearTimeout(this.timer);
  }

  toggleBGM() {
    if (this.isPlayingMusic) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }
}

export const sounds = new SoundEngine();
