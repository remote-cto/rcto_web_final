import React, { useState, useEffect, useRef, TouchEvent } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Star } from "lucide-react";

interface SuccessStory {
  industry: string;
  title: string;
  client: string;
  challenge: string[];
  solution: string;
  solutionPoints: string[];
  results: string[];
}

const SuccessStories: React.FC = () => {
  const stories = [
    {
      industry: "F&B INDUSTRY",
      title: "AI-POWERED DEMAND FORECASTING INCREASED REVENUE BY 28%",
      client:
        "A QSR (Quick Service Restaurant) chain with outlets across India",
      challenge: [
        "Struggling with food wastage exceeding 20% of daily inventory",
        "Inconsistent demand prediction leading to stockouts during peak hours",
        "Inefficient supply chain causing delays in restocking",
      ],
      solution:
        "Implementation of an AI-driven demand forecasting system integrated with POS (Point of Sale) data, weather trends and local events to optimize inventory management. Our solution included:",
      solutionPoints: [
        "Machine Learning Algorithms predicting customer footfall with 94% accuracy",
        "Automated Supply Chain Optimization ensuring real-time inventory restocking",
        "Dynamic Pricing Model to maximize sales during peak and off-peak hours",
      ],
      results: [
        "28% revenue increase in six months",
        "Reduced food wastage from 20% to 5%",
        "20% faster order fulfillment, improving customer experience",
      ],
    },
    {
      industry: "REAL ESTATE",
      title:
        "GEN AI AUTOMATED 70% OF LEAD ENGAGEMENT, BOOSTING CONVERSIONS BY 40%",
      client: "A real estate firm managing multi million dollars in assets",
      challenge: [
        "High lead drop-off rate—75% of inquiries went cold",
        "Manual follow-ups delayed conversions",
        "Poor buyer experience—lack of instant information",
      ],
      solution:
        "Building a Conversational AI Agent powered by Gen AI that automated customer engagement and optimized property recommendations.",
      solutionPoints: [
        "AI-Powered Virtual Sales Assistant: Engaged leads via WhatsApp, website chat, and email 24/7",
        "Smart Property Matching: AI analyzed buyer preferences & financial eligibility to suggest the best properties",
        "Auto-Generated Property Descriptions & Sales Pitches: AI customized content for different buyer personas",
      ],
      results: [
        "40% increase in lead-to-sale conversions",
        "70% reduction in manual follow-ups, improving team efficiency",
        "Faster sales cycles—deals closed 30% quicker",
      ],
    },
    {
      industry: "FINTECH",
      title: "CYBERSECURITY & AI PREVENTED FRAUD LOSSES",
      client:
        "A fast-growing FinTech firm handling more than 30M USD in annual transactions",
      challenge: [
        "Increasing digital fraud attempts and high number of fraudulent transactions flagged in a quarter",
        "Regulatory non-compliance risks leading to potential penalties",
        "Poor fraud detection response times causing customer trust issues",
      ],
      solution:
        "Deployment of an AI-powered Fraud Detection System that leverages real-time transaction monitoring, deep behavioral analytics, and blockchain-based security layers.",
      solutionPoints: [
        "AI-driven anomaly detection, flagging fraudulent transactions in milliseconds",
        "Biometric & Multi-Factor Authentication (MFA) for enhanced user security",
        "Automated Compliance Monitoring, reducing manual audits by 70%",
      ],
      results: [
        "Fraud losses reduced by 90%, preventing huge potential damages",
        "85% faster fraud detection response (from minutes to milliseconds)",
        "Faster sales cycles—deals closed 30% quicker",
      ],
    },
    {
      industry: "HEALTHCARE",
      title: "SECURING PATIENT DATA WITH ZERO-TRUST ARCHITECTURE",
      client:
        "A hospital chain with multiple locations across country & 1M+ patient records",
      challenge: [
        "Ransomware attacks on healthcare systems increasing",
        "Unauthorized access to sensitive patient data",
        "Strict compliance requirements",
      ],
      solution:
        "Design of a Zero-Trust Security Model that ensures every user, device, and system is verified at every step.",
      solutionPoints: [
        "AI-Powered Access Control: Role-based access based on real-time identity verification",
        "Data Encryption & Tokenization: Ensured patient records were encrypted at all times",
        "Continuous Monitoring & Anomaly Detection: AI flagged unusual access attempts instantly",
      ],
      results: [
        "100% compliance with regulations and compliances",
        "Zero successful ransomware attacks post-implementation",
        "Unauthorized access attempts reduced by 85%",
      ],
    },
    {
      industry: "RETAIL",
      title: "AI-POWERED DEMAND FORECASTING BOOSTED REVENUE BY 35%",
      client: "A retail brand with 500+ stores",
      challenge: [
        "Stockouts & overstock issues leading to huge money in lost sales annually",
        "Poor demand forecasting—only 60% accurate",
        "Inventory costs were skyrocketing",
      ],
      solution:
        "Implementation of a real-time AI-powered analytics dashboard that combines historical sales, weather patterns, and local events for precise demand forecasting.",
      solutionPoints: [
        "AI-Driven Demand Prediction: Improved forecasting accuracy from 60% to 92%",
        "Automated Inventory Optimization: AI recommended restocking levels dynamically",
        "Live Sales Dashboard: Provided real-time store performance insights",
      ],
      results: [
        "35% revenue growth in one year",
        "Stockouts reduced by 80%",
        "20% of the total revenue, saved annually in inventory costs",
      ],
    },
    {
      industry: "MANUFACTURING",
      title: "AI READINESS & DIGITAL ROADMAP FOR PREDICTIVE MAINTENANCE",
      client: "A heavy equipment manufacturer with $10M+ annual revenue",
      challenge: [
        "Frequent unplanned equipment failures caused HUGE annual losses",
        "No clear digital transformation strategy for predictive maintenance",
        "Limited internal AI expertise to transition from manual to AI-based solutions",
      ],
      solution:
        "Assessment of current IT & operational landscape to identify gaps.",
      solutionPoints: [
        "Designing a step-by-step AI readiness roadmap for predictive maintenance",
        "Provided cost-benefit analysis & ROI projections for AI-driven maintenance",
        "Recommended optimal tech stack & implementation partners",
      ],
      results: [
        "Projected 50% reduction in downtime through AI-driven maintenance",
        "Estimated the cost savings annually post full AI adoption",
        "Defined clear 2-year roadmap for AI integration in operations",
      ],
    },
    {
      industry: "CLIMATE TECH",
      title: "ENERGY OPTIMIZATION STRATEGY TO REDUCE CARBON FOOTPRINT",
      client: "A renewable energy company managing 500+ solar & wind farms",
      challenge: [
        "High energy wastage due to inefficient grid integration",
        "No predictive analytics for optimal energy distribution",
        "Difficulty in aligning with global carbon neutrality goals",
      ],
      solution:
        "Analysis of energy consumption & grid inefficiencies using historical data.",
      solutionPoints: [
        "Development of an AI-driven forecasting model to optimize power distribution",
        "Creating a roadmap for gradual transition to AI-enabled energy dispatching",
        "Providing cost-benefit analysis for automation & smart contracts integration",
      ],
      results: [
        "A 40% reduction in carbon emissions through efficiency measures",
        "Estimated 30% increase in power utilization efficiency",
        "Defined a 3-year transition plan with structured investment milestones",
      ],
    },
    {
      industry: "ASSET MANAGEMENT & FAMILY FUNDS",
      title: "CLOUD AUTOMATION CUT IT COSTS BY 45%",
      client: "A family office managing $10M+ fund in assets",
      challenge: [
        "Legacy IT infrastructure caused security vulnerabilities",
        "Data silos made portfolio management inefficient",
        "Compliance with financial regulations was manual & time-consuming",
      ],
      solution:
        "Migration of IT infrastructure to a secure, cloud-based system, managed by tech team.",
      solutionPoints: [
        "Implementation of AI-powered portfolio risk analysis",
        "Automated regulatory compliance reporting using AI & RPA",
      ],
      results: [
        "45% reduction in IT operational costs",
        "Zero security breaches post-implementation",
        "Compliance reporting time reduced from 2 weeks to 3 hours",
      ],
    },
    {
      industry: "MANUFACTURING",
      title: "AI-POWERED IT SUPPORT INCREASED PRODUCTIVITY BY 60%",
      client:
        "A industrial equipment manufacturer with upwards of $10M+ annual revenue",
      challenge: [
        "IT issues took days to resolve, impacting factory productivity",
        "No centralized IT help desk for support",
        "High cost of maintaining in-house IT support teams",
      ],
      solution: "Deployment of AI-powered IT help desk automation.",
      solutionPoints: [
        "Implemented a cloud-based IT asset management system",
        "Provided 24/7 remote IT support & monitoring",
      ],
      results: [
        "60% increase in factory productivity",
        "IT issue resolution time reduced from 48 hours to 4 hours",
        "TREMENDOUS annual savings in IT operational costs",
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("challenge");
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 15000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = (): void => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? stories.length - 1 : prevIndex - 1
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === stories.length - 1 ? 0 : prevIndex + 1
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToSlide = (index: number): void => {
    if (isAnimating || index === currentIndex) return;

    setIsAnimating(true);
    setCurrentIndex(index);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>): void => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>): void => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      handleNext();
    }

    if (touchStart - touchEnd < -100) {
      // Swipe right
      handlePrev();
    }
  };

  const getAccentColor = (industry: string): string => {
    const colorMap: Record<string, string> = {
      "F&B INDUSTRY": "text-blue-600 border-blue-600",
      "REAL ESTATE": "text-blue-700 border-blue-700",
      FINTECH: "text-blue-800 border-blue-800",
      HEALTHCARE: "text-blue-600 border-blue-600",
      RETAIL: "text-blue-700 border-blue-700",
      MANUFACTURING: "text-blue-800 border-blue-800",
      "CLIMATE TECH": "text-blue-600 border-blue-600",
      "ASSET MANAGEMENT & FAMILY FUNDS": "text-blue-700 border-blue-700",
    };

    return colorMap[industry] || "text-blue-600 border-blue-600";
  };

  // Get background accent color
  const getBgAccentColor = (industry: string): string => {
    const colorMap: Record<string, string> = {
      "F&B INDUSTRY": "bg-blue-600",
      "REAL ESTATE": "bg-blue-700",
      FINTECH: "bg-blue-800",
      HEALTHCARE: "bg-blue-600",
      RETAIL: "bg-blue-700",
      MANUFACTURING: "bg-blue-800",
      "CLIMATE TECH": "bg-blue-600",
      "ASSET MANAGEMENT & FAMILY FUNDS": "bg-blue-700",
    };

    return colorMap[industry] || "bg-blue-600";
  };

  return (
    <div className="w-full bg-white py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-2 text-[#061BB0] tracking-tight font-mono">
            Success Stories
          </h2>
          <p className="text-blue-600 text-lg max-w-2xl mx-auto font-mono">
            Discover how our AI solutions have transformed businesses across
            industries
          </p>
        </div>

        <div
          className="relative overflow-hidden"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Industry quick filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Array.from(new Set(stories.map((story) => story.industry))).map(
              (industry, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const index = stories.findIndex(
                      (story) => story.industry === industry
                    );
                    if (index !== -1) goToSlide(index);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md font-mono ${
                    stories[currentIndex].industry === industry
                      ? `${getBgAccentColor(industry)} text-white shadow-lg`
                      : "bg-white text-blue-800 border border-blue-300 hover:border-blue-500 font-mono"
                  }`}
                >
                  {industry}
                </button>
              )
            )}
          </div>

          <div className="relative">
            <div
              className={`transition-all duration-500 ease-in-out ${
                isAnimating ? "opacity-90 scale-98" : "opacity-100 scale-100"
              }`}
            >
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-blue-100">
                <div
                  className={`${getBgAccentColor(
                    stories[currentIndex].industry
                  )} py-6 px-8`}
                >
                  <div className="text-white">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-sm bg-white/20 px-3 py-1 rounded-full font-mono">
                        {stories[currentIndex].industry}
                      </p>
                      <div className="hidden sm:flex items-center gap-1">
                        <Star size={16} fill="white" />
                        <Star size={16} fill="white" />
                        <Star size={16} fill="white" />
                        <Star size={16} fill="white" />
                        <Star size={16} fillOpacity={0.5} fill="white" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mt-3 font-mono">
                      {stories[currentIndex].title}
                    </h3>
                    <p className="mt-2 opacity-90 font-mono">
                      {stories[currentIndex].client}
                    </p>
                  </div>
                </div>

                <div className="border-b border-blue-100">
                  <div className="flex overflow-x-auto">
                    <button
                      onClick={() => setActiveTab("challenge")}
                      className={`px-6 py-4 font-medium text-sm transition-all font-mono ${
                        activeTab === "challenge"
                          ? "border-b-2 border-blue-600 text-blue-800"
                          : "text-blue-400 hover:text-blue-600"
                      }`}
                    >
                      Challenge
                    </button>
                    <button
                      onClick={() => setActiveTab("solution")}
                      className={`px-6 py-4 font-medium text-sm transition-all ${
                        activeTab === "solution"
                          ? "border-b-2 border-blue-600 text-blue-800"
                          : "text-blue-400 hover:text-blue-600"
                      }`}
                    >
                      Solution
                    </button>
                    <button
                      onClick={() => setActiveTab("results")}
                      className={`px-6 py-4 font-medium text-sm transition-all font-mono ${
                        activeTab === "results"
                          ? "border-b-2 border-blue-600 text-blue-800"
                          : "text-blue-400 hover:text-blue-600"
                      }`}
                    >
                      Results
                    </button>
                  </div>
                </div>

                <div className="p-8">
                  {activeTab === "challenge" && (
                    <div className="min-h-64">
                      <h4 className="text-xl font-semibold mb-4 text-blue-800 flex items-center font-mono">
                        The Challenge
                        <div
                          className={`ml-3 h-1 w-16 font-mono ${getBgAccentColor(
                            stories[currentIndex].industry
                          )}`}
                        ></div>
                      </h4>
                      <ul className="space-y-3">
                        {stories[currentIndex].challenge.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <div
                              className={`mt-1 mr-3 flex-shrink-0 h-5 w-5 rounded-full ${getBgAccentColor(
                                stories[currentIndex].industry
                              )} flex items-center justify-center`}
                            >
                              <span className="text-white text-xs font-bold font-mono">
                                {idx + 1}
                              </span>
                            </div>
                            <p className="text-blue-900 font-mono">{item}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === "solution" && (
                    <div className="min-h-64 font-mono">
                      <h4 className="text-xl font-semibold mb-4 text-blue-800 flex items-center">
                        Our Solution
                        <div
                          className={`ml-3 h-1 w-16 ${getBgAccentColor(
                            stories[currentIndex].industry
                          )}`}
                        ></div>
                      </h4>
                      <p className="text-blue-900 mb-4">
                        {stories[currentIndex].solution}
                      </p>
                      <ul className="space-y-3 mt-4">
                        {stories[currentIndex].solutionPoints.map(
                          (item, idx) => (
                            <li key={idx} className="flex items-start">
                              <div
                                className={`mt-1 mr-3 flex-shrink-0 h-5 w-5 rounded-full ${getBgAccentColor(
                                  stories[currentIndex].industry
                                )} flex items-center justify-center`}
                              >
                                <ArrowRight size={12} className="text-white" />
                              </div>
                              <p className="text-blue-900">{item}</p>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {activeTab === "results" && (
                    <div className="min-h-64 font-mono">
                      <h4 className="text-xl font-semibold mb-4 text-blue-800 flex items-center">
                        The Results
                        <div
                          className={`ml-3 h-1 w-16 ${getBgAccentColor(
                            stories[currentIndex].industry
                          )}`}
                        ></div>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {stories[currentIndex].results.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-blue-50 p-5 rounded-lg border border-blue-100 hover:shadow-md transition-shadow"
                          >
                            <p className="text-blue-800 font-medium text-center">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* 
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-1 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 focus:outline-none border border-blue-100 text-blue-600 transition-all hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button> */}
            {/* 
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 focus:outline-none border border-blue-100 text-blue-600 transition-all hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button> */}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? `w-8 ${getBgAccentColor(stories[currentIndex].industry)}`
                    : "bg-blue-200 hover:bg-blue-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
