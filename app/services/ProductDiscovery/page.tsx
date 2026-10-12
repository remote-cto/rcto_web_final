"use client";
import React, { useState } from "react";
import {
  Search,
  Cpu,
  Boxes,
  Target,
  Network,
  FileText,
  Lightbulb,
  ArrowLeft,
  Send,
} from "lucide-react";
import { CoolMode } from "@/components/ui/cool-mode";
import { useRouter } from "next/navigation";

const Page = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const router = useRouter();

  const services = [
    {
      text: "Problem & Product Discovery",
      icon: Search,
      description:
        "Clarify who the product serves, the problem it addresses and the assumptions that need testing.",
    },
    {
      text: "Technology Research & Feasibility",
      icon: Cpu,
      description:
        "Investigate technology options, integration needs and practical constraints to assess what is achievable.",
    },
    {
      text: "Build, Buy or Integrate",
      icon: Boxes,
      description:
        "Determine where custom development adds value and where existing platforms can save time and investment.",
    },
    {
      text: "MVP Scope & Priorities",
      icon: Target,
      description:
        "Define the first useful version of the product, with essential features, success measures and a clear path for evolution.",
    },
    {
      text: "Solution Architecture & Technology Design",
      icon: Network,
      description:
        "Design the system structure, data flows, APIs and integrations with security, reliability and future growth in mind.",
    },
    {
      text: "A Blueprint for Development",
      icon: FileText,
      description:
        "Bring together requirements, architecture, dependencies and delivery priorities so your internal team or development partner can proceed with clarity.",
    },
  ];

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/");
    }
  };

  const handleContactUs = () => {
    router.push("/contact");
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-6xl mx-auto bg-black rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 sm:p-10 relative">
          <CoolMode>
            <button
              onClick={handleBack}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-300 hover:scale-110 transform"
              aria-label="Go back"
            >
              <ArrowLeft size={32} />
            </button>
          </CoolMode>

          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center mb-10">
            <div className="md:w-2/3 pr-0 md:pr-8">
              <span className="inline-block text-blue-400 font-bold uppercase tracking-wider text-sm mb-2">
                Turn an idea into a product worth building
              </span>
              <h1 className="text-2xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Product Discovery & Technology Design
              </h1>
              <p className="text-base lg:text-xl text-gray-200 mb-6 leading-relaxed">
                Remote CTO helps businesses shape technology product ideas into clear, feasible development plans. We explore the problem, define the essential capabilities, assess technology options and design the architecture—giving your team a stronger foundation before development begins.
              </p>
              <div className="bg-blue-950/60 border border-blue-500/30 rounded-xl p-4 text-blue-200 leading-relaxed">
                <p className="font-bold text-white text-base lg:text-lg mb-1">
                  Clarity Before Code.
                </p>
                <p className="text-sm lg:text-base">
                  Early product decisions shape development cost, delivery time and future flexibility. We help you resolve the critical questions before they become expensive changes.
                </p>
              </div>
            </div>
            <div className="md:w-1/3 hidden md:flex justify-center">
              <Lightbulb size={180} className="text-blue-400 opacity-30" />
            </div>
          </div>

          {/* Grid of Bullet Points */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <div
                  key={index}
                  className={`
                    p-6 rounded-xl transition-all duration-300 cursor-pointer 
                    ${
                      activeService === index
                        ? "bg-blue-600/30 ring-2 ring-blue-500 shadow-lg shadow-blue-500/20"
                        : "bg-white/10 hover:bg-white/20"
                    }
                  `}
                  onClick={() =>
                    setActiveService(activeService === index ? null : index)
                  }
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/20 rounded-lg p-2 mr-4 flex items-center justify-center min-w-[40px]">
                      <span className="text-blue-400 font-bold text-lg">
                        {index + 1}.
                      </span>
                    </div>
                    <ServiceIcon
                      className={`
                        mr-3 flex-shrink-0 transition-colors duration-300
                        ${
                          activeService === index
                            ? "text-blue-400"
                            : "text-gray-400"
                        }
                      `}
                      size={32}
                    />
                    <h3
                      className={`
                      text-base lg:text-lg font-semibold transition-colors duration-300
                      ${
                        activeService === index ? "text-white" : "text-gray-200"
                      }
                    `}
                    >
                      {service.text}
                    </h3>
                  </div>
                  <div className="pl-14">
                    <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Concluding Callout */}
          <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/40 rounded-xl p-6 text-center mb-8">
            <p className="text-base lg:text-xl font-semibold text-blue-100">
              Bring us the idea. Leave with a clearer product direction and a practical technology blueprint.
            </p>
          </div>

          {/* Contact Us Section */}
          <div className="flex justify-center mb-6">
            <CoolMode>
              <button
                onClick={handleContactUs}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <Send size={24} />
                Contact Us
              </button>
            </CoolMode>
          </div>

          {/* Footer Division Note */}
          <footer className="text-center pt-6 border-t border-gray-800 text-xs sm:text-sm text-gray-400">
            Remote CTO - A division of Parallel Ventures
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Page;
