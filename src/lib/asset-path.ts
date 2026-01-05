/**
 * Utility function to get the correct asset path for GitHub Pages deployment.
 * Handles basePath prefixing based on environment configuration.
 */

export function getAssetPath(path: string): string {
  const repoName = process.env.NEXT_PUBLIC_REPO_NAME || '';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  // If explicitly configured with basePath, use it
  if (basePath) {
    return `${basePath}${path}`;
  }
  
  // If deployed to GitHub Pages with repo name, add it
  if (repoName) {
    return `/${repoName}${path}`;
  }
  
  // Otherwise, use path as-is (for localhost development)
  return path;
}
