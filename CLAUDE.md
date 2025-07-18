# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lifehackerzy.pl is a static website for a Polish productivity community. The site is built with HTML, CSS, and JavaScript without any build tools or package managers. It's designed as a landing page for a community focused on productivity hacking and life improvement.

## Architecture

### Static Website Structure
- **Main file**: `index.html` - The primary landing page
- **Assets directory**: Contains all CSS, JS, fonts, and images
- **AI directory**: Contains AI-related pages and tools
- **Old versions**: Previous iterations of the site stored in `old-versions/`

### Key Components
- **Frontend**: Pure HTML5, CSS3, and vanilla JavaScript
- **Styling**: Bootstrap-based responsive design with custom CSS
- **JavaScript Libraries**: jQuery, GSAP, Swiper, and various UI enhancement libraries
- **Analytics**: Facebook Pixel and Plausible Analytics integration
- **Hosting**: Static hosting with Apache .htaccess configuration

## Development Workflow

### No Build Process
This project does not use any build tools, package managers, or compilation steps. All files are directly edited and served as-is.

### Common Commands
Since this is a static site, there are no npm scripts or build commands. Development involves:
- Direct file editing
- Local server for testing (PHP-enabled server recommended)
- Direct deployment to hosting

### Refactored Structure
A modular version is available in `index-refactored.php` that uses PHP includes for better maintainability:
- Server-side rendering for better performance
- Improved SEO compared to JavaScript-based includes
- More reliable than client-side assembly

### File Structure
```
/
├── index.html              # Main landing page
├── assets/
│   ├── css/               # Stylesheets (Bootstrap + custom)
│   ├── js/                # JavaScript libraries and custom scripts
│   ├── images/            # All images and graphics
│   └── fonts/             # Font files
├── ai/                    # AI-related pages
├── old-versions/          # Previous site versions
└── .htaccess             # Apache configuration
```

## Key Technical Details

### CSS Framework
- Bootstrap 5 for responsive grid and components
- Custom CSS in `assets/css/style.css`
- Font Awesome for icons
- GSAP for animations

### JavaScript Libraries
- jQuery for DOM manipulation
- GSAP for advanced animations
- Swiper for sliders/carousels
- Magnific Popup for modals
- Various UI enhancement libraries

### Forms and Integrations
- Email collection integrated with EasyCart platform
- Custom JavaScript in `lifehackerzy-email-to-easycart.js` handles form submissions
- Facebook Pixel tracking for analytics
- Plausible Analytics for privacy-friendly tracking

### Apache Configuration
- HTTPS redirect enforcement
- Domain canonicalization to `lifehackerzy.pl`
- Custom redirect rules for webinar links

## Content Management

### Rebranding Note
The site has been rebranded from "Hackerzy" to "Lifehackerzy" - ensure all references use the new branding.

### Image Assets
- Main logo: `assets/images/LIFEHACKERZY.svg`
- Mobile logo: `assets/images/mobile-logo.svg`
- Favicon: `assets/images/favicon.png`
- Product mockups and graphics in `assets/images/lifehackerzy/`

### Internationalization
- Primary language: Polish (`lang="pl"`)
- Meta tags and OpenGraph configured for Polish content
- All user-facing content in Polish

## Deployment

### Static Hosting
- No build process required
- Direct file upload to web server
- Apache server with .htaccess support required for redirects

### Domain Configuration
- Primary domain: `lifehackerzy.pl`
- HTTPS enforced via .htaccess
- All www and non-HTTPS traffic redirected to canonical URL

## Analytics and Tracking

### Facebook Pixel
- Tracking ID: `2656464611304919`
- PageView events tracked
- Configured for conversion tracking

### Plausible Analytics
- Privacy-friendly analytics
- Domain: `lifehackerzy.pl`
- Script loaded from `plausible.io`