# Orange - Multi-Page Interactive Experience

A responsive, interactive three-page web experience based on the Figma design.

## Features

### Navigation Methods
- **Swipe gestures** - Swipe left/right on touch devices or drag with mouse
- **Keyboard controls**:
  - Arrow keys (left/right, up/down)
  - Page Up/Page Down
  - Number keys (1, 2, 3)
  - Home/End keys
  - Spacebar
- **Navigation buttons** - Numbered buttons in top-right corner
- **Click interactions** - Click on text and images to navigate
- **Mouse wheel** - Scroll up/down to navigate
- **Browser navigation** - Use browser back/forward buttons

### Page Structure

#### Page 1 (White background)
- Large house fly background image (extends beyond viewport)
- "text test" heading (clickable - goes to page 2)
- Clean, minimal aesthetic

#### Page 2 (Brown/olive background #575039)
- Full-page clickable area
- "text test" heading (clickable - goes to page 3)
- Solid color background

#### Page 3 (White background)
- Small house fly image (bottom right)
- "text test" heading (static, not clickable)
- Hand-drawn illustration (top left, clickable - goes to page 1)
- Multiple interactive elements

### Responsive Design
- Desktop-optimized (1440px)
- Tablet responsive
- Mobile-friendly with touch gestures
- Scales text and images appropriately
- Maintains aspect ratios

### Animations
- Smooth page transitions with slide animations
- Hover effects on interactive elements
- Active/pressed states for better feedback
- Respects `prefers-reduced-motion` for accessibility

### Accessibility
- Keyboard navigation support
- Focus indicators for interactive elements
- Semantic HTML structure
- ARIA-friendly

## Setup

### Option 1: Simple Setup
1. Open `index.html` in a modern web browser
2. No build process required - just open and view!

### Option 2: Local Server (Recommended)
Using Python:
```bash
python -m http.server 8000
```
Then visit: http://localhost:8000

Using Node.js:
```bash
npx serve
```

### Option 3: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## File Structure
```
.
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── script.js       # Navigation and interaction logic
└── README.md       # This file
```

## Technical Details

### Font
Uses Google Fonts "Jacquard 12" - loaded via CDN

### Images
Images are hosted on Figma's CDN:
- Page 1: Large house fly background
- Page 3: Small house fly foreground
- Page 3: Hand-drawn illustration

Note: Figma CDN images expire after 7 days. For production, download and host images locally.

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Key Technologies
- Vanilla JavaScript (ES6+)
- CSS3 with animations and transitions
- Touch events API
- Keyboard events
- History API for URL navigation

## Customization

### Changing Colors
Edit `styles.css`:
```css
#page-1 { background-color: #ffffff; }  /* Page 1 background */
#page-2 { background-color: #575039; }  /* Page 2 background */
#page-3 { background-color: #ffffff; }  /* Page 3 background */
```

### Adjusting Text
Edit `index.html` - change "text test" to your desired text:
```html
<p>Your text here</p>
```

### Modifying Transitions
Edit `styles.css` - adjust transition duration:
```css
.page {
    transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Adding More Pages
1. Add new page in `index.html`:
```html
<div class="page" id="page-4" data-page="4">
    <!-- Your content -->
</div>
```

2. Update `script.js`:
```javascript
const totalPages = 4; // Change from 3 to 4
```

3. Add navigation button in `index.html`:
```html
<button class="nav-btn" data-page="4">4</button>
```

## Performance Optimization

### Image Preloading
Images are preloaded on page load for smooth transitions.

### Transition Throttling
Prevents multiple rapid transitions to ensure smooth animations.

### Touch Event Optimization
Uses `passive: true` listeners for better scroll performance.

## Known Limitations

1. **Image Expiry**: Figma CDN images expire after 7 days. Download and host locally for production.
2. **Font Loading**: Requires internet connection for Google Fonts. Consider hosting locally if offline access needed.
3. **Large Background**: Page 1 background extends beyond viewport intentionally (matches Figma design).

## Debugging

Open browser console and use:
```javascript
// Navigate to specific page
window.navigateTo(2); // Goes to page 2

// Check current page
window.getCurrentPage(); // Returns current page number
```

## Credits

Design: From Figma file "orange"
Implementation: HTML, CSS, JavaScript

## License

Free to use and modify for your projects!
