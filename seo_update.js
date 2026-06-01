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

apps.forEach(app => {
  const appSrc = path.join(basePath, app.name, 'src', 'app');
  
  // 1. Create icon.tsx
  const iconContent = `import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050404',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D4AF37',
          fontSize: 20,
          fontWeight: 'bold',
          fontFamily: 'serif',
          borderRadius: '4px',
          border: '1px solid #D4AF37',
        }}
      >
        FL
      </div>
    ),
    { ...size }
  )
}
`;
  fs.writeFileSync(path.join(appSrc, 'icon.tsx'), iconContent);
  
  // 2. Create robots.ts
  const robotsContent = `import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: '${app.domain}/sitemap.xml',
  }
}
`;
  fs.writeFileSync(path.join(appSrc, 'robots.ts'), robotsContent);

  // 3. Create sitemap.ts
  const sitemapContent = `import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: '${app.domain}',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
`;
  fs.writeFileSync(path.join(appSrc, 'sitemap.ts'), sitemapContent);

  // 4. Update layout.tsx
  const layoutPath = path.join(appSrc, 'layout.tsx');
  if (fs.existsSync(layoutPath)) {
    let layoutContent = fs.readFileSync(layoutPath, 'utf8');
    
    // Add metadataBase, alternates, and twitter to the metadata object
    if (layoutContent.includes('export const metadata: Metadata = {') && !layoutContent.includes('metadataBase')) {
      const injection = `
  metadataBase: new URL('${app.domain}'),
  alternates: {
    canonical: '/',
  },
  twitter: {
    card: 'summary_large_image',
  },`;
      
      layoutContent = layoutContent.replace(
        'export const metadata: Metadata = {',
        'export const metadata: Metadata = {' + injection
      );
      fs.writeFileSync(layoutPath, layoutContent);
    }
  }

  // 5. Delete favicon.ico if exists
  const faviconPath = path.join(appSrc, 'favicon.ico');
  if (fs.existsSync(faviconPath)) {
    fs.unlinkSync(faviconPath);
  }
});

console.log('SEO update completed successfully.');
