/**
 * Sound Manager for Website Audio Effects
 * Uses Web Audio API to generate sound effects programmatically
 */

class SoundManager {
  constructor() {
    this.audioContext = null;
    this.enabled = true;
    this.volume = 0.3;
    
    // Initialize audio context on first user interaction
    this.initializeAudioContext();
  }

  initializeAudioContext() {
    try {
      // Create audio context (will be suspended until user interaction)
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
      this.enabled = false;
    }
  }

  async ensureAudioContext() {
    if (!this.audioContext || !this.enabled) return false;
    
    if (this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
      } catch (error) {
        console.warn('Could not resume audio context:', error);
        return false;
      }
    }
    return true;
  }

  // Generate a simple beep sound
  createBeep(frequency = 800, duration = 0.1, type = 'sine') {
    return new Promise(async (resolve) => {
      if (!await this.ensureAudioContext()) {
        resolve();
        return;
      }

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(this.volume, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);

      oscillator.onended = () => resolve();
    });
  }

  // Create a click sound
  async playClick() {
    if (!this.enabled) return;
    await this.createBeep(1000, 0.05, 'square');
  }

  // Create a hover sound
  async playHover() {
    if (!this.enabled) return;
    await this.createBeep(600, 0.03, 'sine');
  }

  // Create a page transition sound
  async playPageTransition() {
    if (!this.enabled) return;
    // Play a pleasant chord progression
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
    const promises = frequencies.map((freq, index) => 
      new Promise(resolve => {
        setTimeout(() => {
          this.createBeep(freq, 0.2, 'sine').then(resolve);
        }, index * 50);
      })
    );
    await Promise.all(promises);
  }

  // Create a success sound
  async playSuccess() {
    if (!this.enabled) return;
    const frequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    for (let i = 0; i < frequencies.length; i++) {
      setTimeout(() => {
        this.createBeep(frequencies[i], 0.15, 'sine');
      }, i * 80);
    }
  }

  // Create an error sound
  async playError() {
    if (!this.enabled) return;
    await this.createBeep(200, 0.3, 'sawtooth');
  }

  // Create a notification sound
  async playNotification() {
    if (!this.enabled) return;
    await this.createBeep(800, 0.1, 'sine');
    setTimeout(() => {
      this.createBeep(600, 0.1, 'sine');
    }, 100);
  }

  // Toggle sound on/off
  toggleSound() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  // Set volume (0 to 1)
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  // Initialize sound on first user interaction
  initializeOnUserGesture() {
    const initSound = async () => {
      await this.ensureAudioContext();
      // Remove the event listeners after first interaction
      document.removeEventListener('click', initSound);
      document.removeEventListener('keydown', initSound);
      document.removeEventListener('touchstart', initSound);
    };

    // Add event listeners for user gestures
    document.addEventListener('click', initSound, { once: true });
    document.addEventListener('keydown', initSound, { once: true });
    document.addEventListener('touchstart', initSound, { once: true });
  }
}

// Create and export a singleton instance
const soundManager = new SoundManager();

// Initialize on user gesture
soundManager.initializeOnUserGesture();

export default soundManager;
