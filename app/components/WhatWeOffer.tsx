"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CoolMode } from "../../components/ui/cool-mode";

const WhatWeOffer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
      },
    },
  };

  const services = [
    {
      image: "/images/DeepTechResearch.jpg",
      title: "Deep Tech Solutions",
      description:
        "At Remote CTO, we bring deep technology expertise across cybersecurity, data management, and AI solutions to help businesses thrive in a digital-first world. Our specialized divisions ensure you get expert guidance and solutions tailored to your unique challenges.",
      link: "/services/DeepTechSolution",
    },
    {
      image: "/images/FractionalCTO.jpg",
      title: "Advisory and Strategic Technology Leadership",
      description:
        "Our Advisory & Strategic Technology Leadership services provide expert guidance on technology adoption, digital transformation, and enterprise architecture. We help organizations align technology with business goals, optimize IT investments, and stay ahead of the competition. Whether you need Fractional CTO services, AI strategy consulting, or digital roadmap planning, we bring deep technical expertise and strategic foresight to fuel your success.",
      link: "/services/FractionalCTO",
    },
    {
      image: "/images/ManagedIT.jpg",
      title: "Managed IT Services",
      description:
        "Our Managed IT Services provide end-to-end support, ensuring your infrastructure, applications, and networks run efficiently with minimal downtime. From proactive monitoring and cybersecurity to cloud management and IT support, we take care of your technology so you can focus on growing your business. Whether you need fully managed solutions or co-managed IT support, our expert team ensures reliability, security, and performance at every level.",
      link: "/services/ManagedITServices",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-br from-blue-50 to-white py-16 font-mono"
    >
      <div className="container mx-auto px-4">
        <motion.h1
          variants={titleVariants}
          className="text-center text-4xl md:text-5xl font-extrabold mb-12 text-[#061BB0] tracking-tight font-mono"
        >
          What We Offer
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 flex flex-col"
            >
              <div className="relative w-full h-56 overflow-hidden">
                <motion.div
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.5 + index * 0.2,
                    duration: 0.8,
                  }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h2 className="text-xl font-bold text-[#061BB0] mb-3">
                  {service.title}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4 flex-grow ">
                  {service.description}
                </p>
                <div className="mt-auto">
                  <CoolMode>
                    <Link
                      href={service.link}
                      className="group relative block w-full"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center bg-[#061BB0] text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out"
                      >
                        <span className="mr-2">Learn More</span>

                        <motion.span
                          initial={{ x: 0 }}
                          animate={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="inline-block"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.span>
                      </motion.div>
                    </Link>
                  </CoolMode>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WhatWeOffer;
