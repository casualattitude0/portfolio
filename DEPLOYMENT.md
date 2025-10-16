# Deployment Guide

This guide explains how to deploy the portfolio to GitHub Pages using the automated deploy script.

## Prerequisites

1. **GitHub Repository**: Ensure you have a GitHub repository set up
2. **SSH Authentication**: SSH keys configured and added to your GitHub account
   - Test your SSH connection: `ssh -T git@github.com`
   - Should return: "Hi username! You've successfully authenticated..."

## Quick Deployment

Run the deployment script:

```bash
./deploy.sh
```

## What the Script Does

1. **Builds the Next.js app** into the `out/` directory
2. **Navigates to the build output** directory
3. **Creates a new git repository** in the output directory
4. **Commits all files** with a conventional commit message
5. **Adds GitHub remote** (if not already present)
6. **Pushes to gh-pages branch** for GitHub Pages deployment

## Manual Deployment Steps

If you prefer to deploy manually:

```bash
# 1. Build the application
npm run build

# 2. Navigate to build output
cd out

# 3. Initialize git repository
git init

# 4. Add all files
git add .

# 5. Create commit
git commit -m "feat: deploy portfolio to GitHub Pages"

# 6. Add remote using SSH (replace with your repository URL)
git remote add origin git@github.com:yourusername/your-repo.git

# 7. Push to gh-pages branch
git branch -M gh-pages
git push -f origin gh-pages
```

## GitHub Pages Configuration

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "Deploy from a branch"
4. Select "gh-pages" branch
5. Save the configuration

Your portfolio will be available at: `https://yourusername.github.io/your-repo-name/`

## Troubleshooting

### Authentication Issues

If you encounter SSH authentication errors:

1. **Test SSH Connection**:

   ```bash
   ssh -T git@github.com
   ```

   Should return: "Hi username! You've successfully authenticated..."

2. **Add SSH Key to GitHub**:

   - Copy your public key: `cat ~/.ssh/id_rsa.pub`
   - Add it to GitHub: Settings → SSH and GPG keys → New SSH key

3. **Generate New SSH Key** (if needed):
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

### Build Issues

If the build fails:

1. Check for TypeScript errors: `npm run lint`
2. Fix any ESLint warnings
3. Ensure all dependencies are installed: `npm install`

### GitHub Pages Not Updating

1. Check the GitHub Actions tab for any failed deployments
2. Verify the gh-pages branch exists and has content
3. Check repository settings for correct Pages configuration

## Environment Variables

The build process uses the following environment variables:

- `NEXT_PUBLIC_BASE_PATH`: Set to `/attitude-portfolio` for GitHub Pages subdirectory deployment

## File Structure After Deployment

```
out/
├── .nojekyll          # Tells GitHub Pages not to process with Jekyll
├── index.html         # Main entry point
├── _next/            # Next.js static assets
├── en/               # English locale pages
├── tw/               # Traditional Chinese locale pages
└── ja/               # Japanese locale pages
```

## Automated Deployment

The project also includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically deploys when you push to the `main` branch. This provides an alternative to manual deployment.
