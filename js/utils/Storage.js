// ===================================
// STORAGE UTILITY
// =================================== 

class Storage {
    constructor(prefix = 'SpaceShooter_') {
        this.prefix = prefix;
    }
    
    setLocal(key, value) {
        try {
            const data = JSON.stringify(value);
            localStorage.setItem(this.prefix + key, data);
            return true;
        } catch (e) {
            console.warn('localStorage unavailable:', e);
            return false;
        }
    }
    
    getLocal(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(this.prefix + key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.warn('Error reading from localStorage:', e);
            return defaultValue;
        }
    }
    
    removeLocal(key) {
        try {
            localStorage.removeItem(this.prefix + key);
            return true;
        } catch (e) {
            console.warn('Error removing from localStorage:', e);
            return false;
        }
    }
    
    clearLocal() {
        try {
            const keys = Object.keys(localStorage)
                .filter(k => k.startsWith(this.prefix));
            keys.forEach(k => localStorage.removeItem(k));
            return true;
        } catch (e) {
            console.warn('Error clearing localStorage:', e);
            return false;
        }
    }
    
    saveProgress(data) {
        return this.setLocal('progress', {
            ...data,
            timestamp: Date.now()
        });
    }
    
    loadProgress() {
        return this.getLocal('progress', null);
    }
    
    saveHighScore(score, wave, difficulty) {
        const highScores = this.getLocal('highScores', []);
        highScores.push({
            score,
            wave,
            difficulty,
            timestamp: Date.now()
        });
        highScores.sort((a, b) => b.score - a.score);
        return this.setLocal('highScores', highScores.slice(0, 10));
    }
    
    getHighScores() {
        return this.getLocal('highScores', []);
    }
    
    saveSettings(settings) {
        return this.setLocal('settings', settings);
    }
    
    loadSettings(defaults = {}) {
        return this.getLocal('settings', defaults);
    }
}

const storage = new Storage();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Storage;
}