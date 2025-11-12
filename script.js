// State management
let currentPage = 1;
const totalPages = 3;
let isTransitioning = false;

// Touch gesture tracking
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

// Elements
const pages = document.querySelectorAll('.page');
const navBtns = document.querySelectorAll('.nav-btn');
const swipeHint = document.querySelector('.swipe-hint');

// Initialize
function init() {
    // Set initial active page
    updateActivePage(1);
    
    // Add event listeners
    addNavigationListeners();
    addTouchListeners();
    addKeyboardListeners();
    addClickListeners();
    
    // Hide swipe hint after first interaction
    setTimeout(() => {
        swipeHint.classList.add('hidden');
    }, 5000);
}

// Update active page
function updateActivePage(pageNumber, direction = 'forward') {
    if (isTransitioning || pageNumber === currentPage) return;
    if (pageNumber < 1 || pageNumber > totalPages) return;
    
    isTransitioning = true;
    
    const oldPage = document.querySelector(`#page-${currentPage}`);
    const newPage = document.querySelector(`#page-${pageNumber}`);
    
    // Remove all transition classes
    pages.forEach(page => {
        page.classList.remove('sliding-out-left', 'sliding-out-right', 'sliding-in-left', 'sliding-in-right', 'active');
    });
    
    // Apply appropriate transition classes
    if (direction === 'forward') {
        oldPage.classList.add('sliding-out-left');
        newPage.classList.add('sliding-in-right', 'active');
    } else {
        oldPage.classList.add('sliding-out-right');
        newPage.classList.add('sliding-in-left', 'active');
    }
    
    // Update current page
    currentPage = pageNumber;
    
    // Update nav buttons
    updateNavButtons();
    
    // Update URL hash without scrolling
    history.replaceState(null, null, `#page-${currentPage}`);
    
    // Reset transition flag
    setTimeout(() => {
        isTransitioning = false;
    }, 600);
    
    // Hide swipe hint on first interaction
    swipeHint.classList.add('hidden');
}

// Update navigation buttons
function updateNavButtons() {
    navBtns.forEach(btn => {
        const btnPage = parseInt(btn.dataset.page);
        if (btnPage === currentPage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Navigate to next page
function nextPage() {
    if (currentPage < totalPages) {
        updateActivePage(currentPage + 1, 'forward');
    }
}

// Navigate to previous page
function prevPage() {
    if (currentPage > 1) {
        updateActivePage(currentPage - 1, 'backward');
    }
}

// Navigation button listeners
function addNavigationListeners() {
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetPage = parseInt(btn.dataset.page);
            const direction = targetPage > currentPage ? 'forward' : 'backward';
            updateActivePage(targetPage, direction);
        });
    });
}

// Touch/swipe listeners
function addTouchListeners() {
    const container = document.querySelector('.page-container');
    
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    // Mouse swipe for desktop
    let mouseDown = false;
    let mouseStartX = 0;
    
    container.addEventListener('mousedown', (e) => {
        mouseDown = true;
        mouseStartX = e.clientX;
    });
    
    container.addEventListener('mouseup', (e) => {
        if (mouseDown) {
            const mouseEndX = e.clientX;
            const deltaX = mouseEndX - mouseStartX;
            
            if (Math.abs(deltaX) > 50) {
                if (deltaX < 0) {
                    nextPage();
                } else {
                    prevPage();
                }
            }
        }
        mouseDown = false;
    });
    
    container.addEventListener('mouseleave', () => {
        mouseDown = false;
    });
}

// Handle swipe gesture
function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Check if horizontal swipe is dominant
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        const threshold = 50; // Minimum swipe distance
        
        if (deltaX < -threshold) {
            // Swipe left - go to next page
            nextPage();
        } else if (deltaX > threshold) {
            // Swipe right - go to previous page
            prevPage();
        }
    }
}

// Keyboard navigation
function addKeyboardListeners() {
    document.addEventListener('keydown', (e) => {
        if (isTransitioning) return;
        
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
            case 'PageDown':
                e.preventDefault();
                nextPage();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                prevPage();
                break;
            case 'Home':
                e.preventDefault();
                updateActivePage(1, currentPage > 1 ? 'backward' : 'forward');
                break;
            case 'End':
                e.preventDefault();
                updateActivePage(totalPages, currentPage < totalPages ? 'forward' : 'backward');
                break;
            case '1':
            case '2':
            case '3':
                const pageNum = parseInt(e.key);
                if (pageNum >= 1 && pageNum <= totalPages) {
                    const direction = pageNum > currentPage ? 'forward' : 'backward';
                    updateActivePage(pageNum, direction);
                }
                break;
        }
    });
}

// Click listeners for text and images
function addClickListeners() {
    // Page 1 text - goes to page 2
    const pg1Text = document.getElementById('pg1-text');
    if (pg1Text) {
        pg1Text.addEventListener('click', (e) => {
            e.preventDefault();
            updateActivePage(2, 'forward');
        });
    }
    
    // Page 2 text - goes to page 3
    const pg2Link = document.querySelector('#page-2 .page-text-link');
    if (pg2Link) {
        pg2Link.addEventListener('click', (e) => {
            e.preventDefault();
            updateActivePage(3, 'forward');
        });
    }
    
    // Page 3 drawing - goes to page 1
    const drawing = document.querySelector('.drawing1');
    if (drawing) {
        drawing.addEventListener('click', (e) => {
            e.preventDefault();
            updateActivePage(1, 'backward');
        });
    }
}

// Handle hash navigation on load
function checkInitialHash() {
    const hash = window.location.hash;
    if (hash) {
        const match = hash.match(/#page-(\d+)/);
        if (match) {
            const pageNum = parseInt(match[1]);
            if (pageNum >= 1 && pageNum <= totalPages) {
                updateActivePage(pageNum);
            }
        }
    }
}

// Handle browser back/forward
window.addEventListener('popstate', () => {
    checkInitialHash();
});

// Preload images
function preloadImages() {
    const images = [
        'https://www.figma.com/api/mcp/asset/cf93fb74-8eee-48ff-a83c-39796a6b1171',
        'https://www.figma.com/api/mcp/asset/8a66a288-a76b-4d51-8201-dbe2b25b7569',
        'https://www.figma.com/api/mcp/asset/a32d3a33-a483-4d89-b1bf-a5d810ad6df0'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Wheel navigation (optional)
let wheelTimeout;
document.addEventListener('wheel', (e) => {
    if (isTransitioning) return;
    
    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
        if (Math.abs(e.deltaY) > 30) {
            if (e.deltaY > 0) {
                nextPage();
            } else {
                prevPage();
            }
        }
    }, 50);
}, { passive: true });

// Start the application
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    checkInitialHash();
    init();
});

// Export functions for debugging (optional)
window.navigateTo = updateActivePage;
window.getCurrentPage = () => currentPage;
