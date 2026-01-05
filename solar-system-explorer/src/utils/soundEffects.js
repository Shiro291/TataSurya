// Sound effects utility using Web Audio API
// No external files needed - all sounds generated programmatically

class SoundEffects {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
    }

    // Initialize audio context (must be called after user interaction)
    init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    // Play countdown beep (3, 2, 1)
    playCountdownBeep() {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = 800; // Higher pitch beep
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    // Play GO! sound (success chime)
    playGoSound() {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(523, this.audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659, this.audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(784, this.audioContext.currentTime + 0.2); // G5
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.4, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.4);
    }

    // Play rocket launch sound (whoosh)
    playRocketLaunch() {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 1.5);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);
        filter.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 1.5);

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 1.5);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 1.5);
    }

    // Play landing sound (thud)
    playLanding() {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(30, this.audioContext.currentTime + 0.2);
        oscillator.type = 'triangle';

        gainNode.gain.setValueAtTime(0.5, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.2);
    }

    // Play success sound (arrival)
    playSuccess() {
        if (!this.enabled || !this.audioContext) return;

        const oscillator1 = this.audioContext.createOscillator();
        const oscillator2 = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator1.frequency.value = 523; // C5
        oscillator2.frequency.value = 659; // E5
        oscillator1.type = 'sine';
        oscillator2.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

        oscillator1.start(this.audioContext.currentTime);
        oscillator2.start(this.audioContext.currentTime);
        oscillator1.stop(this.audioContext.currentTime + 0.5);
        oscillator2.stop(this.audioContext.currentTime + 0.5);
    }

    // Play departure sound (zoom out)
    playDeparture() {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(100, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 1);
        oscillator.type = 'sawtooth';

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 1);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 1);
    }

    // Toggle sound on/off
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // Set enabled state
    setEnabled(enabled) {
        this.enabled = enabled;
    }

    // Ambient Sound System for Planet Atmospheres
    playAmbient(type) {
        // Stop any existing ambient sound
        this.stopAmbient();

        if (!this.enabled || !type || type === 'none') return;

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ambientContext = new AudioContext();

        this.ambientGain = this.ambientContext.createGain();
        this.ambientGain.gain.value = 0.15; // Low volume for ambient
        this.ambientGain.connect(this.ambientContext.destination);

        switch (type) {
            case 'wind': // Mars, Uranus
                // Low frequency wind sound
                this.ambientOscillator = this.ambientContext.createOscillator();
                this.ambientOscillator.type = 'sawtooth';
                this.ambientOscillator.frequency.value = 80;

                const windLFO = this.ambientContext.createOscillator();
                windLFO.frequency.value = 0.5;
                const windLFOGain = this.ambientContext.createGain();
                windLFOGain.gain.value = 20;
                windLFO.connect(windLFOGain);
                windLFOGain.connect(this.ambientOscillator.frequency);

                this.ambientOscillator.connect(this.ambientGain);
                this.ambientOscillator.start();
                windLFO.start();
                break;

            case 'hum': // Saturn, Sun
                // Deep mechanical hum
                this.ambientOscillator = this.ambientContext.createOscillator();
                this.ambientOscillator.type = 'sine';
                this.ambientOscillator.frequency.value = 60;

                const osc2 = this.ambientContext.createOscillator();
                osc2.type = 'sine';
                osc2.frequency.value = 90;

                this.ambientOscillator.connect(this.ambientGain);
                osc2.connect(this.ambientGain);
                this.ambientOscillator.start();
                osc2.start();
                break;

            case 'storm': // Jupiter, Neptune
                // Chaotic storm sounds using noise
                const bufferSize = this.ambientContext.sampleRate * 2;
                const noiseBuffer = this.ambientContext.createBuffer(1, bufferSize, this.ambientContext.sampleRate);
                const output = noiseBuffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    output[i] = Math.random() * 2 - 1;
                }

                this.ambientNoise = this.ambientContext.createBufferSource();
                this.ambientNoise.buffer = noiseBuffer;
                this.ambientNoise.loop = true;

                const filter = this.ambientContext.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.value = 400;

                this.ambientNoise.connect(filter);
                filter.connect(this.ambientGain);
                this.ambientNoise.start();
                break;

            case 'volcanic': // Venus
                // Rumbling volcanic sounds
                this.ambientOscillator = this.ambientContext.createOscillator();
                this.ambientOscillator.type = 'triangle';
                this.ambientOscillator.frequency.value = 40;

                const volcanicLFO = this.ambientContext.createOscillator();
                volcanicLFO.frequency.value = 0.3;
                const volcanicLFOGain = this.ambientContext.createGain();
                volcanicLFOGain.gain.value = 15;
                volcanicLFO.connect(volcanicLFOGain);
                volcanicLFOGain.connect(this.ambientOscillator.frequency);

                this.ambientOscillator.connect(this.ambientGain);
                this.ambientOscillator.start();
                volcanicLFO.start();
                break;

            case 'nature': // Earth
                // Gentle nature ambience
                this.ambientOscillator = this.ambientContext.createOscillator();
                this.ambientOscillator.type = 'sine';
                this.ambientOscillator.frequency.value = 200;

                const natureLFO = this.ambientContext.createOscillator();
                natureLFO.frequency.value = 2;
                const natureLFOGain = this.ambientContext.createGain();
                natureLFOGain.gain.value = 50;
                natureLFO.connect(natureLFOGain);
                natureLFOGain.connect(this.ambientOscillator.frequency);

                const natureGain = this.ambientContext.createGain();
                natureGain.gain.value = 0.1;

                this.ambientOscillator.connect(natureGain);
                natureGain.connect(this.ambientGain);
                this.ambientOscillator.start();
                natureLFO.start();
                break;

            default:
                // Generic space ambience
                this.ambientOscillator = this.ambientContext.createOscillator();
                this.ambientOscillator.type = 'sine';
                this.ambientOscillator.frequency.value = 100;
                this.ambientOscillator.connect(this.ambientGain);
                this.ambientOscillator.start();
        }
    }

    stopAmbient() {
        if (this.ambientOscillator) {
            try {
                this.ambientOscillator.stop();
            } catch (e) {
                // Already stopped
            }
            this.ambientOscillator = null;
        }
        if (this.ambientNoise) {
            try {
                this.ambientNoise.stop();
            } catch (e) {
                // Already stopped
            }
            this.ambientNoise = null;
        }
        if (this.ambientContext) {
            this.ambientContext.close();
            this.ambientContext = null;
        }
        this.ambientGain = null;
    }
}

// Export singleton instance
export const soundEffects = new SoundEffects();
