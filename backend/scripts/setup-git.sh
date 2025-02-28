#!/bin/bash

# Script to initialize Git repository for Railway deployment

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up Git repository for Railway deployment...${NC}"

# Check if we're in the backend directory
if [[ ! -f "package.json" ]]; then
  echo -e "${RED}Error: This script must be run from the backend directory.${NC}"
  echo -e "${YELLOW}Please run: cd /path/to/loan-management-app/backend && ./scripts/setup-git.sh${NC}"
  exit 1
fi

# Check if Git is already initialized
if [[ -d ".git" ]]; then
  echo -e "${YELLOW}Git repository already exists.${NC}"
else
  echo -e "${GREEN}Initializing Git repository...${NC}"
  git init
  echo -e "${GREEN}Git repository initialized.${NC}"
fi

# Create .gitignore if it doesn't exist
if [[ ! -f ".gitignore" ]]; then
  echo -e "${GREEN}Creating .gitignore file...${NC}"
  cat > .gitignore << EOL
# Node modules
node_modules/

# Environment variables
.env
.env.local
.env.development
.env.test
.env.production

# Build files
dist/
build/

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE files
.idea/
.vscode/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db
EOL
  echo -e "${GREEN}.gitignore file created.${NC}"
else
  echo -e "${YELLOW}.gitignore file already exists.${NC}"
fi

# Check if there are any changes to commit
if [[ -n "$(git status --porcelain)" ]]; then
  echo -e "${GREEN}Adding files to Git...${NC}"
  git add .
  echo -e "${GREEN}Files added to Git.${NC}"
  
  echo -e "${GREEN}Committing changes...${NC}"
  git commit -m "Initial commit for Railway deployment"
  echo -e "${GREEN}Changes committed.${NC}"
else
  echo -e "${YELLOW}No changes to commit.${NC}"
fi

# Instructions for Railway deployment
echo -e "\n${GREEN}=== Railway Deployment Instructions ===${NC}"
echo -e "${YELLOW}1. Create a new project on Railway (https://railway.app)${NC}"
echo -e "${YELLOW}2. Link this repository to your Railway project:${NC}"
echo -e "   railway link"
echo -e "${YELLOW}3. Set up your environment variables on Railway:${NC}"
echo -e "   - PORT=5000"
echo -e "   - MONGODB_URI=your_mongodb_connection_string"
echo -e "   - POSTGRES_URI=your_postgres_connection_string"
echo -e "   - JWT_SECRET=your_jwt_secret"
echo -e "   - NODE_ENV=production"
echo -e "${YELLOW}4. Deploy your application:${NC}"
echo -e "   railway up"
echo -e "\n${GREEN}Your application is now ready for Railway deployment!${NC}"

echo -e "\n${YELLOW}To check your environment variables, run:${NC}"
echo -e "npm run check-env"

exit 0 