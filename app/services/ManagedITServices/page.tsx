
"use client"
import React, { useState } from "react";
import {
  Server,
  Shield,
  Lock,
  BarChart,
  BookOpen,
  Database,
  ArrowLeft,
} from "lucide-react";

const Page = () => {
  const [activeService, setActiveService] = useState<number | null>(null);

  const services = [
    {
      text: "Holistic IT Infrastructure Management",
      icon: Server,
      description:
        "Comprehensive management of your entire IT ecosystem, ensuring optimal performance, scalability, and efficiency across all technological platforms.",
    },
    {
      text: "Data Protection, Security and Disaster Recovery",
      icon: Shield,
      description:
        "Robust strategies to safeguard your critical data, implement advanced security protocols, and develop comprehensive disaster recovery plans to ensure business continuity.",
    },
    {
      text: "Compliance Management",
      icon: Lock,
      description:
        "Expert guidance and implementation of compliance strategies to ensure your IT infrastructure meets industry-specific regulatory requirements and best practices.",
    },
    {
      text: "Network and IT Security Management",
      icon: BarChart,
      description:
        "Advanced network monitoring, threat detection, and security management to protect your organization from evolving cyber risks and potential vulnerabilities.",
    },
    {
      text: "IT Asset Management",
      icon: Database,
      description:
        "Comprehensive tracking, optimization, and lifecycle management of your organization's IT assets to maximize efficiency, reduce costs, and ensure strategic technological investments.",
    },
    {
      text: "Technology Consulting and Strategic Planning",
      icon: BookOpen,
      description:
        "Forward-thinking technological consulting to align your IT strategy with your business goals, driving innovation and competitive advantage.",
    },
  ];

  const handleBack = () => {
    history.back()
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-black rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 sm:p-10 relative">
          {/* Back button positioned in top right */}
          <button 
            onClick={handleBack}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-300"
            aria-label="Go back"
          >
            <ArrowLeft size={32} />
          </button>

          <div className="flex flex-col md:flex-row items-center mb-10">
            <div className="md:w-2/3 pr-8">
              <h1 className="text-xl lg:text-4xl font-bold text-white mb-4 leading-tight font-mono">
                Managed IT Services
              </h1>
              <p className="text-base lg:text-xl text-gray-200 mb-6">
                Remote CTO provides comprehensive, proactive IT management solutions designed to optimize your technological infrastructure and drive business success.
              </p>
            </div>
            <div className="md:w-1/3 hidden md:block">
              <Server size={200} className="text-blue-400 opacity-30" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <div
                  key={index}
                  className={`
                    p-6 rounded-xl transition-all duration-300 cursor-pointer
                    ${
                      activeService === index
                        ? "bg-blue-600/30 ring-2 ring-blue-500"
                        : "bg-white/10 hover:bg-white/20"
                    }
                  `}
                  onClick={() =>
                    setActiveService(activeService === index ? null : index)
                  }
                >
                  <div className="flex items-center mb-4">
                    <ServiceIcon
                      className={`
                        mr-4 flex-shrink-0
                        ${
                          activeService === index
                            ? "text-blue-400"
                            : "text-gray-400"
                        }
                      `}
                      size={40}
                    />
                    <h3
                      className={`
                      text-xl font-semibold
                      ${
                        activeService === index ? "text-white" : "text-gray-200"
                      }
                    `}
                    >
                      {service.text}
                    </h3>
                  </div>
                  {activeService === index && (
                    <p className="text-gray-300 animate-fade-in">
                      {service.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;