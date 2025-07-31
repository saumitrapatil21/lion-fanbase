# Getting Started with Team Lion Website

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
- Modern web browser

### Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open in Browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the development server
- `npm run build` - Creates production build
- `npm test` - Runs test suite
- `npm run eject` - Ejects from Create React App (irreversible)

## 🎨 Project Overview

### What's Included

✅ **Complete React Application**
- Modern React 18 with functional components and hooks
- React Router for navigation
- Responsive design with CSS Grid and Flexbox

✅ **Professional Design System**
- Lion-inspired color palette (golds, browns, earth tones)
- Typography hierarchy with Google Fonts
- Consistent spacing and layout system

✅ **Interactive Components**
- Responsive navigation with mobile hamburger menu
- Animated hero section with scroll indicators
- Content preview cards with hover effects
- Fun facts section with intersection observer animations
- Featured image gallery

✅ **Accessibility Features**
- Semantic HTML5 structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Alt text for images

✅ **SEO Optimization**
- Meta tags for social sharing
- Structured data
- Performance optimized
- Mobile-friendly

### File Structure

```
team-lion/
├── public/
│   ├── index.html          # Main HTML template
│   ├── manifest.json       # PWA manifest
│   └── favicon.ico         # Site favicon
├── src/
│   ├── components/         # React components
│   │   ├── Header.js       # Navigation header
│   │   ├── Hero.js         # Hero section
│   │   ├── ContentPreview.js # Content cards
│   │   ├── FunFacts.js     # Facts section
│   │   └── Footer.js       # Site footer
│   ├── styles/
│   │   └── App.css         # Main stylesheet
│   ├── App.js              # Main App component
│   └── index.js            # React entry point
├── package.json            # Dependencies and scripts
├── README.md              # Project documentation
├── DEPLOYMENT.md          # Deployment guide
└── GETTING_STARTED.md     # This file
```

## 🎯 Key Features

### 1. Hero Section
- Full-screen hero with stunning lion imagery
- Animated text and call-to-action buttons
- Smooth scroll indicator

### 2. Navigation
- Fixed header with scroll effects
- Mobile-responsive hamburger menu
- Active page indicators

### 3. Content Preview
- Grid layout of content sections
- Hover effects and animations
- Color-coded categories

### 4. Fun Facts
- Intersection observer animations
- Engaging lion facts
- Featured image gallery

### 5. Footer
- Comprehensive site links
- Social media integration
- Conservation messaging

## 🎨 Customization Guide

### Changing Colors
Update CSS custom properties in `src/styles/App.css`:
```css
:root {
  --primary-gold: #D2691E;
  --secondary-brown: #8B4513;
  --accent-tan: #DEB887;
  /* ... other colors */
}
```

### Adding New Pages
1. Create component in `src/components/`
2. Add route in `src/App.js`
3. Update navigation in `src/components/Header.js`

### Customizing Content
- Edit text content in component files
- Replace images with your own
- Update fun facts in `FunFacts.js`

### Styling Changes
- Component styles in `src/styles/App.css`
- Responsive breakpoints already defined
- CSS Grid and Flexbox layouts

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: 320px - 479px

### Features
- Mobile-first approach
- Touch-friendly navigation
- Optimized images
- Flexible layouts

## 🔧 Development Tips

### Hot Reloading
The development server supports hot reloading - changes will appear instantly.

### Browser DevTools
Use React Developer Tools extension for debugging.

### Performance
- Images are lazy-loaded
- CSS animations are optimized
- Bundle size is minimized

## 🚀 Next Steps

1. **Customize Content**: Replace placeholder content with your own
2. **Add Images**: Place high-quality lion images in `public/` folder
3. **Test Responsiveness**: Check on different devices
4. **Deploy**: Follow `DEPLOYMENT.md` for hosting options

## 🐛 Troubleshooting

### Common Issues

**Blank page after start:**
- Check browser console for errors
- Ensure all dependencies installed
- Verify Node.js version

**Images not loading:**
- Check image paths
- Ensure images are in `public/` folder
- Verify file extensions

**Styles not applying:**
- Check CSS syntax
- Verify import statements
- Clear browser cache

### Getting Help

1. Check browser console for errors
2. Review component code
3. Verify file paths and imports
4. Test in different browsers

## 📞 Support

For questions or issues:
1. Check the README.md
2. Review component documentation
3. Open an issue in the repository

---

**Happy coding! 🦁**
