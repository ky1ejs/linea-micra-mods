# Linea Micra Mods

A static website showcasing modifications for the La Marzocco Linea Micra espresso machine. Built with Astro and Tailwind CSS.

## Features

- **Interactive Mod Browser**: Filterable table showing all available modifications
- **Detailed Mod Pages**: Individual pages for each modification with full descriptions
- **Type Filtering**: Filter mods by type (shot-timer, brew-by-weight, flow-control, scale-drip-tray)
- **Responsive Design**: Clean, modern design that works on all devices
- **Fast Performance**: Static site generation for optimal loading speeds

## Development

### Setup

```bash
pnpm install
```

### Development Server

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Data Processing

The site automatically processes markdown files from your Obsidian vault. To refresh the mod data:

```bash
node scripts/parse-mods.js
```

## Project Structure

- `src/pages/index.astro` - Homepage with mod table and filtering
- `src/pages/mods/[slug].astro` - Dynamic mod detail pages
- `src/content/mods/` - Processed mod data as JSON files
- `scripts/parse-mods.js` - Script to parse Obsidian markdown files

## Mod Types

- **Shot Timers**: Precision timing systems for consistent espresso extraction
- **Brew-by-Weight**: Scale integration for automatic shot stopping by weight
- **Flow Control**: Manual water flow control for advanced brewing techniques
- **Scale Drip Trays**: Custom trays to accommodate precision scales

## Contributing

To add new mods, add markdown files to your Obsidian vault with proper frontmatter:

```yaml
---
creator: Mod Creator Name
type:
  - shot-timer
  - brew-by-weight
url: https://example.com/mod-link
---
```

Then run the parsing script to update the website data.

## Statistics

Currently showcasing **17 modifications** across **4 categories**:
- 9 Shot Timer mods
- 5 Brew-by-Weight mods  
- 4 Scale Drip Tray mods
- 1 Flow Control mod