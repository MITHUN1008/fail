#!/usr/bin/env node

// Development build script for Lovable platform compatibility
const { execSync } = require('child_process');

try {
  console.log('Running development build...');
  execSync('npm run dev', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}