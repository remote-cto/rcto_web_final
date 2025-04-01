import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const LoadingAnimation = () => {
  const circleVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-indigo-500/90 to-blue-500/90 backdrop-blur-sm z-50">
      <div className="relative flex items-center justify-center">
        <motion.div 
          className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 flex items-center justify-center"
          initial="initial"
          animate="animate"
        >
          {/* Pulsing background circle */}
          <motion.div
            variants={pulseVariants}
            className="absolute inset-0 bg-white/20 rounded-full"
          />
          
          {/* Rotating circle */}
          <motion.svg
            width="100%"
            height="100%"
            viewBox="0 0 120 120"
            variants={circleVariants}
            className="absolute inset-0 z-10"
          >
            {/* <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="339.292"
              strokeDashoffset="240"
            /> */}
          </motion.svg>
          
          {/* Logo container - positioned absolutely in the center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full relative"
            >
              <Image 
                src="/images/Logo.png" 
                alt="Logo" 
                layout="fill"
                objectFit="contain"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingAnimation;