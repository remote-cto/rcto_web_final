import React from "react";

const ManagedIT = () => {
  return (
    <div>
      <div className="max-w-5xl mx-auto mt-2 p-5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg shadow-lg mb-10">
        <h1 className=" text-xl lg:text-4xl text-white mb-4">
          Managed IT Services{" "}
        </h1>
        <p className="text-white mb-5">
          Our stellar Managed IT Services are designed to provide comprehensive,
          proactive support for all your IT needs, allowing your business to
          thrive without the burden of managing complex technology in-house.
          Some of our services include :
        </p>
        <ul className="list-none ">
          {[
            "Holistic IT Infrastructure Management",
            "Data Protection, Security and Disaster Recovery",
            "Compliance Management",
            "Network and IT security Management",
            "IT Asset Management",
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
};

export default ManagedIT;
