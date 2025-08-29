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
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  const [activeService, setActiveService] = useState<number | null>(null);


  const services = [
    {
      text: "Rapid Talent Deployment",
      icon: Brain,
      description:
        "Access industry-ready professionals who can join and deliver impact at speed.",
    },
    {
      text: "Domain-Specialized Pools",
      icon: Activity,
      description:
        "Pre-vetted experts across AI, Cybersecurity, Data Science, and other deep-tech verticals.",
    },
    {
      text: "Quality Assured Screening",
      icon: Shield,
      description:
        "Multi-layered evaluation of skills, experience, and cultural fit before onboarding.",
    },
    {
      text: "Reduced Hiring Risk",
      icon: Cpu,
      description:
        "Replacement guarantees and transparent processes that safeguard your investment.",
    },
    {
      text: "Scalable Workforce Solutions",
      icon: TrendingUp,
      description:
        "Flexibly expand teams with pre-qualified professionals for projects or long-term roles.",
    },
    {
      text: "Trusted by Remote CTO",
      icon: Eye,
      description:
        "Backed by 25+ years of global deep-tech leadership and proven client trust.",
    },
  ];

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history) {
      window.history.back();
    }
  };

  const handleContactUs = () => {
    router.push('/contact')
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
                Vetta – A division of Remote CTO
              </h1>
              <p className="text-base lg:text-xl text-gray-200 mb-6">
                 Vetta is our dedicated talent ecosystem — a premium pool of pre-vetted professionals across AI, Cybersecurity, Data Science, and other deep-tech domains.</p>
              <p className="text-base lg:text-xl text-gray-200 mb-6">For companies, Vetta means faster, risk-free hiring with professionals ready to deliver from day one. For professionals, Vetta is an ecosystem of growth, credibility, and opportunity, backed by Remote CTO’s 25+ years of deep-tech expertise.</p>
              <p className="text-base lg:text-xl text-gray-200 mb-6">Experience the future of hiring with Vetta.</p>              
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
