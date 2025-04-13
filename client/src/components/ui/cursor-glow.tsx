import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CursorGlow: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Track hover state for interactive elements
    const trackHoverState = () => {
      const handleMouseEnter = () => setIsHovering(true);
      const handleMouseLeave = () => setIsHovering(false);

      const interactiveElements = document.querySelectorAll('button, a, input, .interactive');
      
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      });

      return () => {
        interactiveElements.forEach(element => {
          element.removeEventListener('mouseenter', handleMouseEnter);
          element.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    };

    window.addEventListener('mousemove', updateMousePosition);
    const cleanup = trackHoverState();

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      cleanup();
    };
  }, []);

  // Disabled on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.5,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />
      
      {/* Outer glow */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-30 border-2 border-primary/20"
        style={{
          width: '80px',
          height: '80px',
          left: mousePosition.x - 40,
          top: mousePosition.y - 40,
          filter: 'blur(5px)',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, rgba(124, 58, 237, 0) 70%)',
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
          opacity: isHovering ? 0.3 : 0.15,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 10, 
          mass: 0.2,
        }}
      />
    </>
  );
};

export default CursorGlow;