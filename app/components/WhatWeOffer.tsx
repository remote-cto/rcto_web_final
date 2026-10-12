"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  X,
  Send,
  Layers,
  Code2,
  ShieldAlert,
  Users,
  FileCheck,
  CheckCircle2,
  Search,
  Cpu,
  Boxes,
  Target,
  Network,
  FileText,
  Briefcase,
  PieChart,
  DollarSign,
  Code,
} from "lucide-react";
import { CoolMode } from "../../components/ui/cool-mode";

interface ServiceDetail {
  image: string;
  title: string;
  description: string;
  tagline?: string;
  leadHighlight?: {
    headline?: string;
    text: string;
  };
  points: {
    title: string;
    description: string;
    icon: React.ElementType;
  }[];
  conclusion: string;
}

const WhatWeOffer = () => {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };
    if (activeModal !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeModal]);

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

  const services: ServiceDetail[] = [
    {
      image: "/images/DeepTech.jpg",
      title: "TECHNOLOGY DUE DILIGENCE",
      description:
        "Remote CTO independently evaluates the technology behind a product or business. We examine architecture, code quality, scalability, security risks and engineering capability to uncover hidden liabilities, assess readiness and help founders, investors and acquirers make informed decisions.",
      leadHighlight: {
        text: "A working product tells only part of the story. We examine the foundations that determine how reliably it operates, how easily it evolves and what it may cost to grow.",
      },
      points: [
        {
          title: "Architecture & Scalability",
          description:
            "Can the technology support the next stage of growth? We assess system design, performance constraints and infrastructure dependencies.",
          icon: Layers,
        },
        {
          title: "Code Quality & Technical Debt",
          description:
            "Identify shortcuts, maintenance challenges and dependencies that could make future development slower or more expensive.",
          icon: Code2,
        },
        {
          title: "Security & Data Risk",
          description:
            "Review access controls, data handling and security practices to identify material risks and areas requiring deeper investigation.",
          icon: ShieldAlert,
        },
        {
          title: "Engineering Capability & Continuity",
          description:
            "Assess delivery practices, documentation and reliance on key individuals or external vendors.",
          icon: Users,
        },
        {
          title: "Technology Ownership & Dependencies",
          description:
            "Examine software licensing, third-party components and ownership documentation to flag issues requiring legal review.",
          icon: FileCheck,
        },
        {
          title: "Findings That Support Decisions",
          description:
            "Receive a clear assessment of material risks, recommended actions and likely investment needs—with priorities your leadership team can act on.",
          icon: CheckCircle2,
        },
      ],
      conclusion:
        "Before an investment, acquisition or major commitment—get an independent technology perspective.",
    },
    {
      image: "/images/FractionalCTO.jpg",
      title: "ADVISORY AND STRATEGIC TECHNOLOGY LEADERSHIP",
      description:
        "Our Advisory & Strategic Technology Leadership services provide expert guidance on technology adoption, digital transformation, and enterprise architecture. We help organizations align technology with business goals, optimize IT investments, and stay ahead of the competition. Whether you need Fractional CTO services, AI strategy consulting, or digital roadmap planning, we bring deep technical expertise and strategic foresight to fuel your success.",
      leadHighlight: {
        text: "Remote CTO provides businesses with on-demand technology leadership, strategic guidance, and scalable IT infrastructure solutions tailored to meet the unique needs of your organization.",
      },
      points: [
        {
          title: "On-Demand Tech Leadership",
          description:
            "Flexible, high-level technology leadership tailored to your business needs, providing strategic guidance without full-time commitment.",
          icon: Briefcase,
        },
        {
          title: "Digital Strategy Development",
          description:
            "Comprehensive technology roadmap creation, helping businesses navigate digital transformation with targeted, actionable strategies.",
          icon: PieChart,
        },
        {
          title: "Cost-Effective Tech Solutions",
          description:
            "Optimized technology investments that maximize value, reduce overhead, and align technical resources with business objectives.",
          icon: DollarSign,
        },
        {
          title: "Vendor and Project Management",
          description:
            "Expert oversight of technology vendors and project lifecycles, ensuring efficient execution and alignment with business goals.",
          icon: Code,
        },
        {
          title: "Team Hiring and Leadership",
          description:
            "Strategic talent acquisition and team development, fostering a high-performance technology workforce aligned with your vision.",
          icon: Users,
        },
      ],
      conclusion:
        "Align technology with business goals, optimize IT investments, and stay ahead of the competition.",
    },
    {
      image: "/images/Emerging.jpg",
      title: "PRODUCT DISCOVERY & TECHNOLOGY DESIGN",
      tagline: "Turn an idea into a product worth building.",
      description:
        "Turn an idea into a product worth building. Remote CTO helps businesses shape technology product ideas into clear, feasible development plans. We explore the problem, define the essential capabilities, assess technology options and design the architecture—giving your team a stronger foundation before development begins.",
      leadHighlight: {
        headline: "Clarity Before Code.",
        text: "Early product decisions shape development cost, delivery time and future flexibility. We help you resolve the critical questions before they become expensive changes.",
      },
      points: [
        {
          title: "Problem & Product Discovery",
          description:
            "Clarify who the product serves, the problem it addresses and the assumptions that need testing.",
          icon: Search,
        },
        {
          title: "Technology Research & Feasibility",
          description:
            "Investigate technology options, integration needs and practical constraints to assess what is achievable.",
          icon: Cpu,
        },
        {
          title: "Build, Buy or Integrate",
          description:
            "Determine where custom development adds value and where existing platforms can save time and investment.",
          icon: Boxes,
        },
        {
          title: "MVP Scope & Priorities",
          description:
            "Define the first useful version of the product, with essential features, success measures and a clear path for evolution.",
          icon: Target,
        },
        {
          title: "Solution Architecture & Technology Design",
          description:
            "Design the system structure, data flows, APIs and integrations with security, reliability and future growth in mind.",
          icon: Network,
        },
        {
          title: "A Blueprint for Development",
          description:
            "Bring together requirements, architecture, dependencies and delivery priorities so your internal team or development partner can proceed with clarity.",
          icon: FileText,
        },
      ],
      conclusion:
        "Bring us the idea. Leave with a clearer product direction and a practical technology blueprint.",
    },
  ];

  const handleTalkToUs = () => {
    setActiveModal(null);
    if (typeof window !== "undefined") {
      const contactElem = document.getElementById("contact");
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/#contact";
      }
    }
  };

  const currentService = activeModal !== null ? services[activeModal] : null;

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-gray-100 py-16 font-mono"
      >
        <div className="container mx-auto px-4">
          <motion.h1
            variants={titleVariants}
            className="text-center text-4xl md:text-5xl font-extrabold mb-12 text-[#061BB0] tracking-tight font-mono"
          >
            What We Offer
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <button
                        type="button"
                        onClick={() => setActiveModal(index)}
                        className="group relative block w-full"
                        aria-label={`Know more about ${service.title}`}
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center bg-[#061BB0] text-white py-2 rounded-lg hover:bg-blue-800 transition-colors duration-300 ease-in-out cursor-pointer"
                        >
                          <span className="mr-2">Know More</span>
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
                      </button>
                    </CoolMode>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Modal with Service Details & Bullet Points */}
      <AnimatePresence>
        {currentService && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative text-white font-mono shadow-2xl my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-all z-10"
                aria-label="Close modal"
              >
                <X size={28} />
              </button>

              {/* Header */}
              <div className="mb-8 pr-8">
                {currentService.tagline && (
                  <span className="inline-block text-blue-400 font-bold uppercase tracking-wider text-xs sm:text-sm mb-2">
                    {currentService.tagline}
                  </span>
                )}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                  {currentService.title}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                  {currentService.description}
                </p>

                {currentService.leadHighlight && (
                  <div className="bg-blue-950/60 border border-blue-500/40 rounded-xl p-4 sm:p-5 text-blue-200">
                    {currentService.leadHighlight.headline && (
                      <p className="font-bold text-white text-base sm:text-lg mb-1">
                        {currentService.leadHighlight.headline}
                      </p>
                    )}
                    <p className="text-sm sm:text-base leading-relaxed">
                      {currentService.leadHighlight.text}
                    </p>
                  </div>
                )}
              </div>

              {/* Bullet Points Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
                {currentService.points.map((point, idx) => {
                  const PointIcon = point.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white/10 hover:bg-white/15 p-5 rounded-xl border border-gray-800 transition-all"
                    >
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-500/20 rounded-lg p-2 mr-3 flex items-center justify-center min-w-[36px]">
                          <span className="text-blue-400 font-bold text-base">
                            {idx + 1}.
                          </span>
                        </div>
                        <PointIcon
                          size={28}
                          className="mr-3 text-blue-400 flex-shrink-0"
                        />
                        <h3 className="font-semibold text-white text-sm sm:text-base">
                          {point.title}
                        </h3>
                      </div>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed pl-12">
                        {point.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Concluding Box */}
              <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border border-blue-500/40 rounded-xl p-5 text-center mb-8">
                <p className="text-sm sm:text-lg font-semibold text-blue-100">
                  {currentService.conclusion}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
                <CoolMode>
                  <button
                    onClick={handleTalkToUs}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                  >
                    <Send size={20} />
                    Talk To Us
                  </button>
                </CoolMode>
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-3 rounded-xl border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 transition-colors w-full sm:w-auto"
                >
                  Close
                </button>
              </div>

              {/* Footer Note */}
              <div className="text-center pt-6 border-t border-gray-800 text-xs text-gray-400">
                Remote CTO - A division of Parallel Ventures
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatWeOffer;
