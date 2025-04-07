#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

cd ..
echo "Installing dependencies..."
npm install

echo "Compiling contracts..."
npx hardhat compile

echo "Deploying contracts using Ignition..."
npx hardhat ignition deploy ./ignition/modules/deploy.ts --network sepolia