#!/bin/bash
# Verification script for GitHub Pages deployment setup

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  GitHub Pages Deployment Setup Verification                   ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Check critical files
echo "📋 Checking critical configuration files..."
echo ""

files=(
  "next.config.ts"
  ".env.local"
  ".env.production"
  "src/lib/asset-path.ts"
  ".github/workflows/deploy.yml"
  "GITHUB_PAGES_DEPLOYMENT.md"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file (MISSING)"
  fi
done

echo ""
echo "📦 Checking component updates..."
echo ""

# Check if hero-section.tsx uses getAssetPath
if grep -q "getAssetPath.*logo.png" src/components/landing/hero-section.tsx; then
  echo "  ✅ hero-section.tsx uses getAssetPath()"
else
  echo "  ❌ hero-section.tsx missing getAssetPath()"
fi

# Check if footer.tsx uses getAssetPath
if grep -q "getAssetPath.*logo.png" src/components/landing/footer.tsx; then
  echo "  ✅ footer.tsx uses getAssetPath()"
else
  echo "  ❌ footer.tsx missing getAssetPath()"
fi

echo ""
echo "🔧 Checking environment configuration..."
echo ""

# Check .env.production
if grep -q "NEXT_PUBLIC_REPO_NAME=SCS-Landing" .env.production; then
  echo "  ✅ .env.production has NEXT_PUBLIC_REPO_NAME"
else
  echo "  ⚠️  .env.production missing or incorrect NEXT_PUBLIC_REPO_NAME"
fi

if grep -q "DEPLOY=true" .env.production; then
  echo "  ✅ .env.production has DEPLOY=true"
else
  echo "  ⚠️  .env.production missing DEPLOY=true"
fi

# Check .env.local
if grep -q "DEPLOY=false" .env.local; then
  echo "  ✅ .env.local has DEPLOY=false"
else
  echo "  ⚠️  .env.local missing DEPLOY=false"
fi

echo ""
echo "🚀 Ready for deployment!"
echo ""
echo "Next steps:"
echo "  1. Update NEXT_PUBLIC_REPO_NAME in .env.production if needed"
echo "  2. Run: npm run build (tests local development)"
echo "  3. Run: git add . && git commit -m 'Deploy to GitHub Pages'"
echo "  4. Run: git push origin main"
echo "  5. Enable GitHub Pages in repository settings"
echo "  6. Site will be available at: https://username.github.io/SCS-Landing/"
