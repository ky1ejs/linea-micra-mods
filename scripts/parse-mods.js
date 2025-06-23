import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import sharp from 'sharp';

const OBSIDIAN_MODS_DIR =
  '/Users/kylejs/Documents/Obsidian/kylejs/1. Atlas/Coffee/Linea Micra Mods';
const OBSIDIAN_PEOPLE_DIR =
  '/Users/kylejs/Documents/Obsidian/kylejs/1. Atlas/People';
const OBSIDIAN_ATTACHMENTS_DIR =
  '/Users/kylejs/Documents/Obsidian/kylejs/Extras/Attachments';
const OUTPUT_DIR = './src/content/mods';
const IMAGES_OUTPUT_DIR = './public/images/mods';

// Ensure output directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(IMAGES_OUTPUT_DIR)) {
  fs.mkdirSync(IMAGES_OUTPUT_DIR, { recursive: true });
}

// Function to create a URL-friendly slug from filename
function createSlug(filename) {
  return filename
    .replace(/\.md$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Function to process creator wikilinks and extract URLs
function processCreator(creatorText) {
  // Check if creator contains wikilink syntax
  const wikilinkMatch = creatorText.match(/\[\[([^\]]+)\]\]/);

  if (wikilinkMatch) {
    const creatorName = wikilinkMatch[1];
    const creatorFile = path.join(OBSIDIAN_PEOPLE_DIR, `${creatorName}.md`);

    if (fs.existsSync(creatorFile)) {
      try {
        const creatorContent = fs.readFileSync(creatorFile, 'utf8');
        const { data: creatorData } = matter(creatorContent);

        // Extract website URL - handle both 'website' (singular) and 'websites' (array)
        let url = null;
        if (creatorData.website) {
          url = creatorData.website;
        } else if (creatorData.websites && creatorData.websites.length > 0) {
          url = creatorData.websites[0];
        }

        return {
          name: creatorName,
          url: url,
        };
      } catch (error) {
        console.log(
          `  ⚠️  Error reading creator file for ${creatorName}:`,
          error.message
        );
        return {
          name: creatorName,
          url: null,
        };
      }
    } else {
      console.log(`  ⚠️  Creator file not found: ${creatorFile}`);
      return {
        name: creatorName,
        url: null,
      };
    }
  }

  // Return as-is for non-wikilink creators
  return {
    name: creatorText,
    url: null,
  };
}

// Function to process Obsidian wikilinks in content
function processWikilinks(content) {
  // Convert [[link]] to just link text for now
  // In a full implementation, you might want to resolve these to actual links
  return content.replace(/\[\[([^\]]+)\]\]/g, '$1');
}

// Function to optimize and copy image
async function optimizeAndCopyImage(imageName, modSlug) {
  const sourcePath = path.join(OBSIDIAN_ATTACHMENTS_DIR, imageName);

  if (!fs.existsSync(sourcePath)) {
    console.log(`  ⚠️  Image not found: ${imageName}`);
    return null;
  }

  try {
    // Create a web-safe filename
    const ext = path.extname(imageName).toLowerCase();
    const baseName = path.basename(imageName, ext);
    const safeBaseName = baseName.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();
    const webFilename = `${modSlug}-${safeBaseName}.webp`;
    const outputPath = path.join(IMAGES_OUTPUT_DIR, webFilename);

    // Skip if already processed
    if (fs.existsSync(outputPath)) {
      console.log(`  ✓  Image already optimized: ${webFilename}`);
      return `/images/mods/${webFilename}`;
    }

    // Optimize image with Sharp
    await sharp(sourcePath)
      .resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({
        quality: 85,
        effort: 4,
      })
      .toFile(outputPath);

    console.log(`  ✓  Optimized image: ${imageName} -> ${webFilename}`);
    return `/images/mods/${webFilename}`;
  } catch (error) {
    console.log(`  ❌ Error processing image ${imageName}:`, error.message);
    return null;
  }
}

// Function to process image references
async function processImages(content, modSlug) {
  const imageRegex = /!\[\[([^\]]+)\]\]/g;
  const matches = [...content.matchAll(imageRegex)];

  if (matches.length === 0) {
    return content;
  }

  console.log(`  📷 Found ${matches.length} image(s) to process`);

  let processedContent = content;

  for (const match of matches) {
    const fullMatch = match[0];
    const imageName = match[1];

    console.log(`    Processing image: ${imageName}`);
    const webPath = await optimizeAndCopyImage(imageName, modSlug);

    if (webPath) {
      const replacement = `![${imageName}](${webPath})`;
      processedContent = processedContent.replace(fullMatch, replacement);
      console.log(`    ✓ Replaced: ${fullMatch} -> ${replacement}`);
    } else {
      const replacement = `![Image not found: ${imageName}]()`;
      processedContent = processedContent.replace(fullMatch, replacement);
      console.log(`    ❌ Missing: ${imageName}`);
    }
  }

  return processedContent;
}

// Read all markdown files
const files = fs
  .readdirSync(OBSIDIAN_MODS_DIR)
  .filter((file) => file.endsWith('.md'));

console.log(`Found ${files.length} mod files to process...`);

// Main processing function
async function processAllMods() {
  const mods = [];

  for (const filename of files) {
    console.log(`\nProcessing: ${filename}`);
    const filepath = path.join(OBSIDIAN_MODS_DIR, filename);
    const content = fs.readFileSync(filepath, 'utf8');

    // Parse frontmatter and content
    const { data: frontmatter, content: markdownContent } = matter(content);

    // Create slug early for image processing
    const slug = createSlug(filename);

    // Process the content (images first, then wikilinks)
    let processedContent = await processImages(markdownContent, slug);
    processedContent = processWikilinks(processedContent);

    // Process creator information
    const creatorInfo = processCreator(frontmatter.creator || 'Unknown');

    // Create mod object
    const mod = {
      slug,
      title: filename.replace(/\.md$/, ''),
      creator: creatorInfo.name,
      creatorUrl: creatorInfo.url,
      type: Array.isArray(frontmatter.type)
        ? frontmatter.type
        : [frontmatter.type].filter(Boolean),
      url: frontmatter.url || '',
      content: processedContent.trim(),
      filename,
    };

    mods.push(mod);

    // Write individual JSON file for each mod
    const outputPath = path.join(OUTPUT_DIR, `${mod.slug}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(mod, null, 2));

    console.log(`  ✅ Completed: ${filename} -> ${mod.slug}.json`);
  }

  return mods;
}

// Run the processing
console.log(`Found ${files.length} mod files to process...`);
const mods = await processAllMods();

console.log(`\n🎉 Processed ${mods.length} mods successfully!`);
console.log('📁 Mod data written to:', OUTPUT_DIR);
console.log('🖼️  Optimized images written to:', IMAGES_OUTPUT_DIR);

// Print summary
const typeCounts = {};
mods.forEach((mod) => {
  mod.type.forEach((type) => {
    typeCounts[type] = (typeCounts[type] || 0) + 1;
  });
});

console.log('\nMod types found:');
Object.entries(typeCounts).forEach(([type, count]) => {
  console.log(`  ${type}: ${count}`);
});
