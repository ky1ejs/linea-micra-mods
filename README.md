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

We welcome contributions from the community! There are several ways you can help improve the Linea Micra Mods collection:

### Adding a New Modification

1. **Fork this repository** on GitHub
2. **Create a new markdown file** for your mod in the appropriate location
3. **Add proper frontmatter** with mod details
4. **Include images** if available  
5. **Submit a pull request** with your changes

#### Mod File Format

Create a markdown file with the following frontmatter structure:

```yaml
---
creator: "Your Name or [[username]]"  # Can include Obsidian wikilinks
type:
  - shot-timer           # Options: shot-timer, brew-by-weight, 
  - brew-by-weight       # flow-control, scale-drip-tray
url: "https://example.com/mod-link"    # Link to original source/discussion
---

# Mod Title

Your detailed description of the modification goes here.

## Features
- List key features
- Include installation notes
- Add usage instructions

## Images
Include images using: ![Description](image-filename.jpg)
```

#### File Placement

- **For repository contributors**: Add markdown files directly to `src/content/mods/` as JSON files (following existing format)
- **For Obsidian vault**: Files should be placed in `/Users/kylejs/Documents/Obsidian/kylejs/1. Atlas/Coffee/Linea Micra Mods/` (maintainer will process)

#### Images

- Place images in a publicly accessible location or include them in your PR
- Images will be optimized and converted to WebP format automatically
- Use descriptive filenames (e.g., `timer-display-screenshot.jpg`)

### Editing Existing Modifications  

1. **Report issues** via GitHub Issues for factual corrections
2. **Submit pull requests** for content improvements
3. **Update mod information** if you have additional details or better images

### Development Contributions

- **Bug fixes** for the website functionality
- **Feature improvements** for better user experience  
- **Performance optimizations** 
- **Accessibility enhancements**

### Contribution Guidelines

- **Be respectful** - This is a community resource
- **Verify information** - Ensure mod details are accurate
- **Credit properly** - Always attribute original creators
- **Test locally** - Run `pnpm dev` to test changes before submitting
- **Follow existing patterns** - Match the style and format of existing content

### Getting Help

- **Questions about contributing**: Open a GitHub Issue
- **Technical problems**: Check existing Issues or create a new one
- **Mod compatibility**: Include compatibility notes in your submission

### Review Process

1. Submit your pull request with a clear description
2. Maintainers will review for accuracy and formatting
3. Address any requested changes
4. Once approved, your contribution will be merged and deployed

Thank you for helping make this resource better for the entire Linea Micra community!

## Statistics

Currently showcasing **17 modifications** across **4 categories**:
- 9 Shot Timer mods
- 5 Brew-by-Weight mods  
- 4 Scale Drip Tray mods
- 1 Flow Control mod