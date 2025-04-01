import Image from "next/image";
import React from "react";
import TypingAnimation from "../../components/ui/typing-animation";

const Revolutionize = () => {
  return (
    <div>
      <div className="max-w-5xl mx-auto mt-2 p-5 bg-gray-100 rounded-lg shadow-lg mb-10">
        {/* Image Section */}
        <div className="flex justify-center">
          <Image
            src="/images/Logo.png"
            alt="Illustration"
            width={600}
            height={400}
            className="w-48 h-34"
          />
        </div>

        <TypingAnimation
          className="text-base lg:text-4xl font-bold text-center text-black font-mono"
          text="Revolutionize your business with REMOTE CTO."
        />
        <h3 className=" text-base lg:text-3xl font-bold text-center text-black mt-10 font-mono">
          Seamlessly blend data management, cybersecurity, and digital
          transformation for unparalleled success!
        </h3>
      </div>
    </div>
  );
};

export default Revolutionize;
