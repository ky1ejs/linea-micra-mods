import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const OBSIDIAN_MODS_DIR = '/Users/kylejs/Documents/Obsidian/kylejs/1. Atlas/Coffee/Linea Micra Mods';
const OUTPUT_DIR = './src/content/mods';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Function to create a URL-friendly slug from filename
function createSlug(filename) {
  return filename
    .replace(/\.md$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Function to process Obsidian wikilinks
function processWikilinks(content) {
  // Convert [[link]] to just link text for now
  // In a full implementation, you might want to resolve these to actual links
  return content.replace(/\[\[([^\]]+)\]\]/g, '$1');
}

// Function to process image references
function processImages(content) {
  // Convert ![[image.jpg]] to markdown image syntax
  // In a full implementation, you'd copy images to public folder
  return content.replace(/!\[\[([^\]]+)\]\]/g, '![Image: $1]');
}

// Read all markdown files
const files = fs.readdirSync(OBSIDIAN_MODS_DIR)
  .filter(file => file.endsWith('.md'));

console.log(`Found ${files.length} mod files to process...`);

const mods = [];

files.forEach(filename => {
  const filepath = path.join(OBSIDIAN_MODS_DIR, filename);
  const content = fs.readFileSync(filepath, 'utf8');
  
  // Parse frontmatter and content
  const { data: frontmatter, content: markdownContent } = matter(content);
  
  // Process the content
  let processedContent = processWikilinks(markdownContent);
  processedContent = processImages(processedContent);
  
  // Create mod object
  const mod = {
    slug: createSlug(filename),
    title: filename.replace(/\.md$/, ''),
    creator: frontmatter.creator || 'Unknown',
    type: Array.isArray(frontmatter.type) ? frontmatter.type : [frontmatter.type].filter(Boolean),
    url: frontmatter.url || '',
    content: processedContent.trim(),
    filename
  };
  
  mods.push(mod);
  
  // Write individual JSON file for each mod
  const outputPath = path.join(OUTPUT_DIR, `${mod.slug}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(mod, null, 2));
  
  console.log(`Processed: ${filename} -> ${mod.slug}.json`);
});

// Write master index file
const indexPath = path.join(OUTPUT_DIR, 'index.json');
fs.writeFileSync(indexPath, JSON.stringify(mods, null, 2));

console.log(`\nProcessed ${mods.length} mods successfully!`);
console.log('Files written to:', OUTPUT_DIR);

// Print summary
const typeCounts = {};
mods.forEach(mod => {
  mod.type.forEach(type => {
    typeCounts[type] = (typeCounts[type] || 0) + 1;
  });
});

console.log('\nMod types found:');
Object.entries(typeCounts).forEach(([type, count]) => {
  console.log(`  ${type}: ${count}`);
});