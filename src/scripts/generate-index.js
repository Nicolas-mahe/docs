const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');

// Dossiers à ignorer
const ignoredDirs = ['assets', 'images', 'img', 'test'];

// Parcours récursif avec filtrage
function getAllDocs(dir, basePath = '', depth = 0) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });

  // Trier : fichiers en premier, puis dossiers
  list.sort((a, b) => {
    if (!a.isDirectory() && b.isDirectory()) return -1; // fichier avant dossier
    if (a.isDirectory() && !b.isDirectory()) return 1;  // dossier après fichier
    return a.name.localeCompare(b.name);
  });

  for (const entry of list) {
    if (entry.isDirectory()) {
      if (ignoredDirs.includes(entry.name)) {
        continue; // On saute les dossiers exclus
      }
      results.push({ type: 'dir', name: entry.name, depth });
      results = results.concat(getAllDocs(path.join(dir, entry.name), path.join(basePath, entry.name), depth + 1));
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      results.push({
        type: 'file',
        name: entry.name,
        path: path.join(basePath, entry.name).replace(/\\/g, '/'),
        depth
      });
    }
  }
  return results;
}

function extractTitle(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const lines = frontmatterMatch[1].split('\n');
    for (const line of lines) {
      if (line.toLowerCase().startsWith('title:')) {
        return line.replace(/^title:\s*/, '').trim().replace(/^["']|["']$/g, '');
      }
    }
  }

  const headingMatch = content.match(/^#\s+(.+)/m);
  if (headingMatch) {
    return headingMatch[1].trim();
  }

  return path.basename(filePath, path.extname(filePath));
}

const items = getAllDocs(docsDir);

let content = `---\nsidebar_position: 1\n---\n# Sommaire\n\nBienvenue dans la documentation technique de Volcano Solutions. Voici toutes les pages disponibles :\n\n`;

for (const item of items) {
  const indent = '  '.repeat(item.depth);
  if (item.type === 'dir') {
    content += `${indent}- **${item.name}**\n`;
  } else if (item.type === 'file') {
    const fullPath = path.join(docsDir, item.path);
    const title = extractTitle(fullPath);
    const linkPath = item.path.replace(/\.mdx?$/, '');
    content += `${indent}- [${title}](/docs/${linkPath})\n`;
  }
}

const outputDir = path.join(__dirname, '../docs');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(path.join(outputDir, 'summary.md'), content, 'utf8');

console.log('✅ Sommaire généré dans docs/summary.md');
