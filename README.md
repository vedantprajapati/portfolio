# Portfolio Website for GitHub Pages

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Perfect for showcasing your work and skills on GitHub Pages.

## Features

- 🎨 Modern and clean design
- 📱 Fully responsive (mobile-first approach)
- ⚡ Fast loading with optimized assets
- 🎯 Smooth scrolling navigation
- 🌟 Interactive animations and hover effects
- 📊 Skills and projects showcase
- 📞 Contact section with social links
- 🔍 SEO optimized

## Sections

1. **Hero Section** - Eye-catching introduction with call-to-action buttons
2. **About** - Personal information and statistics
3. **Projects** - Featured work with technology tags
4. **Skills** - Organized by categories (Frontend, Backend, Tools)
5. **Contact** - Contact information and social media links

## Setup Instructions

### 1. Customize the Content

Before deploying, update the following in `index.html`:

- **Personal Information**: Replace "Your Name" with your actual name
- **Contact Details**: Update email, phone, and location
- **Social Links**: Add your actual social media URLs
- **Projects**: Replace with your real projects and links
- **Skills**: Update with your actual skills and technologies
- **About Section**: Write your personal story and experience

### 2. Deploy to GitHub Pages

1. **Create a new repository** on GitHub
2. **Upload these files** to your repository:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll down to "GitHub Pages" section
   - Select "main" branch as source
   - Save the settings

4. **Your site will be available at**: `https://yourusername.github.io/repository-name`

### 3. Custom Domain (Optional)

If you have a custom domain:
1. Add a `CNAME` file to your repository with your domain name
2. Configure your domain's DNS settings
3. Update the domain in GitHub Pages settings

## File Structure

```
portfolio-github-pages/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Customization Guide

### Colors
The main color scheme uses:
- Primary Blue: `#2563eb`
- Accent Yellow: `#fbbf24`
- Dark Gray: `#1f2937`
- Light Gray: `#f8fafc`

### Fonts
- Primary: Inter (Google Fonts)
- Icons: Font Awesome 6.0

### Adding Projects
To add a new project, copy this structure in the projects section:

```html
<div class="project-card">
    <div class="project-image">
        <i class="fas fa-[icon-name]"></i>
    </div>
    <div class="project-content">
        <h3>Project Name</h3>
        <p>Project description...</p>
        <div class="project-tech">
            <span class="tech-tag">Technology</span>
        </div>
        <div class="project-links">
            <a href="#" class="project-link"><i class="fab fa-github"></i> Code</a>
            <a href="#" class="project-link"><i class="fas fa-external-link-alt"></i> Live</a>
        </div>
    </div>
</div>
```

### Adding Skills
To add skills, update the skill items in the respective categories:

```html
<span class="skill-item">Your Skill</span>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized images and assets
- Minimal JavaScript for fast loading
- CSS animations for smooth interactions
- Responsive design for all devices

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to fork this project and customize it for your own portfolio!

---

**Note**: Remember to replace all placeholder content with your actual information before deploying to GitHub Pages. 