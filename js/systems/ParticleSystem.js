// ===================================
// PARTICLE SYSTEM
// =================================== 

class Particle {
    constructor(x, y, vx, vy, size, color, lifetime) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = size;
        this.color = color;
        this.lifetime = lifetime;
        this.age = 0;
        this.alive = true;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.2; // gravity
        this.age++;
        
        if (this.age >= this.lifetime) {
            this.alive = false;
        }
    }
    
    draw(canvas) {
        const alpha = 1 - (this.age / this.lifetime);
        const size = this.size * alpha;
        
        canvas.ctx.save();
        canvas.ctx.globalAlpha = alpha;
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.beginPath();
        canvas.ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        canvas.ctx.fill();
        canvas.ctx.restore();
    }
}

class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.particles = [];
    }
    
    /**
     * Create explosion effect
     */
    createExplosion(x, y, count = 15, color = '#ff006e', speed = 4) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            
            const particle = new Particle(
                x, y, vx, vy,
                3 + Math.random() * 2,
                color,
                60 + Math.random() * 20
            );
            
            this.particles.push(particle);
        }
    }
    
    /**
     * Create hit effect
     */
    createHitEffect(x, y, color = '#ffd60a', count = 8) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 2;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            
            const particle = new Particle(
                x, y, vx, vy,
                2 + Math.random() * 1.5,
                color,
                30 + Math.random() * 10
            );
            
            this.particles.push(particle);
        }
    }
    
    /**
     * Create trail effect
     */
    createTrail(x, y, color = '#00d4ff') {
        const particle = new Particle(
            x + (Math.random() - 0.5) * 4,
            y + (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.5,
            1.5 + Math.random() * 1,
            color,
            20
        );
        
        this.particles.push(particle);
    }
    
    /**
     * Update all particles
     */
    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            
            if (!this.particles[i].alive) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    /**
     * Draw all particles
     */
    draw() {
        for (let particle of this.particles) {
            particle.draw(this.canvas);
        }
    }
    
    /**
     * Clear all particles
     */
    clear() {
        this.particles = [];
    }
    
    /**
     * Get particle count
     */
    getCount() {
        return this.particles.length;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ParticleSystem;
}