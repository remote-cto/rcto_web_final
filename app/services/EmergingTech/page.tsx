"use client";
import React, { useState } from "react";
import {
  Code,
  Brain,
  Book,
  Target,
  Lightbulb,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";

const Page = () => {
  const [activeService, setActiveService] = useState<number | null>(null);

  const services = [
    {
      text: "Hands-on Learning",
      icon: Book,
      description:
        "Immersive, practical training experiences that bridge theoretical knowledge with real-world application and skill development.",
    },
    {
      text: "Expert-Led Sessions",
      icon: Brain,
      description:
        "Interactive training programs led by industry experts and thought leaders, providing deep insights and cutting-edge technological expertise.",
    },
    {
      text: "Customized Programs",
      icon: Target,
      description:
        "Tailored training solutions designed to address specific organizational needs, skill gaps, and technological transformation objectives.",
    },
    {
      text: "Future-Proofing Skills",
      icon: TrendingUp,
      description:
        "Strategic skill development focusing on emerging technologies and forward-looking competencies to ensure long-term professional relevance.",
    },
    {
      text: "Innovation Focus",
      icon: Lightbulb,
      description:
        "Training modules that emphasize creative problem-solving, digital transformation strategies, and innovative technological approaches.",
    },
    {
      text: "Digital Transformation",
      icon: Code,
      description:
        "Comprehensive training programs that guide organizations through technological evolution, enabling seamless digital transformation strategies.",
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
                Emerging Tech Training Services
              </h1>
              <p className="text-base lg:text-xl text-gray-200 mb-6">
                Comprehensive training programs designed to equip businesses and professionals with cutting-edge technological skills and innovative learning strategies.
              </p>
            </div>
            <div className="md:w-1/3 hidden md:block">
              <Brain size={200} className="text-blue-400 opacity-30" />
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