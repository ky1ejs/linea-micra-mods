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
Run this after adding/updating markdown files in the Obsidian vault.

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

## Common Tasks

1. **Adding new mods**: Add markdown file to Obsidian vault, then run parsing script
2. **Updating existing mods**: Edit markdown in Obsidian, then run parsing script
3. **Styling changes**: Edit Tailwind classes in `.astro` files and `src/styles/global.css`
4. **Content schema changes**: Update `src/content/config.ts` and parsing script

## Deployment Considerations

- Site builds to static HTML (18 pages total)
- All mod images currently show as placeholder text
- External links open in new tabs with proper rel attributes
- SEO optimized with proper meta tags and semantic HTML