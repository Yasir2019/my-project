// ===================================
// SPACE SHOOTER - CONFIG
// =================================== 

const Config = {
    // Canvas settings
    CANVAS: {
        WIDTH: 800,
        HEIGHT: 1200,
        BACKGROUND: 'rgba(10, 14, 39, 0.1)',
        SCALE_MODE: 'fit' // 'fit' or 'fill'
    },
    
    // Game settings
    GAME: {
        FPS: 60,
        DIFFICULTY_LEVELS: {
            EASY: { speedMultiplier: 0.7, spawnRate: 1.2 },
            NORMAL: { speedMultiplier: 1.0, spawnRate: 1.0 },
            HARD: { speedMultiplier: 1.3, spawnRate: 0.8 },
            INSANE: { speedMultiplier: 1.6, spawnRate: 0.6 }
        }
    },
    
    // Player settings
    PLAYER: {
        WIDTH: 40,
        HEIGHT: 40,
        SPEED: 5,
        FIRE_RATE: 6, // bullets per second
        HEALTH: 100,
        SHIELD_HEALTH: 50,
        COLOR: '#00d4ff',
        GLOW: '#00d4ff'
    },
    
    // Bullet settings
    BULLET: {
        WIDTH: 8,
        HEIGHT: 16,
        SPEED: 7,
        COLOR: '#00d4ff',
        GLOW: '#00d4ff',
        DAMAGE: 10
    },
    
    // Enemy settings
    ENEMY: {
        BASE: {
            WIDTH: 30,
            HEIGHT: 30,
            HEALTH: 20,
            SCORE: 100,
            COLOR: '#ff006e',
            GLOW: '#ff006e',
            SPEED: 1.5
        }
    },
    
    // Wave settings
    WAVE: {
        BASE_SPAWN_RATE: 30, // frames between spawns
        SPAWN_RATE_DECREASE: 1.05,
        ENEMIES_PER_WAVE: 5,
        ENEMIES_INCREASE: 2
    },
    
    // Scoring settings
    SCORING: {
        COMBO_MULTIPLIER: 1.1,
        COMBO_TIMEOUT: 120
    },
    
    // Audio settings
    AUDIO: {
        MASTER_VOLUME: 0.5,
        MUSIC_VOLUME: 0.3,
        SFX_VOLUME: 0.6
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Config;
}