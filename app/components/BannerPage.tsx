"use client";
 
import { cn } from "../../lib/utils";
import GridPattern from "../../components/ui/grid-pattern";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { CoolMode } from "../../components/ui/cool-mode";
import Image from 'next/image';

const BannerPage = () => {
  const learnMoreSectionRef = useRef<HTMLDivElement>(null);

  const scrollToLearnMore = () => {
    learnMoreSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start' 
    });
  };

  return (
    <div className="relative">
      <section className="bg-gradient-to-r from-indigo-500 to-blue-500 min-h-screen relative z-10">
        <motion.h1 
          className="text-2xl lg:text-5xl text-white font-extrabold px-10 pt-6 font-mono"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Remote CTO
        </motion.h1>

        <div className="mx-auto lg:flex lg:min-h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <div className="flex items-center justify-center space-x-8 mb-4">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Image 
                  src="/images/design.png" 
                  alt="Remote CTO" 
                  width={300} 
                  height={300} 
                  className="rounded-lg w-128 h-128"
                />
              </motion.div>
              <div>
                <motion.h1 
                  className="text-3xl text-gray-700 font-extrabold sm:text-8xl font-mono"
                  initial={{ opacity: 0, x: 100 }}
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
              </div>
            </div>

            <motion.div 
              className="mt-8 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <CoolMode>
                <button
                  type="button"
                  onClick={scrollToLearnMore}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-xl rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Get Started
                </button>
              </CoolMode>
            </motion.div>
          </div>
        </div>
        <GridPattern
          squares={[
            [4, 4], [5, 1], [8, 2], [5, 3], [5, 5],
            [10, 10], [12, 15], [15, 10], [10, 15],
            [15, 10], [10, 15], [15, 10],
          ]}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          )}
        />
      </section>

      {/* Learn More Section */}
      
    </div>
  );
};

export default BannerPage;