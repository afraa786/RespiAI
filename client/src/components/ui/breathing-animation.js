import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BreathingAnimation = ({ 
  state = 'idle', // idle, inhale, hold, exhale, pause
  size = 200,
  primaryColor = 'purple',
  secondaryColor = 'indigo'
}) => {
  const [scale, setScale] = useState(1);
  const [message, setMessage] = useState('');
  
  // Define color maps
  const colorMap = {
    purple: {
      light: '#E9D8FD',
      main: '#805AD5',
      dark: '#553C9A',
      glow: 'rgba(128, 90, 213, 0.3)'
    },
    blue: {
      light: '#BEE3F8',
      main: '#3182CE',
      dark: '#2C5282',
      glow: 'rgba(49, 130, 206, 0.3)'
    },
    indigo: {
      light: '#C3DAFE',
      main: '#5A67D8',
      dark: '#434190',
      glow: 'rgba(90, 103, 216, 0.3)'
    },
    green: {
      light: '#C6F6D5',
      main: '#38A169',
      dark: '#276749',
      glow: 'rgba(56, 161, 105, 0.3)'
    }
  };
  
  // Set colors
  const colors = {
    primary: colorMap[primaryColor] || colorMap.purple,
    secondary: colorMap[secondaryColor] || colorMap.indigo
  };
  
  // Manage animation state
  useEffect(() => {
    let timeout;
    
    switch(state) {
      case 'inhale':
        setScale(1.5);
        setMessage('Breathe In');
        break;
      case 'hold':
        setScale(1.5);
        setMessage('Hold');
        break;
      case 'exhale':
        setScale(1);
        setMessage('Breathe Out');
        break;
      case 'pause':
        setScale(1);
        setMessage('Pause');
        break;
      default:
        setScale(1);
        setMessage('Get Ready');
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [state]);

  // Animation variants for particles
  const particleVariants = {
    inhale: (i) => ({
      x: 0,
      y: 0,
      opacity: 0,
      scale: 0,
      transition: {
        duration: 2,
        repeat: Infinity,
        delay: i * 0.2,
      }
    }),
    exhale: (i) => ({
      x: (i % 2 === 0) ? [-20, -50, -70] : [20, 50, 70],
      y: [-20, -50, -90],
      opacity: [0, 0.5, 0],
      scale: [0, 1, 0.5],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        delay: i * 0.2,
      }
    }),
    idle: {
      opacity: 0
    }
  };

  // Create particles for breathing visualization
  const particles = Array.from({ length: 8 }).map((_, i) => {
    const size = Math.random() * 8 + 4;
    return (
      <motion.div
        key={i}
        custom={i}
        variants={particleVariants}
        animate={state === 'exhale' ? 'exhale' : state === 'inhale' ? 'inhale' : 'idle'}
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: colors.primary.light,
          left: 'calc(50% - 4px)',
          top: 'calc(50% - 4px)',
        }}
      />
    );
  });

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Particles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {particles}
      </div>
      
      {/* Outer glow blob with pulse animation */}
      <motion.div 
        className="absolute rounded-full blur-xl transition-all"
        style={{
          backgroundColor: colors.primary.glow,
          width: `${size * 2}px`,
          height: `${size * 2}px`,
        }}
        animate={{
          scale: state === 'inhale' ? [1, 1.2] : state === 'exhale' ? [1.2, 1] : 1,
          opacity: state === 'hold' ? [0.3, 0.5, 0.3] : 0.3
        }}
        transition={{
          scale: { duration: state === 'inhale' ? 3 : state === 'exhale' ? 4 : 0 },
          opacity: { duration: 2, repeat: state === 'hold' ? Infinity : 0 }
        }}
      />
      
      {/* Middle blob */}
      <motion.div 
        className="absolute rounded-full blur-md transition-all"
        style={{
          backgroundColor: colors.primary.light,
          width: `${size * 1.4}px`,
          height: `${size * 1.4}px`,
          opacity: 0.5
        }}
        animate={{
          scale: scale * 0.95
        }}
        transition={{
          type: "spring", 
          stiffness: 50, 
          damping: 20
        }}
      />
      
      {/* Inner circle with gradient */}
      <motion.div 
        className="rounded-full shadow-lg"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${colors.primary.light}, ${colors.primary.dark})`,
          width: `${size}px`,
          height: `${size}px`,
        }}
        animate={{
          scale
        }}
        transition={{
          type: "spring", 
          stiffness: 60, 
          damping: 15
        }}
      >
        {/* Inner circles for decorative effect */}
        <div 
          className="absolute rounded-full"
          style={{
            background: `radial-gradient(circle at 70% 70%, transparent, ${colors.primary.dark}80)`,
            width: '100%',
            height: '100%',
            opacity: 0.4,
          }}
        />
        <div 
          className="absolute rounded-full"
          style={{
            border: `2px solid ${colors.primary.light}50`,
            width: '80%',
            height: '80%',
            top: '10%',
            left: '10%',
            opacity: 0.3,
          }}
        />
      </motion.div>
      
      {/* Phase Indicator with animated transitions */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={state}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute mt-4 pt-20"
        >
          <div className="text-center">
            <div className="text-sm font-medium text-white bg-opacity-70 px-3 py-1 rounded-full bg-gray-800 backdrop-blur-sm">
              {
                state === 'inhale' ? 'Inhale' :
                state === 'hold' ? 'Hold' :
                state === 'exhale' ? 'Exhale' :
                state === 'pause' ? 'Pause' : 'Ready'
              }
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}; 