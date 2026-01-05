# GitHub Pages Deployment Guide

This project is configured for static export to GitHub Pages with proper asset path handling.

## Project Structure

```
/workspaces/SCS-Landing/
├── next.config.ts              # Main config (handles basePath dynamically)
├── .env.local                  # Local development (no basePath)
├── .env.production             # Production deployment (with basePath)
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── public/
│   └── logo.png                # Static assets
├── src/
│   ├── lib/
│   │   └── asset-path.ts       # Utility for asset path resolution
│   ├── components/
│   │   └── landing/
│   │       ├── hero-section.tsx   # Uses getAssetPath()
│   │       └── footer.tsx         # Uses getAssetPath()
│   └── app/
│       └── page.tsx
```

## Configuration Files

### next.config.ts

- **`output: 'export'`** - Enables static export for GitHub Pages
- **`basePath`** - Dynamically set based on `NEXT_PUBLIC_REPO_NAME`
- **`assetPrefix`** - Automatically prefixes all asset URLs
- **`images.unoptimized: true`** - Required for static export

### .env.local (Development)

```
NEXT_PUBLIC_REPO_NAME=
NEXT_PUBLIC_BASE_PATH=
NODE_ENV=development
DEPLOY=false
```

**Local Development**: Assets load from `/logo.png` (no repo prefix)

### .env.production (Deployment)

```
NEXT_PUBLIC_REPO_NAME=SCS-Landing
NEXT_PUBLIC_BASE_PATH=/SCS-Landing
NODE_ENV=production
DEPLOY=true
```

**GitHub Pages**: Assets load from `/SCS-Landing/logo.png` (with repo prefix)

## Asset Path Utility

### src/lib/asset-path.ts

```typescript
export function getAssetPath(path: string): string {
  const repoName = process.env.NEXT_PUBLIC_REPO_NAME || '';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  if (basePath) return `${basePath}${path}`;
  if (repoName) return `/${repoName}${path}`;
  return path;
}
```

**Usage in components:**

```tsx
import { getAssetPath } from '@/lib/asset-path';

export function MyComponent() {
  return <img src={getAssetPath('/logo.png')} alt="Logo" />;
}
```

## Updated Components

### hero-section.tsx

```tsx
import { getAssetPath } from '@/lib/asset-path';

<Image
  src={getAssetPath('/logo.png')}
  alt="Sahayata Cyber Support Logo"
  width={500}
  height={150}
  priority
/>
```

### footer.tsx

```tsx
import { getAssetPath } from '@/lib/asset-path';

<Image 
  src={getAssetPath('/logo.png')} 
  alt="Sahayata Cyber Support" 
  width={250} 
  height={75} 
/>
```

## How to Deploy

### 1. Local Development

```bash
# Install dependencies
npm install

# Build locally (development)
npm run build

# Verify output directory
ls -la out/

# Start development server
npm run dev
```

All assets load correctly from `/logo.png`.

### 2. GitHub Pages Deployment

#### Option A: Automatic (GitHub Actions)

```bash
# Push to main branch
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

GitHub Actions automatically:
1. Sets environment variables for production
2. Installs dependencies
3. Builds with `NEXT_PUBLIC_REPO_NAME=SCS-Landing`
4. Deploys `out/` directory to GitHub Pages

#### Option B: Manual Deployment

```bash
# Build for GitHub Pages
NEXT_PUBLIC_REPO_NAME=SCS-Landing \
NEXT_PUBLIC_BASE_PATH=/SCS-Landing \
NODE_ENV=production \
DEPLOY=true \
npm run build

# Output is in ./out directory
# Upload to GitHub Pages manually via repository settings
```

### 3. Verify GitHub Pages Settings

In your GitHub repository:

1. **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: main, /root
4. **Save**

Your site will be available at: `https://username.github.io/SCS-Landing/`

## Asset Loading Flow

### Development (npm run dev)

```
/logo.png
    ↓
getAssetPath('/logo.png')
    ↓
NEXT_PUBLIC_REPO_NAME = '' (empty)
    ↓
Returns: /logo.png
    ↓
Served from: http://localhost:3000/logo.png ✓
```

### Production (GitHub Pages)

```
/logo.png
    ↓
getAssetPath('/logo.png')
    ↓
NEXT_PUBLIC_REPO_NAME = 'SCS-Landing'
    ↓
Returns: /SCS-Landing/logo.png
    ↓
Served from: https://username.github.io/SCS-Landing/logo.png ✓
```

## Troubleshooting

### 404 Asset Errors on GitHub Pages

**Problem**: Assets return 404 when deployed

**Solution**: Verify environment variables in `.env.production`:
```bash
NEXT_PUBLIC_REPO_NAME=SCS-Landing
NEXT_PUBLIC_BASE_PATH=/SCS-Landing
DEPLOY=true
```

### Assets Work Locally but Not on GitHub Pages

**Problem**: Assets load correctly in development but fail on deployed site

**Reason**: `NEXT_PUBLIC_REPO_NAME` not set during build

**Fix**: Check GitHub Actions logs and rebuild with correct environment variables

### How to Update Repository Name

If your GitHub repository name changes:

1. Update `.env.production`:
   ```
   NEXT_PUBLIC_REPO_NAME=new-repo-name
   NEXT_PUBLIC_BASE_PATH=/new-repo-name
   ```

2. Update `.github/workflows/deploy.yml`:
   ```yaml
   env:
     NEXT_PUBLIC_REPO_NAME: new-repo-name
     NEXT_PUBLIC_BASE_PATH: /new-repo-name
   ```

3. Push changes to trigger redeploy

## Build Commands

```bash
# Development build (local testing)
npm run build

# Production build for GitHub Pages
NEXT_PUBLIC_REPO_NAME=SCS-Landing \
NEXT_PUBLIC_BASE_PATH=/SCS-Landing \
NODE_ENV=production \
DEPLOY=true \
npm run build

# Verify build output
ls -la out/
file out/logo.png  # Should exist in output
```

## Adding New Assets

For any new static assets (images, fonts, files):

1. Place file in `/public/` directory
2. Use `getAssetPath()` in components:

```tsx
import { getAssetPath } from '@/lib/asset-path';

// Image
<img src={getAssetPath('/new-image.png')} alt="Description" />

// CSS/Fonts
<link rel="stylesheet" href={getAssetPath('/fonts/custom.css')} />

// Other files
<a href={getAssetPath('/documents/file.pdf')}>Download</a>
```

## Performance Notes

- ✅ Static export (~100KB footprint)
- ✅ No server-side rendering required
- ✅ Image optimization disabled (required for static export)
- ✅ All assets are immutable (safe for caching)
- ✅ CDN-friendly deployment

## Next Steps

1. Push code to GitHub
2. Enable GitHub Pages in repository settings
3. GitHub Actions automatically deploys on push to `main`
4. Site available at: `https://username.github.io/SCS-Landing/`
