// ===================================
// COLLISION DETECTION SYSTEM
// =================================== 

class Collision {
    /**
     * Check if two rectangles overlap (AABB collision)
     */
    static rectOverlap(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    /**
     * Check if circle and rectangle overlap
     */
    static circleRectOverlap(circle, rect) {
        const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
        const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
        
        const distance = Math.sqrt(
            (circle.x - closestX) ** 2 + 
            (circle.y - closestY) ** 2
        );
        
        return distance < circle.radius;
    }
    
    /**
     * Check if two circles overlap
     */
    static circleOverlap(circle1, circle2) {
        const distance = Math.sqrt(
            (circle1.x - circle2.x) ** 2 + 
            (circle1.y - circle2.y) ** 2
        );
        
        return distance < circle1.radius + circle2.radius;
    }
    
    /**
     * Get collision center point between two rectangles
     */
    static getRectCollisionPoint(rect1, rect2) {
        return {
            x: (rect1.x + rect2.x + rect2.width) / 2,
            y: (rect1.y + rect2.y + rect2.height) / 2
        };
    }
    
    /**
     * Check if point is inside rectangle
     */
    static pointInRect(point, rect) {
        return point.x >= rect.x &&
               point.x <= rect.x + rect.width &&
               point.y >= rect.y &&
               point.y <= rect.y + rect.height;
    }
    
    /**
     * Check if point is inside circle
     */
    static pointInCircle(point, circle) {
        const distance = Math.sqrt(
            (point.x - circle.x) ** 2 + 
            (point.y - circle.y) ** 2
        );
        
        return distance < circle.radius;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Collision;
}