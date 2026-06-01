const fs = require('fs');
const path = require('path');

const filesToFix = [
  path.join(__dirname, 'src/components/home/Hero.tsx'),
  path.join(__dirname, 'src/components/layout/Header.tsx')
];

filesToFix.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace CSS variables syntax
    content = content.replace(/bg-\[var\((--[a-zA-Z0-9-]+)\)\]/g, 'bg-($1)');
    content = content.replace(/text-\[var\((--[a-zA-Z0-9-]+)\)\]/g, 'text-($1)');
    content = content.replace(/border-\[var\((--[a-zA-Z0-9-]+)\)\]/g, 'border-($1)');
    
    // Replace specific utilities
    content = content.replace(/min-h-\[100svh\]/g, 'min-h-svh');
    content = content.replace(/leading-\[1\]/g, 'leading-none');
    content = content.replace(/z-\[80\]/g, 'z-80');
    content = content.replace(/z-\[70\]/g, 'z-70');
    content = content.replace(/z-\[60\]/g, 'z-60');
    content = content.replace(/tracking-\[0\.1em\]/g, 'tracking-widest');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed lint issues in ${filePath}`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
});
