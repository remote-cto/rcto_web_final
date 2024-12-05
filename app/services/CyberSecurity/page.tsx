import React from 'react';

const Page = () => {
  return (
    <div>
        <div className="max-w-5xl mx-auto mt-2 p-5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg shadow-lg mb-10">
        <h1 className=" text-xl lg:text-4xl text-white mb-4">
          Cyber Security Solutions{" "}
        </h1>
        <p className="text-white mb-5">
          Remote CTO offers comprehensive cybersecurity services designed to
          protect businesses from evolving digital threats. Some of our Services
          include
        </p>
        <ul className="list-none ">
          {[
            "Security Audits",
            "Vulnerability Assessments",
            "Robust end point protection against Malware and other threats",
            "Data Encryption Services",
            "Incident Response Advisory Services",
            "Cyber Security Training to Business",
          ].map((text, index) => (
            <li
              className="flex items-start transition-transform transform  hover:bg-black hover:shadow-md p-2 rounded-md"
              key={index}
            >
              <svg
                className="w-8 h-8 text-[#f3f8f8] font-bold flex-shrink-0 mr-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-[#f2f6f6] sm:text-lg md:text-xl font-semibold leading-relaxed">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
}

export default Page;
