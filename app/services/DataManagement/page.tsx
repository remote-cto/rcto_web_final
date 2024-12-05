"use client";
import React, { useState } from "react";
import {
  Database,
  BarChart2,
  Shield,
  BookOpen,
  CheckCircle,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";

const Page = () => {
  const [activeService, setActiveService] = useState<number | null>(null);

  const services = [
    {
      text: "Data Processing",
      icon: Database,
      description:
        "Advanced data transformation and cleansing techniques to convert raw data into actionable insights.",
    },
    {
      text: "Data Storage Solutions",
      icon: Shield,
      description:
        "Secure and scalable cloud and on-premise storage solutions designed to protect and optimize your data infrastructure.",
    },
    {
      text: "Data Analysis and Visualization",
      icon: BarChart2,
      description:
        "Comprehensive data analytics services that transform complex data into clear, actionable visual narratives.",
    },
    {
      text: "Data Compliance and Governance",
      icon: CheckCircle,
      description:
        "Robust frameworks to ensure your data management practices meet industry standards and regulatory requirements.",
    },
    {
      text: "Data Advisory Services",
      icon: TrendingUp,
      description:
        "Strategic consulting to help you leverage data as a critical business asset and drive informed decision-making.",
    },
    {
      text: "AI Model Training",
      icon: BookOpen,
      description:
        "Comprehensive AI model development and training services to unlock the predictive power of your data.",
    },
  ];

  const handleBack = () => {
    history.back()
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-mono">
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
                Data Management Solutions
              </h1>
              <p className="text-base lg:text-xl text-gray-200 mb-6">
                Remote CTO provides comprehensive data management services to transform your data into a strategic business asset.
              </p>
            </div>
            <div className="md:w-1/3 hidden md:block">
              <Database size={200} className="text-blue-400 opacity-30" />
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
                       text-base lg:text-xl font-semibold
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