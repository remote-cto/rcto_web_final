
"use client"
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Meteors from "../../components/ui/meteors";
import { CoolMode } from "../../components/ui/cool-mode";



const BannerPage = () => {
  const learnMoreRef = useRef<HTMLDivElement>(null);

  const handleLearnMore = () => {
    learnMoreRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="mt-10 font-mono overflow-hidden relative">
      {/* Background Particle Animation */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute bg-white/30 rounded-full"
            style={{
              width: `${Math.random() * 50}px`,
              height: `${Math.random() * 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      <section className="bg-gradient-to-r from-indigo-500 to-blue-500 mb-10 relative z-10">
        <motion.h1 
          className=" text-2xl lg:text-5xl text-white font-extrabold  px-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Remote CTO
        </motion.h1>

        <div className="mx-auto lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <motion.h1 
              className="text-3xl text-white font-extrabold sm:text-8xl"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Leave the
            </motion.h1>
            <motion.h1 
              className="text-3xl text-white font-extrabold sm:text-8xl"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              tech to us
            </motion.h1>

            <motion.div 
              className="mt-8 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
               <CoolMode>
              <button
                onClick={handleLearnMore}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-xl rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Learn More
              </button>
              </CoolMode>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learn More Section */}
      <div ref={learnMoreRef} className="p-10 bg-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4">About Remote CTO</h2>
          <p>Your technology strategy, managed remotely with expertise and precision.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default BannerPage;