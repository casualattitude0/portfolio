#!/bin/bash

# Deploy script for Next.js portfolio to GitHub Pages
# This script builds the app, creates a git repo, and deploys to GitHub Pages

set -e  # Exit on any error

echo "🚀 Starting deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Step 1: Build Next.js app
print_status "Building Next.js application..."
NEXT_PUBLIC_BASE_PATH= npm run build

if [ $? -eq 0 ]; then
    print_success "Build completed successfully!"
else
    print_error "Build failed!"
    exit 1
fi

# Step 2: Add CNAME for custom domain
print_status "Adding CNAME for custom domain..."
echo "casualattitude.site" > out/CNAME

# Step 3: Navigate to the out directory (build output)
print_status "Navigating to build output directory..."
cd out

# Step 4: Initialize git repository
print_status "Initializing git repository..."
git init

# Step 5: Add all files to git
print_status "Adding files to git..."
git add .

# Step 6: Create initial commit
print_status "Creating initial commit..."
git commit -m "feat: deploy portfolio to GitHub Pages

- Build Next.js application for production
- Configure static export for GitHub Pages
- Add .nojekyll file for proper static hosting
- Set up git repository for deployment"

# Step 7: Add GitHub remote using SSH
print_status "Adding GitHub remote using SSH..."
# Check if remote already exists
if git remote get-url origin >/dev/null 2>&1; then
    print_warning "Remote 'origin' already exists"
    git remote set-url origin git@github.com:casualattitude0/portfolio.git
else
    git remote add origin git@github.com:casualattitude0/portfolio.git
fi

# Step 8: Push to gh-pages branch
print_status "Pushing to gh-pages branch..."
git branch -M gh-pages

# Push to gh-pages branch using SSH
print_status "Pushing to gh-pages branch using SSH..."
git push -f origin gh-pages

if [ $? -eq 0 ]; then
    print_success "Successfully pushed to GitHub Pages!"
    print_success "Your portfolio should be available at: https://casualattitude.site"
else
    print_error "Failed to push to GitHub Pages!"
    print_error "Please check your SSH key configuration:"
    print_error "1. Ensure your SSH key is added to your GitHub account"
    print_error "2. Test SSH connection: ssh -T git@github.com"
    print_error "3. You can also manually push by running:"
    print_error "   cd out && git push -f origin gh-pages"
    exit 1
fi

# Step 9: Return to project root
cd ..

print_success "🎉 Deployment completed successfully!"
print_status "Your portfolio is now live at: https://casualattitude.site"
print_status "GitHub Pages will take a few minutes to update the live site."
