// ===================================
// ENEMY CLASS
// =================================== 

class Enemy extends Entity {
    constructor(x, y, enemyType = 'scout') {
        const config = Config.ENEMY.TYPES[enemyType] || Config.ENEMY.BASE;
        
        super(x, y, config.WIDTH, config.HEIGHT);
        
        this.type = 'enemy';
        this.enemyType = enemyType;
        this.tag = 'enemy';
        
        this.health = config.HEALTH;
        this.maxHealth = config.HEALTH;
        this.score = config.SCORE;
        this.speed = config.SPEED;
        this.fireRate = config.FIRE_RATE;
        this.fireCounter = 0;
        
        this.vy = this.speed;
        this.vx = (Math.random() - 0.5) * 2;
        
        this.color = Config.ENEMY.COLOR;
        this.glow = Config.ENEMY.GLOW;
    }
    
    /**
     * Update enemy state
     */
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off sides
        if (this.x - this.width / 2 < 0 || this.x + this.width / 2 > Config.CANVAS.WIDTH) {
            this.vx *= -1;
        }
        
        // Fire counter
        this.fireCounter++;
        
        // Check bounds
        if (this.y > Config.CANVAS.HEIGHT + this.height) {
            this.alive = false;
        }
        
        // Check health
        if (this.health <= 0) {
            this.alive = false;
        }
    }
    
    /**
     * Check if can fire
     */
    canFire() {
        if (this.fireRate <= 0) return false;
        return this.fireCounter >= (60 / this.fireRate);
    }
    
    /**
     * Fire weapon
     */
    fire() {
        this.fireCounter = 0;
        audioManager.playSFX('audio-shoot', 0.3);
    }
    
    /**
     * Draw enemy
     */
    draw(canvas) {
        if (!this.visible) return;
        
        canvas.drawGlowCircle(
            this.x,
            this.y,
            this.width / 2,
            this.color,
            this.glow,
            12
        );
        
        // Draw health bar if damaged
        if (this.health < this.maxHealth) {
            const barWidth = this.width + 4;
            const barHeight = 4;
            const healthPercent = this.health / this.maxHealth;
            
            canvas.drawRect(
                this.x - barWidth / 2,
                this.y - this.height / 2 - 8,
                barWidth,
                barHeight,
                'rgba(0, 0, 0, 0.5)'
            );
            
            canvas.drawRect(
                this.x - barWidth / 2,
                this.y - this.height / 2 - 8,
                barWidth * healthPercent,
                barHeight,
                '#ff006e'
            );
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Enemy;
}