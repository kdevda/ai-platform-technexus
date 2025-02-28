#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Loan Management App Deployment Script${NC}"
echo -e "${YELLOW}======================================${NC}"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}Git is not installed. Please install git and try again.${NC}"
    exit 1
fi

# Check if the current directory is a git repository
if [ ! -d .git ]; then
    echo -e "${YELLOW}Initializing git repository...${NC}"
    git init
    echo -e "${GREEN}Git repository initialized.${NC}"
else
    echo -e "${GREEN}Git repository already initialized.${NC}"
fi

# Add all files to git
echo -e "${YELLOW}Adding files to git...${NC}"
git add .
echo -e "${GREEN}Files added to git.${NC}"

# Commit changes
echo -e "${YELLOW}Committing changes...${NC}"
read -p "Enter commit message: " commit_message
git commit -m "$commit_message"
echo -e "${GREEN}Changes committed.${NC}"

# Check if remote origin exists
if ! git remote | grep -q "origin"; then
    echo -e "${YELLOW}Adding remote origin...${NC}"
    read -p "Enter GitHub repository URL: " repo_url
    git remote add origin "$repo_url"
    echo -e "${GREEN}Remote origin added.${NC}"
else
    echo -e "${GREEN}Remote origin already exists.${NC}"
fi

# Push to GitHub
echo -e "${YELLOW}Pushing to GitHub...${NC}"
git push -u origin main
echo -e "${GREEN}Changes pushed to GitHub.${NC}"

echo -e "${YELLOW}Deployment preparation complete!${NC}"
echo -e "${GREEN}Next steps:${NC}"
echo -e "1. Deploy the frontend to Vercel: https://vercel.com/import"
echo -e "2. Deploy the backend to Railway: https://railway.app/new"
echo -e "3. Configure environment variables as described in DEPLOYMENT.md"
echo -e "${YELLOW}Happy deploying!${NC}" 