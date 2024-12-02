import Image from "next/image";
import React from "react";

const WhyRemoteCTO = () => {
  return (
    <div>
      <section className="mb-15">
        <div className=" lg:flex lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-2xl">
              <strong className="font-extrabold text-[#061BB0] text-2xl sm:block">
                Why Remote CTO ?
              </strong>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-8 max-w-7xl mx-auto">
        <div className="max-w-sm mx-auto  transition-shadow duration-300 ease-in-out">
            <Image
               src="/images/ManagedIT.jpg"
              alt="Proven Expertise"
              width={400}
              height={400}
              className="w-52 h-48 mx-auto mt-6 "
            />
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-[#061BB0] mb-3">
                <p>Proven Expertise</p>
              </h2>
              <p className="text-[#0c0c0c]">
                Why REMOTE CTO? We excel in providing niche and tailored IT
                solutions, ensuring that your specific needs are met with
                precision and expertise.
              </p>
            </div>
          </div>

          <div className="max-w-sm mx-auto  transition-shadow duration-300 ease-in-out">
            <Image
               src="/images/ManagedIT.jpg"
              alt="Holistic Services"
              width={400}
              height={400}
              className="w-52 h-48 mx-auto mt-6 "
            />
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-[#061BB0] mb-3">
                <p>Holistic Services</p>
              </h2>
              <p className="text-[#0c0c0c]">
                From digital transformation and data management to
                cybersecurity, we offer a full spectrum of services, making us a
                one-stop solution for all your technological needs.
              </p>
            </div>
          </div>

          <div className="max-w-sm mx-auto  transition-shadow duration-300 ease-in-out">
            <Image
               src="/images/ManagedIT.jpg"
              alt="Client-Centric Approach"
              width={400}
              height={400}
              className="w-52 h-48 mx-auto mt-6 "
            />
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-[#061BB0] mb-3">
                <p>Client-Centric Approach</p>
              </h2>
              <p className="text-[#0c0c0c]">
                We partner with startups, businesses, non- profits, and
                investment firms, delivering tailored services that foster
                innovation, growth, and security, while building strong,
                collaborative relationships.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyRemoteCTO;
