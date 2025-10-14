# Xue Aaron's Portfolio

A modern, multilingual portfolio website built with Next.js, featuring dark/light theme toggle and smooth animations.

## 🌟 Features

- **Multilingual Support**: English, Traditional Chinese (繁中), and Japanese
- **Theme Toggle**: Dark/Light mode with system preference detection
- **Responsive Design**: Mobile-first, fully responsive layout
- **Smooth Animations**: Powered by Framer Motion
- **Sticky Header**: Hero section transforms into a sticky navigation bar
- **Project Showcase**: Timeline-based project display with detailed information
- **Tech Stack Marquee**: Animated infinite scroll of technologies
- **GitHub Pages Ready**: Configured for static export and GitHub Pages deployment

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Internationalization**: next-intl
- **Theme**: next-themes
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🌐 Development

The development server will run at `http://localhost:3000/en` (default locale).

Available locales:

- `/en` - English
- `/tw` - Traditional Chinese
- `/ja` - Japanese

## 🎨 Project Structure

```
src/
├── app/
│   ├── [locale]/          # Locale-specific pages
│   │   ├── layout.tsx     # Layout with i18n support
│   │   └── page.tsx       # Main page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Root redirect
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── About.tsx         # About section
│   ├── Experience.tsx    # Work experience timeline
│   ├── Footer.tsx        # Footer with contact info
│   ├── Header.tsx        # Sticky header navigation
│   ├── Hero.tsx          # Hero section
│   ├── LanguageSwitcher.tsx  # Language selector
│   ├── Projects.tsx      # Projects showcase
│   ├── TechStack.tsx     # Tech stack marquee
│   ├── ThemeProvider.tsx # Theme context provider
│   └── ThemeToggle.tsx   # Dark/light mode toggle
├── data/
│   └── portfolio.json    # Portfolio data
├── i18n/
│   ├── request.ts        # i18n request config
│   └── routing.ts        # i18n routing config
├── types/
│   └── portfolio.ts      # TypeScript types
└── middleware.ts         # Next.js middleware for i18n

messages/                 # Translation files
├── en.json              # English translations
├── tw.json              # Traditional Chinese translations
└── ja.json              # Japanese translations
```

## 🚀 Deployment

### GitHub Pages

1. **Enable GitHub Pages**:

   - Go to your repository Settings
   - Navigate to Pages
   - Source: GitHub Actions

2. **Push to main branch**:

   ```bash
   git add .
   git commit -m "feat: initial portfolio deployment"
   git push origin main
   ```

3. **GitHub Actions will automatically**:
   - Build the site
   - Deploy to GitHub Pages
   - Your site will be available at: `https://[username].github.io/attitude-portfolio/`

### Manual Deployment

```bash
# Build and export static site
pnpm build

# The static site will be in the 'out' directory
# Deploy the 'out' directory to any static hosting service
```

## 📝 Customization

### Update Portfolio Data

Edit `src/data/portfolio.json` to update:

- Personal information
- Projects
- Work experience
- Tech stack
- Education

### Update Translations

Edit translation files in `messages/`:

- `en.json` - English
- `tw.json` - Traditional Chinese
- `ja.json` - Japanese

### Styling

- Global styles: `src/app/globals.css`
- Tailwind config is inline in the CSS file
- Component-level styling uses Tailwind utility classes

## 🔧 Environment Variables

For GitHub Pages deployment with a custom base path:

```env
NEXT_PUBLIC_BASE_PATH=/your-repo-name
```

This is automatically set in the GitHub Actions workflow.

## 📱 Sections

1. **Hero Section**: Introduction with name, title, and call-to-action
2. **About Section**: Biography, process, education, and languages
3. **Projects Section**: Detailed project showcase with timeline sorting
4. **Experience Section**: Work history with timeline visualization
5. **Tech Stack**: Animated marquee of technologies
6. **Footer/Contact**: Contact information and social links

## 🎯 Key Features

- **Smooth Scrolling**: Anchor links with smooth scroll behavior
- **Lazy Loading**: Optimized performance with lazy-loaded sections
- **Animations**: Entrance animations using Framer Motion
- **Accessibility**: Semantic HTML and ARIA labels
- **SEO Ready**: Meta tags and structured data
- **Performance**: Static export for fast loading

## 📄 License

This project is personal portfolio website. Feel free to use it as inspiration for your own portfolio!

## 👤 Author

**Xue Aaron (Casual Attitude)**

- Email: casualattitude0@gmail.com
- GitHub: [@casualattitude0](https://github.com/casualattitude0)
- LinkedIn: [Aaron Xue](https://www.linkedin.com/in/aaron-xue-1b865322a/)

---

Built with ❤️ using Next.js & TypeScript
