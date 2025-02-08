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
      title: "Deep Tech Research, Consulting and Implementation",
      description:
        "Our deep tech research and consulting help businesses harness advanced technologies to drive innovation and growth. Our expertise in deep tech like AI, blockchain, IoT etc ensures that IT infrastructure is optimized for speed, security, and scalability.",
      link: "/services/DeepTechResearch",
    },
    {
      image: "/images/FractionalCTO.jpg",
      title: "Fractional CTO Services",
      description:
        "We provide businesses with on-demand technology leadership without the full-time commitment. We offer strategic guidance in areas like technology roadmap, digital transformation, and scalable IT infrastructure.",
      link: "/services/FractionalCTO",
    },
    {
      image: "/images/ManagedIT.jpg",
      title: "Managed IT Services",
      description:
        "Our Managed IT Services are designed to provide comprehensive, proactive support for all your IT needs, allowing your business to thrive without the burden of managing complex technology in-house.",
      link: "/services/ManagedITServices",
    },
    {
      image: "/images/DataManagement.jpg",
      title: "Data Management",
      description:
        "Our Data management services handle everything accurately from simple to complex data. Our expertise transforms raw data into valuable insights, driving informed decision-making and innovation.",
      link: "/services/DataManagement",
    },
    {
      image: "/images/CyberSecurity.jpg",
      title: "Cyber Security Solutions",
      description:
        "Our robust cybersecurity solutions protect businesses from evolving digital threats. Our services ensure the integrity and confidentiality of your data, safeguarding your digital assets against cyber attacks.",
      link: "/services/CyberSecurity",
    },

    {
      image: "/images/Emerging.jpg",
      title: "Emerging Tech Training",
      description:
        "We offer hands-on training in cutting-edge technologies. Our customized programs are designed to build deep technical expertise, helping teams leverage emerging technologies for business growth.",
      link: "/services/EmergingTech",
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
                <p className="text-gray-700 leading-relaxed mb-4 flex-grow">
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
