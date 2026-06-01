// ===================================
// BASE ENTITY CLASS
// =================================== 

class Entity {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.vx = 0;
        this.vy = 0;
        
        this.health = 100;
        this.maxHealth = 100;
        
        this.alive = true;
        this.visible = true;
        
        this.type = 'entity';
        this.tag = 'default';
    }
    
    /**
     * Update entity state
     */
    update() {
        // Apply velocity
        this.x += this.vx;
        this.y += this.vy;
        
        // Check if out of bounds
        this.checkBounds();
        
        // Check health
        if (this.health <= 0) {
            this.alive = false;
        }
    }
    
    /**
     * Draw entity
     */
    draw(canvas) {
        if (!this.visible) return;
        
        canvas.drawRect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height,
            '#00d4ff'
        );
    }
    
    /**
     * Check if entity is out of bounds
     */
    checkBounds() {
        if (this.y > Config.CANVAS.HEIGHT + this.height ||
            this.y < -this.height ||
            this.x > Config.CANVAS.WIDTH + this.width ||
            this.x < -this.width) {
            this.alive = false;
        }
    }
    
    /**
     * Take damage
     */
    takeDamage(amount) {
        this.health -= amount;
        if (this.health < 0) {
            this.health = 0;
        }
    }
    
    /**
     * Heal entity
     */
    heal(amount) {
        this.health += amount;
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }
    
    /**
     * Get bounding box
     */
    getBounds() {
        return {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2,
            width: this.width,
            height: this.height
        };
    }
    
    /**
     * Get center point
     */
    getCenter() {
        return { x: this.x, y: this.y };
    }
    
    /**
     * Get distance to another entity
     */
    getDistance(other) {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    /**
     * Destroy entity
     */
    destroy() {
        this.alive = false;
        this.visible = false;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Entity;
}