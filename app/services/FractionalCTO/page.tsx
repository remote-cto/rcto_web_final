"use client";
import React, { useState } from "react";
import {
  DollarSign,
  Briefcase,
  Users,
  PieChart,
  Code,
  ArrowLeft,
  Send,
} from "lucide-react";
import { CoolMode } from "../../../components/ui/cool-mode";
import { useRouter } from 'next/navigation';

const Page = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const router = useRouter();

  const services = [
    {
      text: "On-Demand Tech Leadership",
      icon: Briefcase,
      description:
        "Flexible, high-level technology leadership tailored to your business needs, providing strategic guidance without full-time commitment.",
    },
    {
      text: "Digital Strategy Development",
      icon: PieChart,
      description:
        "Comprehensive technology roadmap creation, helping businesses navigate digital transformation with targeted, actionable strategies.",
    },
    {
      text: "Cost-Effective Tech Solutions",
      icon: DollarSign,
      description:
        "Optimized technology investments that maximize value, reduce overhead, and align technical resources with business objectives.",
    },
    {
      text: "Vendor and Project Management",
      icon: Code,
      description:
        "Expert oversight of technology vendors and project lifecycles, ensuring efficient execution and alignment with business goals.",
    },
    {
      text: "Team Hiring and Leadership",
      icon: Users,
      description:
        "Strategic talent acquisition and team development, fostering a high-performance technology workforce aligned with your vision.",
    },
  ];

  const handleBack = () => {
    history.back()
  };

  const handleContactUs = () => {
    router.push('/contact');
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-6xl mx-auto bg-black rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 sm:p-10 relative">
          <CoolMode>
          <button 
            onClick={handleBack}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-300"
            aria-label="Go back"
          >
            <ArrowLeft size={32} />
          </button>
          </CoolMode>

          <div className="flex flex-col md:flex-row items-center mb-10">
            <div className="md:w-2/3 pr-8">
              <h1 className="text-xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Fractional CTO Services
              </h1>
              <p className="text-base lg:text-xl text-gray-200 mb-6">
                Remote CTO provides businesses with on-demand technology leadership, strategic guidance, and scalable IT infrastructure solutions tailored to meet the unique needs of your organization.
              </p>
            </div>
            <div className="md:w-1/3 hidden md:block">
              <Briefcase size={200} className="text-blue-400 opacity-30" />
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

          {/* Contact Us Section */}
          <div className="flex justify-center">
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
        </div>
      </div>
    </div>
  );
};

export default Page;