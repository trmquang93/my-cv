# Premium CV Website

A modern, responsive, and accessible portfolio website built with vanilla HTML, CSS, and JavaScript following Apple's design principles.

## Features

### 🎨 Design & UX
- **Apple-inspired Design**: Clean, modern interface following Apple's design language
- **Responsive Layout**: Optimized for all devices (mobile-first approach)
- **Smooth Animations**: Subtle animations and transitions for enhanced user experience
- **Dark/Light Mode Support**: Automatic adaptation to user preferences

### ♿ Accessibility
- **WCAG 2.1 AA Compliant**: Full accessibility standards compliance
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast Mode**: Support for users with visual impairments
- **Skip Links**: Quick navigation for assistive technologies

### ⚡ Performance
- **Optimized Loading**: Lazy loading, code splitting, and resource optimization
- **Core Web Vitals**: Excellent LCP, FID, and CLS scores
- **Modular Architecture**: Separated CSS and JS for better maintainability
- **Caching Strategy**: Optimized browser caching with .htaccess

### 🛠 Technical Stack
- **HTML5**: Semantic markup with structured data
- **CSS3**: Modern features (Grid, Flexbox, Custom Properties)
- **Vanilla JavaScript**: ES6+ modules, no frameworks
- **Progressive Enhancement**: Works without JavaScript

## File Structure

```
/
├── index.html              # Main HTML file
├── css/                    # Modular CSS files
│   ├── variables.css       # CSS custom properties
│   ├── base.css           # Base styles and reset
│   ├── hero.css           # Hero section styles
│   ├── navigation.css     # Navigation styles
│   ├── components.css     # Reusable components
│   ├── sections.css       # Section-specific styles
│   ├── animations.css     # Animation definitions
│   └── responsive.css     # Media queries
├── js/                    # Modular JavaScript files
│   ├── main.js           # Main application entry
│   ├── utils.js          # Utility functions
│   ├── navigation.js     # Navigation logic
│   ├── animations.js     # Animation management
│   ├── interactions.js   # User interactions
│   └── performance.js    # Performance monitoring
├── .htaccess             # Server configuration
└── README.md             # This file
```

## Setup & Development

### Local Development
1. Clone the repository
2. Serve the files using a local server (e.g., Python's `http.server`)
3. Open in browser and start developing

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

### Production Deployment
1. Upload all files to your web server
2. Ensure .htaccess rules are applied (Apache)
3. Configure HTTPS
4. Test performance and accessibility

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Graceful Degradation**: Basic functionality works in older browsers

## Performance Metrics

The website is optimized for excellent Core Web Vitals:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## Accessibility Features

- ✅ Semantic HTML structure
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Color contrast compliance
- ✅ Focus indicators
- ✅ Skip links
- ✅ Reduced motion support

## SEO Optimization

- **Meta Tags**: Comprehensive meta descriptions and keywords
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Structured Data**: JSON-LD markup for search engines
- **Semantic Markup**: Proper heading hierarchy and content structure

## Customization

### Colors
Modify the color palette in `css/variables.css`:
```css
:root {
    --primary-blue: #007AFF;
    --secondary-blue: #5AC8FA;
    /* Add your custom colors */
}
```

### Typography
Update font settings in `css/variables.css`:
```css
:root {
    --font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-weight-regular: 400;
    /* Customize typography */
}
```

### Content
Update the content directly in `index.html` or create a CMS integration.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (accessibility, performance, cross-browser)
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

- **Design Inspiration**: Apple's design guidelines
- **Icons**: Emoji (for broad compatibility)
- **Fonts**: SF Pro Display (system fallbacks)

---

Built with ❤️ for exceptional user experience and accessibility.