const fs = require('fs');
const path = require('path');

const apps = [
  { name: 'beauty_spa', domain: 'https://fancylushspa.com.ng' },
  { name: 'fancy_hub', domain: 'https://fancylush.com.ng' },
  { name: 'lush_dentals', domain: 'https://lushdental.com.ng' },
  { name: 'lush_hairs', domain: 'https://fancylushhair.com.ng' },
  { name: 'lush_perfs', domain: 'https://lushatelier.com.ng' }
];

const basePath = path.join(__dirname, 'apps');

function getStaticRoutes(dir, baseDir, routes = []) {
  if (!fs.existsSync(dir)) return routes;
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Ignore dynamic routes, api routes, and private folders
      if (!file.startsWith('[') && !file.startsWith('_') && file !== 'api') {
        getStaticRoutes(fullPath, baseDir, routes);
      }
    } else if (file === 'page.tsx') {
      let routePath = dir.replace(baseDir, '').replace(/\\/g, '/');
      
      // Strip route groups e.g. /(auth)/login -> /login
      routePath = routePath.split('/').filter(segment => !segment.startsWith('(') && !segment.endsWith(')')).join('/');
      
      // We don't want admin pages in the public sitemap
      if (!routePath.includes('/admin')) {
        routes.push(routePath);
      }
    }
  }
  return routes;
}

apps.forEach(app => {
  const appSrc = path.join(basePath, app.name, 'src', 'app');
  
  if (!fs.existsSync(appSrc)) return;

  const routes = getStaticRoutes(appSrc, appSrc);
  
  const sitemapEntries = routes.map(route => {
    return `    {
      url: \`\${baseUrl}${route}\`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: ${route === '' ? 1 : 0.8},
    }`;
  }).join(',\n');

  const sitemapContent = `import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = '${app.domain}'
  
  return [
${sitemapEntries}
  ]
}
`;

  fs.writeFileSync(path.join(appSrc, 'sitemap.ts'), sitemapContent);
  console.log(`Updated sitemap for ${app.name} with ${routes.length} static routes.`);
});
