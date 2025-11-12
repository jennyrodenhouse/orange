// Page Navigation System
class PageNavigator {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 3;
        this.pages = document.querySelectorAll('.page');
        this.dots = document.querySelectorAll('.dot');
        this.textLinks = document.querySelectorAll('.text-link');
        this.navButtons = document.querySelectorAll('.nav-btn');
        
        this.init();
    }
    
    init() {
        // Set up text link navigation
        this.textLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const gotoPage = parseInt(link.getAttribute('data-goto'));
                if (gotoPage) {
                    this.goToPage(gotoPage);
                }
            });
        });
        
        // Set up dot navigation
        this.dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const page = parseInt(dot.getAttribute('data-page'));
                this.goToPage(page);
            });
        });
        
        // Set up arrow navigation
        this.navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const direction = btn.getAttribute('data-nav');
                if (direction === 'next') {
                    this.nextPage();
                } else if (direction === 'prev') {
                    this.prevPage();
                }
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                this.nextPage();
            } else if (e.key === 'ArrowLeft') {
                this.prevPage();
            } else if (e.key >= '1' && e.key <= '3') {
                this.goToPage(parseInt(e.key));
            }
        });
        
        // Touch/Swipe navigation for mobile
        this.setupSwipeNavigation();
        
        // Initialize first page
        this.updatePage();
    }
    
    goToPage(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= this.totalPages) {
            this.currentPage = pageNumber;
            this.updatePage();
        }
    }
    
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        } else {
            this.currentPage = 1; // Loop back to first page
        }
        this.updatePage();
    }
    
    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        } else {
            this.currentPage = this.totalPages; // Loop to last page
        }
        this.updatePage();
    }
    
    updatePage() {
        // Update page visibility
        this.pages.forEach((page, index) => {
            if (index + 1 === this.currentPage) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
        
        // Update dot indicators
        this.dots.forEach((dot, index) => {
            if (index + 1 === this.currentPage) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Add animation class for smooth transitions
        this.pages[this.currentPage - 1].style.animation = 'fadeIn 0.5s ease';
    }
    
    setupSwipeNavigation() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        this.handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next page
                    this.nextPage();
                } else {
                    // Swipe right - previous page
                    this.prevPage();
                }
            }
        };
    }
}

// Enhanced text link interactions
function enhanceTextLinks() {
    const textLinks = document.querySelectorAll('.text-link');
    
    textLinks.forEach(link => {
        // Add subtle hover effect
        link.addEventListener('mouseenter', function() {
            this.style.letterSpacing = '2px';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.letterSpacing = '0';
        });
        
        // Add click ripple effect
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(6, 4, 5, 0.3)';
            ripple.style.left = e.offsetX + 'px';
            ripple.style.top = e.offsetY + 'px';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(20);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;
document.head.appendChild(style);

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const navigator = new PageNavigator();
    enhanceTextLinks();
    
    // Console info for developers
    console.log('%c🎨 Orange Design - Interactive Prototype', 'font-size: 16px; font-weight: bold; color: #575039;');
    console.log('%cNavigation:', 'font-weight: bold;');
    console.log('• Click "text test" to navigate between pages');
    console.log('• Use arrow keys (← →) or navigation buttons');
    console.log('• Click dots to jump to specific pages');
    console.log('• Swipe left/right on touch devices');
    console.log('• Press 1, 2, or 3 to jump to pages');
});

// Preload images for smooth transitions
function preloadImages() {
    const images = [
        'https://www.figma.com/api/mcp/asset/8988c84e-bbb5-4a7a-9f40-f283603b9568',
        'https://www.figma.com/api/mcp/asset/1199ae8f-f034-4853-ab77-9acf807513f4',
        'https://www.figma.com/api/mcp/asset/625c7ca7-529e-40e1-83d7-3eca5989ce62'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();
