
"use client"
import React, { useState } from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';

const RemoteCTOWay = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  

  const handleSectionToggle = (index: number) => {
    setActiveSection(prevActive => prevActive === index ? null : index);
  };

  return (
    <div className="bg-gray-50">
      <motion.section 
        initial="hidden"
        animate="visible"
        className="pt-10 pb-16 "
      >
        <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center font-mono">
          <div className="mx-auto max-w-xl text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-extrabold text-[#061BB0] sm:block font-mono"
            >
              The REMOTE CTO Way
            </motion.h1>
          </div>
        </div>
      </motion.section>

      <section className="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center">
        <div className="lg:w-1/2 lg:pr-10">
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="text-gray-600 leading-relaxed font-mono"
          >
            Remote CTO is a pioneering deep technology consulting and implementation company that offers fractional CTO services to businesses of all sizes. Based in Ahmedabad, India's first Heritage City, we pride ourselves on our deep tech advisory and digital transformation expertise.
          </motion.p>
        </div>

        <div className="lg:w-1/2 mt-6 lg:mt-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="shadow-lg rounded-lg overflow-hidden"
          >
            <Image
              src="/images/RemoteCTOWay.jpg"
              width={500}
              height={400}
              alt="Remote CTO Team"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </section>

     
    </div>
  );
};

export default RemoteCTOWay;