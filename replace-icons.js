const fs = require('fs');
const glob = require('glob');

const files = [
  'src/app/page.tsx',
  'src/modules/catalog/components/CatalogoServiciosPanel.tsx',
  'src/modules/education/components/MisClasesPanel.tsx',
  'src/modules/core/components/Taskbar.tsx',
  'src/modules/core/components/Win95Window.tsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Replace imports
  content = content.replace(/from "lucide-react"/g, 'from "pixelarticons/react"');
  content = content.replace(/from 'lucide-react'/g, "from 'pixelarticons/react'");

  // Replace Star with Heart
  content = content.replace(/Star/g, 'Heart');

  // Inject pixelated class
  // Find <Icon className="...">
  const iconNames = ["ChevronRight", "Sword", "Shield", "Zap", "BookOpen", "Heart", "ExternalLink", "X", "Minus", "Square", "PlayCircle", "FileText", "CheckCircle2", "Lock", "Search", "Users", "Terminal", "Database", "Clock", "RefreshCcw"];
  
  // Actually PlayCircle -> Play, FileText -> FileText, CheckCircle2 -> CheckDouble
  content = content.replace(/PlayCircle/g, 'Play');
  content = content.replace(/CheckCircle2/g, 'CheckDouble');
  
  iconNames.forEach(icon => {
    const rx = new RegExp(`<${icon}([^>]+)className=(["'])(.*?)(["'])`, 'g');
    content = content.replace(rx, `<${icon}$1className=$2pixelated $3$4`);
    
    const rx2 = new RegExp(`<${icon} />`, 'g');
    content = content.replace(rx2, `<${icon} className="pixelated" />`);
  });

  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});
