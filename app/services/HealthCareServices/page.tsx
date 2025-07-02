"use client"
import React, { useState } from "react";
import {
  Activity,
  Brain,
  Shield,
  Cpu,
  TrendingUp,
  Eye,
  ArrowLeft,
  Send,
} from "lucide-react";

const Page = () => {
  const [activeService, setActiveService] = useState<number | null>(null);


  const services = [
    {
      text: "AI Strategy & Planning",
      icon: Brain,
      description:
        "Development of tailored AI roadmaps and ROI-focused business cases to align technology with clinical priorities and health system goals.",
    },
    {
      text: "Clinical AI Integration",
      icon: Activity,
      description:
        "Seamless embedding of AI tools into existing clinical workflows, ensuring adoption without disrupting the care continuum.",
    },
    {
      text: "Healthcare Data Governance",
      icon: Shield,
      description:
        "Creation of robust frameworks for data quality, privacy, compliance (HIPAA/GDPR), and interoperability across systems.",
    },
    {
      text: "Custom Machine Learning Models",
      icon: Cpu,
      description:
        "Design and deployment of domain-specific AI models for diagnosis, triage, risk scoring, and clinical decision support.",
    },
    {
      text: "Predictive & Population Health Analytics",
      icon: TrendingUp,
      description:
        "Development of AI-driven insights for proactive care planning, chronic disease management, and hospital resource optimization.",
    },
    {
      text: "Medical Imaging AI Solutions",
      icon: Eye,
      description:
        "Implementation of computer vision models for radiology, pathology, and other diagnostic imaging workflows, enhancing speed and accuracy.",
    },
  ];

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history) {
      window.history.back();
    }
  };

  const handleContactUs = () => {
    console.log('Navigate to contact page');
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-6xl mx-auto bg-black rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 sm:p-10 relative">
          <button 
            onClick={handleBack}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-300 hover:scale-110 transform"
            aria-label="Go back"
          >
            <ArrowLeft size={32} />
          </button>

          <div className="flex flex-col md:flex-row items-center mb-10">
            <div className="md:w-2/3 pr-8">
              <h1 className="text-xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Healthcare AI Solutions
              </h1>
              <p className="text-base lg:text-xl text-gray-200 mb-6">
                Transforming healthcare delivery through intelligent AI integration, advanced analytics, and clinical workflow optimization for better patient outcomes.
              </p>
             
            </div>
            <div className="md:w-1/3 hidden md:block">
              <Activity size={200} className="text-blue-400 opacity-30" />
            </div>
          </div>

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
                  {activeService === index && (
                    <div className="pl-16 animate-in slide-in-from-top-2 duration-300">
                      <p className="text-gray-300 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center pt-6">
            <button 
              onClick={handleContactUs}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <Send size={24} />
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;