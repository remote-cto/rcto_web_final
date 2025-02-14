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
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-r from-indigo-500/90 to-blue-500/90 backdrop-blur-sm z-50">
      <motion.div 
        className="relative"
        initial="initial"
        animate="animate"
      >
        <motion.div
          variants={pulseVariants}
          className="absolute inset-0 bg-white/20 rounded-full"
          style={{ width: '180px', height: '180px' }}
        />
        <motion.svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          variants={circleVariants}
          className="relative z-10"
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
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-medium"
        >
         <Image src="/images/RCTO.png" height={60} width={60} alt="Logo" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;