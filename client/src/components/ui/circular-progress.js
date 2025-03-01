import React from 'react';

export const CircularProgress = ({ 
  value, 
  max = 100, 
  size = 200, 
  strokeWidth = 15, 
  children, 
  animated = false,
  primaryColor = 'purple',
  secondaryColor = 'indigo' 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = value / max;
  const dashOffset = circumference * (1 - progress);

  const animationClass = animated ? 'animate-pulse' : '';
  const colorMap = {
    purple: {
      light: 'text-purple-100',
      main: 'text-purple-600',
      gradient: 'url(#purpleGradient)'
    },
    blue: {
      light: 'text-blue-100',
      main: 'text-blue-600',
      gradient: 'url(#blueGradient)'
    },
    green: {
      light: 'text-green-100',
      main: 'text-green-600',
      gradient: 'url(#greenGradient)'
    },
    indigo: {
      light: 'text-indigo-100',
      main: 'text-indigo-600',
      gradient: 'url(#indigoGradient)'
    },
  };

  const bgColor = colorMap[primaryColor]?.light || 'text-purple-100';
  const mainColor = colorMap[primaryColor]?.main || 'text-purple-600';
  const gradientId = `${primaryColor}${secondaryColor}Gradient`;

  return (
    <div className={`relative ${animationClass}`} style={{ width: size, height: size }}>
      {/* SVG with gradient definitions */}
      <svg
        className="transform -rotate-90 w-full h-full drop-shadow-lg"
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={`var(--tw-${primaryColor}-500)`} />
            <stop offset="100%" stopColor={`var(--tw-${secondaryColor}-500)`} />
          </linearGradient>
          
          {/* Predefined gradients */}
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9F7AEA" />
            <stop offset="100%" stopColor="#6B46C1" />
          </linearGradient>
          
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#90CDF4" />
            <stop offset="100%" stopColor="#3182CE" />
          </linearGradient>
          
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9AE6B4" />
            <stop offset="100%" stopColor="#38A169" />
          </linearGradient>
          
          <linearGradient id="indigoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A3BFFA" />
            <stop offset="100%" stopColor="#5A67D8" />
          </linearGradient>
          
          {/* Filter for glow effect */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Background circle */}
        <circle
          className={bgColor}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        
        {/* Progress circle */}
        <circle
          className="transition-all duration-700 ease-in-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          stroke={colorMap[primaryColor]?.gradient || 'url(#purpleGradient)'}
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          filter={animated ? "url(#glow)" : ""}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
