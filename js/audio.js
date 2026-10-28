/**
 * EduQuest AI - Web Audio API Sound Synthesizer
 * Generates child-friendly audio feedback using browser oscillators.
 * Zero external audio assets required; fully offline & instant.
 */

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.loadSettings();
  }

  loadSettings() {
    try {
      const saved = localStorage.getItem("eduquest_sound_muted");
      if (saved !== null) {
        this.muted = JSON.parse(saved);
      }
    } catch (e) {
      this.muted = false;
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    try {
      localStorage.setItem("eduquest_sound_muted", JSON.stringify(this.muted));
    } catch (e) {}
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playNote(freq, type, duration, delay = 0, gainLevel = 0.15) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const startTime = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(gainLevel, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  playClick() {
    this.playNote(480, "sine", 0.05, 0, 0.08);
  }

  playCorrect() {
    // Cheerful ascending major triad (C5 -> E5 -> G5)
    this.playNote(523.25, "triangle", 0.12, 0, 0.15);
    this.playNote(659.25, "triangle", 0.12, 0.08, 0.16);
    this.playNote(783.99, "triangle", 0.28, 0.16, 0.18);
  }

  playIncorrect() {
    // Gentle soft descending tone (encouraging, never harsh)
    this.playNote(330, "sine", 0.18, 0, 0.14);
    this.playNote(260, "sine", 0.25, 0.12, 0.12);
  }

  playStreak() {
    // Energetic sparkle
    this.playNote(587.33, "triangle", 0.1, 0, 0.14);
    this.playNote(739.99, "triangle", 0.1, 0.07, 0.15);
    this.playNote(880.00, "triangle", 0.1, 0.14, 0.16);
    this.playNote(1046.50, "sine", 0.25, 0.21, 0.18);
  }

  playFanfare() {
    // Victory fanfare!
    const notes = [
      { f: 523.25, d: 0.12, time: 0 },
      { f: 659.25, d: 0.12, time: 0.12 },
      { f: 783.99, d: 0.14, time: 0.24 },
      { f: 1046.50, d: 0.45, time: 0.38 }
    ];
    notes.forEach(n => this.playNote(n.f, "triangle", n.d, n.time, 0.2));
  }

  playBadge() {
    // Magical sparkle chords
    const notes = [784, 988, 1175, 1319, 1568];
    notes.forEach((f, i) => {
      this.playNote(f, "sine", 0.22, i * 0.06, 0.12);
    });
  }
}

window.soundEffects = new SoundEffects();

