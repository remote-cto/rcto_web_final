import React from "react";
import Image from "next/image";
import Link from "next/link";

const FounderPage = () => {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-screen-xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-10">
          <div className="w-full sm:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105">
              {/* Using a fixed height with responsive width instead of aspect-square */}
              <div className="w-full h-96 sm:h-80 md:h-96 lg:h-112 relative">
                <Image
                  src="/images/Founder.png"
                  alt="Nitesh Shetty"
                  fill
                  sizes="(max-width: 640px) 100vw, 70vw"
                  className="object-contain" /* Changed from object-cover to object-contain */
                  priority
                />
              </div>
            </div>
          </div>

          <div className="w-full sm:w-1/2 sm:pl-10">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-6 leading-tight font-mono">
              About Our Founder
            </h2>

            <div className="space-y-5 text-blue-900 text-base leading-relaxed font-mono">
              <p>
                <strong>Nitesh Shetty</strong> is a Tech Entrepreneur and
                Algorithmist with over 25+ years of global experience. He has a
                keen interest in Deep Technologies, Artificial Intelligence,
                Cyber Security, and Quantum Computing.
              </p>

              <p>
                Known as a visionary tech entrepreneur, seasoned consultant, and
                accomplished engineer, Nitesh is celebrated for pioneering
                impactful technological solutions. His expertise lies in
                transforming businesses through cutting-edge innovations and
                aligning advanced technologies with business strategy.
              </p>

              <p>
                He is the founder of{" "}
                <Link
                  href="https://www.trcelabs.com"
                  target="_blank"
                  className="hover:underline text-blue-700 font-medium"
                >
                  Trcelabs
                </Link>{" "}
                (Cyber Security & Digital Forensics),{" "}
                <Link
                  href="https://www.xworks.live"
                  target="_blank"
                  className="hover:underline text-blue-700 font-medium"
                >
                  XWORKS
                </Link>{" "}
                (Emerging Tech Skilling), and{" "}
                <span className="font-medium text-blue-700">Aiofy</span> (AI
                Consulting & Agentic AI Solutions).
              </p>

              <p>
                Nitesh is also an author of the book{" "}
                <span className="italic">sQope</span> on Quantum Computing,
                available on{" "}
                Amazon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderPage;