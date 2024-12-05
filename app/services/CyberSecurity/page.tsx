"use client";
import React, { useState } from "react";
import {
  Shield,
  CheckCircle,
  Lock,
  BarChart,
  AlertTriangle,
  BookOpen,
  ArrowLeft,
} from "lucide-react";

const Page = () => {
  const [activeService, setActiveService] = useState<number | null>(null);

  const services = [
    {
      text: "Security Audits",
      icon: Shield,
      description:
        "Comprehensive analysis of your current security infrastructure to identify potential vulnerabilities.",
    },
    {
      text: "Vulnerability Assessments",
      icon: BarChart,
      description:
        "Detailed evaluation of your systems to proactively detect and address potential security weaknesses.",
    },
    {
      text: "Robust end point protection against Malware and other threats",
      icon: Lock,
      description:
        "Advanced protection strategies to shield your endpoints from sophisticated cyber threats.",
    },
    {
      text: "Data Encryption Services",
      icon: Lock,
      description:
        "State-of-the-art encryption solutions to protect your most sensitive business data.",
    },
    {
      text: "Incident Response Advisory Services",
      icon: AlertTriangle,
      description:
        "Rapid and strategic response team to mitigate and manage potential security breaches.",
    },
    {
      text: "Cyber Security Training to Business",
      icon: BookOpen,
      description:
        "Comprehensive training programs to build a culture of security awareness within your organization.",
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
              <h1 className="text-xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Cyber Security Solutions
              </h1>
              <p className="text-base lg:text-xl text-gray-200 mb-6">
                Remote CTO provides cutting-edge cybersecurity services designed
                to fortify your digital ecosystem against evolving threats.
              </p>
            </div>
            <div className="md:w-1/3 hidden md:block">
              <Shield size={200} className="text-blue-400 opacity-30" />
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