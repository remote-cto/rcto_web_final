"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <button
          onClick={() => router.back()}
          className="fixed top-6 right-6 bg-black backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-black/70 transition-all z-10 border border-gray-700"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>

        <div className="space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-white mb-4">
              Our Ventures
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Innovative solutions across cybersecurity, data analytics, and
              artificial intelligence
            </p>
          </div>

          {/* TRCELabs Section */}
          <div className="bg-black backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-xl hover:shadow-2xl transition-all hover:border-blue-400">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-4">
                  TRCELABS – Cybersecurity & Digital Forensics
                </h2>
                <p className="text-gray-300 mb-6">
                  Protect your business from cyber threats with{" "}
                  <strong className="text-white">
                    advanced security solutions, IT security audits, and digital
                    forensic investigations
                  </strong>
                  . From threat intelligence to legal forensics, TRCELABS
                  ensures your digital assets remain secure and resilient.
                </p>
              </div>
              <div className="md:w-48 flex-shrink-0 flex items-start justify-center">
                <a
                  href="https://www.trcelabs.com"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Site
                </a>
              </div>
            </div>
          </div>

          {/* Samruddhi Data Services Section */}
          <div className="bg-black backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-xl hover:shadow-2xl transition-all hover:border-blue-400">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Samruddhi Data Services (SDS) – Smart Data Management &
                  Analytics
                </h2>
                <p className="text-gray-300 mb-6">
                  Unlock the power of data with our end-to-end data management
                  solutions, including Analytics, Data Visualization, Data
                  Engineering, Cloud data strategies, and governance frameworks.{" "}
                  <strong className="text-white">
                    Make data-driven decisions with confidence
                  </strong>
                  . SDS provides scalable solutions for handling, processing,
                  and securing critical business data.
                </p>
              </div>
              <div className="md:w-48 flex-shrink-0 flex items-start justify-center">
                <a
                  href="https://www.sdsinsights.com"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Site
                </a>
              </div>
            </div>
          </div>

          {/* AIofy Section */}
          <div className="bg-black backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-xl hover:shadow-2xl transition-all hover:border-blue-400">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-4">
                  AIofy – Cutting Edge AI Solutions
                </h2>
                <p className="text-gray-300">
                  Harness the future of AI with our cutting-edge AI consulting
                  services, Enterprise LLM & AI Model Training, and Agentic AI
                  solutions. From automation to intelligent decision-making, we
                  empower businesses and drive business growth with AI-driven
                  transformation.
                </p>
              </div>
              <div className="md:w-48 flex-shrink-0 flex items-start justify-center">
                <a
                  href="https://www.aiofy.co/"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Site
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
