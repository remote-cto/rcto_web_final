import Image from "next/image";
import React from "react";

const Revolutionize = () => {
  return (
    <div>
      <div className="max-w-5xl mx-auto mt-2 p-5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg shadow-lg mb-10">
        {/* Image Section */}
        <div className="flex justify-center">
          <Image
            src="/images/design.png" 
            alt="Illustration"
            width={600}
          height={400}
            className="w-48 h-34" 
          />
        </div>
        {/* Headings Section */}
        <h2 className="text-4xl font-bold text-center text-[#eaecf2]">
          Revolutionize your business with REMOTE CTO.
        </h2>
        <h3 className="text-3xl font-bold text-center text-[#eaecf2] mt-10">
          Seamlessly blend data management, cybersecurity, and digital
          transformation for unparalleled success!
        </h3>
      </div>
    </div>
  );
};

export default Revolutionize;
