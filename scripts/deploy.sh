#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Move to the project root (from /scripts)
cd "$(dirname "$0")/.."

echo "Running from: $(pwd)"

echo "Installing dependencies..."
npm install

echo "Cleaning up old artifacts..."
npx hardhat clean

# Delete previous deployments
echo "Deleting previous deployments..."
if [ -d "ignition/deployments" ]; then
  rm -rf ignition/deployments
  echo "Previous deployments deleted."
else
  echo "No previous deployments found."
fi

echo "Running tests..."
npx hardhat test

# Check if .env exists
if [ -f ".env" ]; then
  echo ".env file already exists. Skipping environment setup."
else
  echo "No .env file found. Creating one now..."
  read -p "Enter your private key: " PRIVATE_KEY
  read -p "Enter your Sepolia RPC URL: " SEPOLIA_RPC
  read -p "Enter your public wallet address: " PUBLIC_ADDRESS
  cat > .env <<EOF
PRIVATE_KEY=$PRIVATE_KEY
SEPOLIA_RPC_URL=$SEPOLIA_RPC
PUBLIC_ADDRESS=$PUBLIC_ADDRESS
EOF
  echo ".env file created."
fi

echo "Deploying contracts using Ignition..."
npx hardhat ignition deploy ./ignition/modules/deploy.ts --network sepolia

# Start local server to serve frontend
echo "Starting local server at http://localhost:8080/voting-website/..."
npx serve -l 8080 . &

if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  open "http://localhost:8080/front-end/voting-website/"
elif [[ "$OSTYPE" == "msys"* || "$OSTYPE" == "cygwin"* ]]; then
  # Windows
  start "http://localhost:8080/front-end/voting-website/"
else
  echo "Unsupported OS"
fi
