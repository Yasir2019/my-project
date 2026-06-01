// ===================================
// CANVAS MANAGER
// =================================== 

class CanvasManager {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d', { 
            alpha: false,
            willReadFrequently: false 
        });
        
        this.width = Config.CANVAS.WIDTH;
        this.height = Config.CANVAS.HEIGHT;
        
        this.setupCanvas();
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
    }
    
    setupCanvas() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        const dpr = window.devicePixelRatio || 1;
        if (dpr > 1) {
            this.canvas.width *= dpr;
            this.canvas.height *= dpr;
            this.ctx.scale(dpr, dpr);
        }
        
        this.ctx.imageSmoothingEnabled = false;
    }
    
    handleResize() {
        const container = this.canvas.parentElement;
        const maxWidth = container.clientWidth - 20;
        const maxHeight = container.clientHeight - 20;
        
        let scale = Math.min(maxWidth / this.width, maxHeight / this.height);
        scale = Math.max(scale, 0.5);
        
        this.canvas.style.width = (this.width * scale) + 'px';\n        this.canvas.style.height = (this.height * scale) + 'px';
    }
    
    clear() {
        this.ctx.fillStyle = Config.CANVAS.BACKGROUND;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    drawBackground() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, 'rgba(26, 15, 46, 0.3)');
        gradient.addColorStop(0.5, 'rgba(10, 14, 39, 0.2)');
        gradient.addColorStop(1, 'rgba(5, 8, 16, 0.3)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    drawRect(x, y, width, height, color, strokeColor = null, lineWidth = 2) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
        
        if (strokeColor) {
            this.ctx.strokeStyle = strokeColor;
            this.ctx.lineWidth = lineWidth;
            this.ctx.strokeRect(x, y, width, height);
        }
    }
    
    drawCircle(x, y, radius, color, strokeColor = null, lineWidth = 2) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        if (strokeColor) {
            this.ctx.strokeStyle = strokeColor;
            this.ctx.lineWidth = lineWidth;
            this.ctx.stroke();
        }
    }
    
    drawText(text, x, y, fontSize = 16, color = '#fff', align = 'left') {
        this.ctx.font = `bold ${fontSize}px 'Courier New'`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = align;
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, x, y);
    }
    
    drawLine(x1, y1, x2, y2, color, lineWidth = 2) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }
    
    drawGlowCircle(x, y, radius, color, glowColor, glowSize = 10) {
        this.ctx.shadowColor = glowColor;
        this.ctx.shadowBlur = glowSize;
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    }
    
    getContext() {
        return this.ctx;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CanvasManager;
}