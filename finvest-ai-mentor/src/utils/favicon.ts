import React from 'react';

// Custom favicon for the app
export const createFavicon = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d')!;

  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, 32, 32);
  gradient.addColorStop(0, '#3b82f6');
  gradient.addColorStop(1, '#1d4ed8');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);
  
  // Add "AI" text
  ctx.fillStyle = 'white';
  ctx.font = 'bold 12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('AI', 16, 20);

  // Convert to favicon
  const link = document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = canvas.toDataURL();
  document.getElementsByTagName('head')[0].appendChild(link);
};

// Create favicon on app load
if (typeof window !== 'undefined') {
  createFavicon();
}