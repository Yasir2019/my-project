// ===================================
// AUDIO MANAGER
// =================================== 

class AudioManager {
    constructor() {
        this.sounds = {};
        this.musicTrack = null;
        this.musicEnabled = storage.loadSettings({}).musicEnabled !== false;
        this.sfxEnabled = storage.loadSettings({}).sfxEnabled !== false;
        this.masterVolume = Config.AUDIO.MASTER_VOLUME;
    }
    
    /**
     * Create audio element
     */
    createAudioElement(id, src) {
        let audio = document.getElementById(id);
        if (!audio) {
            audio = new Audio();
            audio.id = id;
        }
        
        if (src) {
            audio.src = src;
        }
        
        this.sounds[id] = audio;
        return audio;
    }
    
    /**
     * Play sound effect
     */
    playSFX(id, volume = 1) {
        if (!this.sfxEnabled) return;
        
        const audio = this.sounds[id];
        if (!audio) return;
        
        audio.volume = volume * this.masterVolume * Config.AUDIO.SFX_VOLUME;
        audio.currentTime = 0;
        audio.play().catch(e => console.warn('Could not play sound:', e));
    }
    
    /**
     * Play background music
     */
    playMusic(id, loop = true, volume = 1) {
        if (!this.musicEnabled) return;
        
        if (this.musicTrack) {
            this.musicTrack.pause();
            this.musicTrack.currentTime = 0;
        }
        
        const audio = this.sounds[id];
        if (!audio) return;
        
        audio.loop = loop;
        audio.volume = volume * this.masterVolume * Config.AUDIO.MUSIC_VOLUME;
        audio.play().catch(e => console.warn('Could not play music:', e));
        
        this.musicTrack = audio;
    }
    
    /**
     * Stop music
     */
    stopMusic() {
        if (this.musicTrack) {
            this.musicTrack.pause();
            this.musicTrack.currentTime = 0;
            this.musicTrack = null;
        }
    }
    
    /**
     * Set master volume
     */
    setMasterVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        
        Object.values(this.sounds).forEach(audio => {
            if (audio === this.musicTrack) {
                audio.volume = this.masterVolume * Config.AUDIO.MUSIC_VOLUME;
            } else {
                audio.volume = this.masterVolume * Config.AUDIO.SFX_VOLUME;
            }
        });
    }
    
    /**
     * Toggle music
     */
    toggleMusic(enabled) {
        this.musicEnabled = enabled;
        if (enabled && this.musicTrack) {
            this.musicTrack.play();
        } else if (this.musicTrack) {
            this.musicTrack.pause();
        }
        
        storage.saveSettings({
            musicEnabled: enabled,
            sfxEnabled: this.sfxEnabled
        });
    }
    
    /**
     * Toggle SFX
     */
    toggleSFX(enabled) {
        this.sfxEnabled = enabled;
        
        storage.saveSettings({
            musicEnabled: this.musicEnabled,
            sfxEnabled: enabled
        });
    }
    
    /**
     * Stop all sounds
     */
    stopAll() {
        Object.values(this.sounds).forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        this.musicTrack = null;
    }
}

const audioManager = new AudioManager();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioManager;
}