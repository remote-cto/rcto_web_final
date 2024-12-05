
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

  const sections = [
    {
      title: "Deep Technology Consulting",
      description: "We provide cutting-edge advisory services in emerging technologies, helping businesses stay ahead of the digital curve."
    },
    {
      title: "Digital Transformation",
      description: "Our expertise enables seamless digital transformation, guiding companies through complex technological transitions."
    },
    {
      title: "Fractional CTO Services",
      description: "Get strategic technical leadership without the cost of a full-time CTO, tailored to your business needs."
    }
  ];

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

      <section className="mt-16 bg-white py-12">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                onClick={() => handleSectionToggle(index)}
                className={`p-6 rounded-lg shadow-md cursor-pointer transition-all duration-300 
                  ${activeSection === index 
                    ? 'bg-[#061BB0] text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                <h3 className="text-xl font-bold mb-3 font-mono">{section.title}</h3>
                <p className={`text-sm transition-all duration-300 font-mono
                  ${activeSection === index ? 'text-gray-200' : 'text-gray-600'}`}>
                  {section.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RemoteCTOWay;