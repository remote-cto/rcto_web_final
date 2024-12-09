"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

const WhyRemoteCTO = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cardVariants = {
    initial: {
      scale: 1,
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(6,27,176,0.2)",
      transition: { duration: 0.3 },
    },
  };

  const cardContents = [
    {
      icon: "/images/Proven.jpg",
      title: "Proven Expertise",
      description:
        "We excel in providing niche and tailored IT solutions, ensuring that your specific needs are met with precision and expertise.",
    },
    {
      icon: "/images/Holistic.jpg",
      title: "Holistic Services",
      description:
        "From digital transformation and data management to cybersecurity, we offer a full spectrum of services, making us a one-stop solution for all your technological needs.",
    },
    {
      icon: "/images/ClientCentric.jpg",
      title: "Client-Centric Approach",
      description:
        "We partner with startups, businesses, non-profits, and investment firms, delivering tailored services that foster innovation, growth, and security.",
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-25 ">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl lg:text-5xl font-bold text-center text-[#0026ff] mb-8 font-mono"
          >
            Why Remote CTO?
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cardContents.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              className="bg-white rounded-xl overflow-hidden shadow-lg"
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <div className="relative h-[300px] w-full overflow-hidden">
                <Image
                  src={card.icon}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transform transition-transform duration-300 hover:scale-110"
                />
                {hoveredCard === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-[#061BB0] bg-opacity-70 flex items-center justify-center"
                  >
                    <Info className="text-white w-12 h-12" />
                  </motion.div>
                )}
              </div>

              <div className="p-6 text-center">
                <h2 className="text-xl font-bold text-[#061BB0] mb-3 font-mono">
                  {card.title}
                </h2>
                <p className="text-gray-700 font-mono">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WhyRemoteCTO;