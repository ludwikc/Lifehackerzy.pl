# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lifehackerzy.pl is a static website for a Polish productivity community. The site is built with HTML, CSS, and JavaScript without any build tools or package managers. It's designed as a landing page for a community focused on productivity hacking and life improvement.

## Architecture

### Static Website with PHP Modular Structure
- **Main entry point**: `index.php` - Uses PHP includes for modular architecture
- **Alternative versions**: `index-html.html` (static version), `meskikompas.html` (specific landing)
- **Modular components**: Organized in `partials/`, `sections/`, and `components/` directories
- **Assets directory**: Contains all CSS, JS, fonts, and images
- **AI directory**: Contains AI-related pages and tools
- **Old versions**: Previous iterations stored in `old-versions/`

### Key Components
- **Frontend**: Pure HTML5, CSS3, and vanilla JavaScript
- **Server-side**: PHP includes for better maintainability and SEO
- **Styling**: Bootstrap 5 + extensive custom CSS (15+ stylesheets)
- **JavaScript Libraries**: jQuery, GSAP, Swiper, Magnific Popup, and 25+ JS files
- **Analytics**: Facebook Pixel (ID: 2656464611304919) and Plausible Analytics
- **Hosting**: Static hosting with Apache .htaccess configuration

## Development Workflow

### No Build Process
This project does not use any build tools, package managers, or compilation steps. All files are directly edited and served as-is.

### Common Commands
Since this is a static site, there are no npm scripts or build commands. Development involves:
- Direct file editing
- Local PHP-enabled server for testing (required for includes)
- Direct deployment to hosting

### Testing
- Manual browser testing across devices
- PHP syntax validation for includes
- .htaccess rule testing

### Modular PHP Structure
The main `index.php` uses PHP includes for better maintainability:
```
partials/head.html              # Meta tags, stylesheets, analytics
partials/header.html            # Site header and navigation  
partials/footer.html            # Site footer
partials/scripts.html           # JavaScript includes
partials/after-body-open.html   # Body opening scripts/tracking

sections/hero-banner.html       # Landing banner
sections/features-carousel.html # Feature showcases
sections/testimonials.html      # User testimonials
sections/pricing.html           # Pricing tables
sections/workshops.html         # Workshop information
[...12 other sections]
```

### File Structure
```
/
├── index.php                   # Main PHP-based entry point
├── partials/                   # Reusable page components (4 files)
├── sections/                   # Main content sections (17 files)  
├── components/                 # Smaller reusable components (empty)
├── assets/
│   ├── css/                   # Bootstrap + 15+ custom CSS files
│   ├── js/                    # 25+ JavaScript files including libraries
│   ├── images/                # Images organized by content type
│   └── fonts/                 # Font files
├── ai/                        # AI-related pages
├── old-versions/              # Previous site versions
└── .htaccess                  # Apache configuration
```

## Key Technical Details

### CSS Framework
- Bootstrap 5 for responsive grid and components
- Custom CSS organized by component/section
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

### Static Hosting with PHP Support
- No build process required
- Direct file upload to web server
- Apache server with PHP and .htaccess support required
- PHP includes improve performance over client-side assembly

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

## Development Best Practices

### Code Organization
- Use the modular PHP structure with includes
- Keep sections and partials focused on single responsibilities
- Place reusable components in appropriate directories
- Maintain consistent naming conventions

### Performance
- Leverage PHP server-side rendering for better performance than JavaScript assembly
- Optimize images and assets before adding to the project
- Minimize HTTP requests through strategic asset organization

### Maintenance
- Always test changes with a PHP-enabled local server
- Validate .htaccess changes carefully
- Ensure new content follows the existing Polish language standards
- Maintain consistency with established design patterns

## Important Instruction Reminders
- Do what has been asked; nothing more, nothing less
- NEVER create files unless absolutely necessary for achieving the goal  
- ALWAYS prefer editing an existing file to creating a new one
- NEVER proactively create documentation files (*.md) or README files unless explicitly requested

## Remember Shortcuts

Remember the following shortcuts which the user may invoke at any time.

### QNEW

When I type "qnew", this means:

```
Understand all BEST PRACTICES listed in CLAUDE.md.
Your code SHOULD ALWAYS follow these best practices.
```

### QPLAN
When I type "qplan", this means:
```
Analyze similar parts of the codebase and determine whether your plan:
- is consistent with rest of codebase
- introduces minimal changes
- reuses existing code
```

## QCODE

When I type "qcode", this means:

```
Implement your plan and make sure your new tests pass.
Always run tests to make sure you didn't break anything else.
Always run `prettier` on the newly created files to ensure standard formatting.
Always run `turbo typecheck lint` to make sure type checking and linting passes.
```

### QCHECK

When I type "qcheck", this means:

```
You are a SKEPTICAL senior software engineer.
Perform this analysis for every MAJOR code change you introduced (skip minor changes):

1. CLAUDE.md checklist Writing Functions Best Practices.
2. CLAUDE.md checklist Writing Tests Best Practices.
3. CLAUDE.md checklist Implementation Best Practices.
```

### QCHECKF

When I type "qcheckf", this means:

```
You are a SKEPTICAL senior software engineer.
Perform this analysis for every MAJOR function you added or edited (skip minor changes):

1. CLAUDE.md checklist Writing Functions Best Practices.
```

### QCHECKT

When I type "qcheckt", this means:

```
You are a SKEPTICAL senior software engineer.
Perform this analysis for every MAJOR test you added or edited (skip minor changes):

1. CLAUDE.md checklist Writing Tests Best Practices.
```

### QUX

When I type "qux", this means:

```
Imagine you are a human UX tester of the feature you implemented. 
Output a comprehensive list of scenarios you would test, sorted by highest priority.
```

### QGIT

When I type "qgit", this means:

```
Add all changes to staging, create a commit, and push to remote.

Follow this checklist for writing your commit message:
- SHOULD use Conventional Commits format: https://www.conventionalcommits.org/en/v1.0.0
- SHOULD NOT refer to Claude or Anthropic in the commit message.
- SHOULD structure commit message as follows:
<type>[optional scope]: <description>
[optional body]
[optional footer(s)]
- commit SHOULD contain the following structural elements to communicate intent: 
fix: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
feat: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).
BREAKING CHANGE: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
types other than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the Angular convention) recommends build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.
footers other than BREAKING CHANGE: <description> may be provided and follow a convention similar to git trailer format.
```