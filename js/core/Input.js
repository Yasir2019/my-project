// ===================================
// INPUT MANAGER
// =================================== 

class InputManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.keys = {};
        this.mouse = { x: 0, y: 0, pressed: false };
        this.touch = { x: 0, y: 0, pressed: false };
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Keyboard
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        // Mouse
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.canvas.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));
        
        // Touch
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e));
    }
    
    handleKeyDown(e) {
        this.keys[e.key.toLowerCase()] = true;
    }
    
    handleKeyUp(e) {
        this.keys[e.key.toLowerCase()] = false;
    }
    
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = Config.CANVAS.WIDTH / this.canvas.clientWidth;
        const scaleY = Config.CANVAS.HEIGHT / this.canvas.clientHeight;
        
        this.mouse.x = (e.clientX - rect.left) * scaleX;
        this.mouse.y = (e.clientY - rect.top) * scaleY;
    }
    
    handleMouseDown(e) {
        this.mouse.pressed = true;
    }
    
    handleMouseUp(e) {
        this.mouse.pressed = false;
    }
    
    handleMouseLeave(e) {
        this.mouse.pressed = false;
    }
    
    handleTouchStart(e) {
        this.touch.pressed = true;
        this.handleTouchMove(e);
    }
    
    handleTouchMove(e) {
        if (e.touches.length === 0) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = Config.CANVAS.WIDTH / this.canvas.clientWidth;
        const scaleY = Config.CANVAS.HEIGHT / this.canvas.clientHeight;
        
        const touch = e.touches[0];
        this.touch.x = (touch.clientX - rect.left) * scaleX;
        this.touch.y = (touch.clientY - rect.top) * scaleY;
    }
    
    handleTouchEnd(e) {
        this.touch.pressed = false;
    }
    
    getHorizontalMovement() {
        let movement = 0;
        if (this.keys['a'] || this.keys['arrowleft']) movement = -1;
        if (this.keys['d'] || this.keys['arrowright']) movement = 1;
        return movement;
    }
    
    getVerticalMovement() {
        let movement = 0;
        if (this.keys['w'] || this.keys['arrowup']) movement = -1;
        if (this.keys['s'] || this.keys['arrowdown']) movement = 1;
        return movement;
    }
    
    isFirePressed() {
        return this.keys[' '] || this.keys['enter'] || this.mouse.pressed || this.touch.pressed;
    }
    
    isPausePressed() {
        return this.keys['escape'] || this.keys['p'];
    }
    
    isKeyPressed(key) {
        return this.keys[key.toLowerCase()] || false;
    }
    
    getPlayerTargetPosition() {
        if (this.touch.pressed) {
            return { x: this.touch.x, y: this.touch.y };
        }
        if (this.mouse.pressed) {
            return { x: this.mouse.x, y: this.mouse.y };
        }
        return null;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = InputManager;
}