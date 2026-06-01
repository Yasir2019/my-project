// ===================================
// EFFECTS MANAGER
// =================================== 

class ScreenShake {
    constructor(intensity, duration) {
        this.intensity = intensity;
        this.duration = duration;
        this.elapsed = 0;
        this.offsetX = 0;
        this.offsetY = 0;
    }
    
    update() {
        this.elapsed++;
        
        if (this.elapsed < this.duration) {
            const progress = 1 - (this.elapsed / this.duration);
            this.offsetX = (Math.random() - 0.5) * this.intensity * progress;
            this.offsetY = (Math.random() - 0.5) * this.intensity * progress;
        } else {
            this.offsetX = 0;
            this.offsetY = 0;
        }
    }
    
    isActive() {
        return this.elapsed < this.duration;
    }
}

class EffectsManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.screenShake = null;
        this.bloomGlow = 0;
    }
    
    /**
     * Trigger screen shake
     */
    shake(intensity = 5, duration = 10) {
        this.screenShake = new ScreenShake(intensity, duration);
    }
    
    /**
     * Trigger bloom glow effect
     */
    triggerBloom(intensity = 0.5, duration = 20) {
        this.bloomGlow = intensity;
        
        setTimeout(() => {
            this.bloomGlow = 0;
        }, duration * (1000 / 60));
    }
    
    /**
     * Update effects
     */
    update() {
        if (this.screenShake) {
            this.screenShake.update();
            
            if (!this.screenShake.isActive()) {
                this.screenShake = null;
            }
        }
        
        if (this.bloomGlow > 0) {
            this.bloomGlow *= 0.95;
        }
    }
    
    /**
     * Apply screen shake to canvas
     */
    applyScreenShake() {
        if (!this.screenShake) return { x: 0, y: 0 };
        
        return {
            x: this.screenShake.offsetX,
            y: this.screenShake.offsetY
        };
    }
    
    /**
     * Apply bloom effect
     */
    applyBloom() {
        if (this.bloomGlow <= 0) return;
        
        this.canvas.ctx.save();
        this.canvas.ctx.fillStyle = `rgba(255, 255, 255, ${this.bloomGlow * 0.1})`;
        this.canvas.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.ctx.restore();
    }
    
    /**
     * Draw flash effect
     */
    drawFlash(color = 'rgba(255, 255, 255, 0.3)') {
        this.canvas.ctx.save();
        this.canvas.ctx.fillStyle = color;
        this.canvas.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.ctx.restore();
    }
}

const effectsManager = new EffectsManager(null); // Initialized with canvas in Game.js

if (typeof module !== 'undefined' && module.exports) {
    module.exports = EffectsManager;
}