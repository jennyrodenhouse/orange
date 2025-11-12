# Orange Design - Interactive Prototype

A fully interactive web implementation of the Figma prototype with seamless page navigation and smooth transitions.

## 📁 Files

- `index.html` - Main HTML structure with 3 pages
- `styles.css` - Complete styling with exact Figma measurements
- `script.js` - Interactive navigation system

## ✨ Features

### Navigation Methods
1. **Click Navigation** - Click on "text test" to navigate between pages:
   - Page 1 → Page 2
   - Page 2 → Page 3
   - Page 3 → Page 1 (loops back)

2. **Arrow Buttons** - Use the navigation controls at the bottom
   - Previous/Next buttons
   - Dot indicators for each page

3. **Keyboard Navigation**
   - `←` / `→` - Navigate between pages
   - `1`, `2`, `3` - Jump directly to specific pages

4. **Touch/Swipe** - On mobile devices
   - Swipe left for next page
   - Swipe right for previous page

### Design Details

#### Page 1
- White background
- Large house fly image (full bleed, extends beyond canvas)
- "text test" link positioned at 419px, 412px
- Jacquard 12 font at 200px

#### Page 2
- Olive/brown background (#575039)
- "text test" link in same position
- Minimal, text-focused design

#### Page 3
- White background
- Small house fly image (bottom right)
- Drawing/sketch image (top left)
- "text test" link in same position

### Interactions
- Smooth fade transitions between pages (0.5s)
- Hover effects on text links (scale, opacity)
- Letter spacing animation on hover
- Click ripple effects
- Responsive scaling for different screen sizes

## 🚀 Usage

Simply open `index.html` in a web browser. No build process or dependencies required!

```bash
# Open in your default browser
open index.html

# Or serve with a simple HTTP server
python3 -m http.server 8000
# Then navigate to http://localhost:8000
```

## 🎨 Customization

### Changing Colors
Edit `styles.css`:
```css
#pg1 { background-color: #ffffff; }
#pg2 { background-color: #575039; }
#pg3 { background-color: #ffffff; }
```

### Adjusting Transition Speed
Edit `styles.css`:
```css
.page {
    transition: opacity 0.5s ease, visibility 0.5s ease;
}
```

### Navigation Flow
Edit `index.html` data attributes:
```html
<a href="#" class="text-link" data-goto="2">
```

## 📱 Responsive Design

The prototype scales automatically for different screen sizes:
- Desktop (1440px+): Full size
- Tablet (1024px): 70% scale
- Mobile (768px): 50% scale
- Small Mobile: 40% scale

## 🖼️ Assets

Images are hosted on Figma's CDN and will be available for 7 days. After that, you'll need to:
1. Download images from Figma
2. Save to a local `images/` folder
3. Update image paths in `index.html`

## 🛠️ Technical Details

- **Font**: Jacquard 12 (loaded from Google Fonts)
- **Dimensions**: 1440px × 1024px (desktop standard)
- **Framework**: Vanilla JavaScript (no dependencies)
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## 📝 Notes

- All measurements match the Figma design exactly
- Positioning uses absolute layout as per the design
- Images maintain aspect ratio and cover positioning
- Navigation is cyclical (page 3 → page 1)

## 🔧 Development

The code is organized into three main components:

1. **PageNavigator Class** (`script.js`)
   - Handles all navigation logic
   - Manages page state
   - Updates UI indicators

2. **Style System** (`styles.css`)
   - Page-specific styles
   - Responsive breakpoints
   - Animation definitions

3. **HTML Structure** (`index.html`)
   - Semantic markup
   - Data attributes for navigation
   - Accessibility considerations

---

Made with ❤️ from your Figma design
