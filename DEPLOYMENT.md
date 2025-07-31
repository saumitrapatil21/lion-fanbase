# Deployment Guide

This guide covers various deployment options for the Team Lion website.

## 🚀 Deployment Options

### 1. Netlify (Recommended)

Netlify offers excellent support for React applications with automatic deployments.

#### Steps:
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Option A: Drag and drop the `build` folder to [Netlify Drop](https://app.netlify.com/drop)
   - Option B: Connect your Git repository for automatic deployments

3. **Configure redirects** (for React Router)
   Create `public/_redirects` file:
   ```
   /*    /index.html   200
   ```

#### Custom Domain:
- Add your domain in Netlify dashboard
- Update DNS settings to point to Netlify

### 2. Vercel

Vercel provides seamless React deployment with zero configuration.

#### Steps:
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow prompts** to configure your deployment

### 3. GitHub Pages

Deploy directly from your GitHub repository.

#### Steps:
1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/team-lion",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### 4. Firebase Hosting

Google's Firebase offers fast global CDN hosting.

#### Steps:
1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

3. **Configure firebase.json**
   ```json
   {
     "hosting": {
       "public": "build",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Build and deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### 5. AWS S3 + CloudFront

For enterprise-level hosting with AWS.

#### Steps:
1. **Create S3 bucket**
   - Enable static website hosting
   - Upload build files

2. **Configure CloudFront**
   - Create distribution
   - Set S3 as origin
   - Configure error pages for SPA

3. **Update DNS**
   - Point domain to CloudFront distribution

## 🔧 Environment Configuration

### Environment Variables

Create `.env` files for different environments:

#### `.env.production`
```
REACT_APP_API_URL=https://api.teamlion.com
REACT_APP_ANALYTICS_ID=your-analytics-id
REACT_APP_ENVIRONMENT=production
```

#### `.env.development`
```
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ANALYTICS_ID=
REACT_APP_ENVIRONMENT=development
```

### Build Optimization

#### Production Build Settings
```bash
# Build with source maps (for debugging)
GENERATE_SOURCEMAP=true npm run build

# Build without source maps (smaller bundle)
GENERATE_SOURCEMAP=false npm run build
```

## 📊 Performance Monitoring

### Google Analytics Setup

1. **Add tracking code** to `public/index.html`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_TRACKING_ID');
   </script>
   ```

### Lighthouse Optimization

Run Lighthouse audits to ensure optimal performance:
```bash
npm install -g lighthouse
lighthouse https://your-domain.com --view
```

## 🔒 Security Considerations

### Content Security Policy

Add CSP headers for security:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               img-src 'self' https://images.unsplash.com; 
               font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;">
```

### HTTPS Configuration

Ensure all deployments use HTTPS:
- Netlify: Automatic HTTPS
- Vercel: Automatic HTTPS
- Custom servers: Configure SSL certificates

## 🚨 Troubleshooting

### Common Issues

1. **Blank page after deployment**
   - Check browser console for errors
   - Verify build completed successfully
   - Ensure routing is configured for SPA

2. **Images not loading**
   - Verify image paths are correct
   - Check CORS settings for external images
   - Ensure images are in public folder

3. **Fonts not loading**
   - Check Google Fonts URLs
   - Verify CSP allows font sources
   - Test font fallbacks

### Debug Commands

```bash
# Check build output
npm run build && serve -s build

# Analyze bundle size
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js
```

## 📈 Monitoring & Analytics

### Performance Metrics
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)

### Monitoring Tools
- Google Analytics
- Google Search Console
- Lighthouse CI
- Web Vitals

---

**Need help?** Check the main README.md or open an issue in the repository.
