// ===================================
// POWERUP CLASS
// =================================== 

class Powerup extends Entity {
    constructor(x, y, type = 'shield') {
        super(x, y, 20, 20);
        
        this.type = 'powerup';
        this.powerupType = type;
        this.tag = 'powerup';
        
        this.vy = 2;
        this.vx = (Math.random() - 0.5) * 1;
        
        this.lifetime = 600; // frames
        this.age = 0;
        
        // Color based on type
        switch (type) {
            case 'rapid_fire':
                this.color = '#ffd60a';
                break;
            case 'shield':
                this.color = '#00d4ff';
                break;
            case 'bomb':
                this.color = '#ff006e';
                break;
            default:
                this.color = '#ffd60a';
        }
    }
    
    /**
     * Update powerup state
     */
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        this.age++;
        
        // Fade out near end of life
        if (this.age > this.lifetime - 120) {
            this.visible = Math.random() > 0.5; // Blink effect
        }
        
        // Despawn
        if (this.age >= this.lifetime || this.y > Config.CANVAS.HEIGHT) {
            this.alive = false;
        }
    }
    
    /**
     * Draw powerup
     */
    draw(canvas) {
        if (!this.visible) return;
        
        const alpha = 1 - ((this.age / this.lifetime) * 0.5);
        
        canvas.ctx.save();
        canvas.ctx.globalAlpha = alpha;
        
        canvas.drawGlowCircle(
            this.x,
            this.y,
            this.width / 2,
            this.color,
            this.color,
            10
        );
        
        // Draw type symbol
        canvas.drawText(
            this.powerupType[0].toUpperCase(),
            this.x,
            this.y,
            12,
            '#000',
            'center'
        );
        
        canvas.ctx.restore();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Powerup;
}