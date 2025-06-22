# Linea Micra Mods - Claude Context

## Project Overview

This is a static website showcasing modifications for the La Marzocco Linea Micra espresso machine. Built with Astro and Tailwind CSS, it automatically processes markdown files from an Obsidian vault and presents them in a clean, filterable web interface.

## Key Information

### Data Source
- **Source Directory**: `/Users/kylejs/Documents/Obsidian/kylejs/1. Atlas/Coffee/Linea Micra Mods`
- **Format**: Markdown files with YAML frontmatter
- **Current Count**: 17 modification files

### Frontmatter Schema
```yaml
---
creator: "Creator Name" (can include Obsidian wikilinks like "[[username]]")
type:
  - shot-timer
  - brew-by-weight
  - flow-control
  - scale-drip-tray
url: "https://example.com/mod-link"
---
```

### Project Structure
- `scripts/parse-mods.js` - Processes Obsidian markdown files into JSON
- `src/content/mods/` - Generated JSON files for each mod
- `src/content/config.ts` - Astro content collection schema
- `src/pages/index.astro` - Homepage with filterable table
- `src/pages/mods/[slug].astro` - Dynamic mod detail pages

## Key Commands

### Data Processing
```bash
node scripts/parse-mods.js
```
Run this after adding/updating markdown files in the Obsidian vault. This will:
- Parse markdown files and extract frontmatter
- Process Obsidian wikilinks and image references
- Copy and optimize images from attachments folder
- Generate JSON files for Astro content collections

### Development
```bash
pnpm dev      # Start development server
pnpm build    # Build for production
```

## Mod Categories

1. **Shot Timers** (9 mods) - Precision timing systems for consistent espresso extraction
2. **Brew-by-Weight** (5 mods) - Scale integration for automatic shot stopping by weight
3. **Scale Drip Trays** (4 mods) - Custom trays to accommodate precision scales
4. **Flow Control** (1 mod) - Manual water flow control for advanced brewing techniques

## Technical Notes

- Uses Astro content collections for type-safe data handling
- Processes Obsidian `[[wikilinks]]` and `![[images]]` syntax
- JavaScript filtering without external frameworks
- Responsive Tailwind design with amber/orange color scheme
- Static site generation for optimal performance
- Vercel Analytics integration for usage tracking and performance monitoring

## Image Processing

- **Source**: Images referenced via `![[filename.ext]]` in Obsidian markdown
- **Location**: Images stored in `/Users/kylejs/Documents/Obsidian/kylejs/Extras/Attachments`
- **Optimization**: Automatically converted to WebP format, resized to max 800px
- **Output**: Optimized images saved to `public/images/mods/` with web-safe filenames
- **Display**: Images shown with modal popup, hover effects, and responsive design
- **Format**: `{mod-slug}-{safe-filename}.webp` (e.g., `ace-dotshot-screenshot-2025-06-22.webp`)

## Common Tasks

1. **Adding new mods**: Add markdown file to Obsidian vault, then run parsing script
2. **Updating existing mods**: Edit markdown in Obsidian, then run parsing script
3. **Adding images**: Place images in Obsidian attachments folder, reference with `![[filename.ext]]`
4. **Styling changes**: Edit Tailwind classes in `.astro` files and `src/styles/global.css`
5. **Content schema changes**: Update `src/content/config.ts` and parsing script

## Git LFS Configuration

This repository uses Git LFS to efficiently manage binary assets:

- **Images**: webp, jpg, jpeg, png, gif, bmp, tiff, svg
- **Videos**: mp4, mov, avi, webm  
- **Audio**: mp3, wav, flac
- **Documents**: pdf
- **Archives**: zip, tar.gz
- **3D Models**: stl, obj, 3mf

All 16 image files (15 mod images + favicon) are stored in LFS for optimal repository performance.

## Deployment Considerations

- Site builds to static HTML (18 pages total)
- 15 optimized images included in build via Git LFS
- External links open in new tabs with proper rel attributes
- SEO optimized with proper meta tags and semantic HTML
- Images have lazy loading and modal interactions
- Git LFS required for cloning/deploying to access images