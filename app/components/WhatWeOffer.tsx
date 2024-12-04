import Image from "next/image";
import React from "react";
// import { motion } from "framer-motion";

const WhatWeOffer = () => {
  return (
    <div>
      <section className="mt-10 mb-10">
        <div className=" lg:flex lg:items-center">
          <div className="mx-auto max-w-xl text-center">
          <h1 className="text-xl font-extrabold lg:text-5xl">
              <strong className="font-extrabold text-[#061BB0] sm:block font-mono">
                What We Offer
              </strong>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-8 max-w-7xl mx-auto">
          <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <Image
              src="/images/DeepTechResearch.jpg"
              alt="Deep Tech Research, Consulting and Implementation"
              width={400}
              height={400}
              className="w-52 h-48 mx-auto mt-6 "
            />
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-[#061BB0] mb-3">
                <p>Deep Tech Research, Consulting and Implementation</p>
              </h2>
              <p className="text-[#0c0c0c]">
                Our deep tech research and consulting help businesses harness
                advanced technologies to drive innovation and growth. Our
                expertise in deep tech like AI , blockchain, IoT etc ensures
                that IT infrastructure is optimized for speed, security, and
                scalability.
              </p>
            </div>
          </div>

          <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <Image
              src="/images/DataManagement.jpg"
              alt="Data Management"
              width={400}
              height={400}
              className="w-52 h-48 mx-auto mt-6 "
            />
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-[#061BB0] mb-3">
                <p>Data Management</p>
              </h2>
              <p className="text-[#0c0c0c]">
                Our Data management services handle everything accurately from
                simple to complex data Our expertise transforms raw data into
                valuable insights, driving informed decision-making and
                innovation.
              </p>
            </div>
          </div>

          <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <Image
              src="/images/CyberSecurity.jpg"
              alt="Cyber Security Solutions"
              width={400}
              height={400}
              className="w-52 h-48 mx-auto mt-6 "
            />
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-[#061BB0] mb-3">
                <p>Cyber Security Solutions</p>
              </h2>
              <p className="text-[#0c0c0c]">
                Our robust cybersecurity solutions, protects businesses from
                evolving digital threats. Our services ensure the integrity and
                confidentiality of your data, safeguarding your digital assets
                against cyber attacks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-8 max-w-7xl mx-auto">
          <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <Image
              src="/images/ManagedIT.jpg"
              alt="Managed IT Services"
              width={400}
              height={400}
              className="w-52 h-48 mx-auto mt-6 "
            />
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-[#061BB0] mb-3">
                <p>Managed IT Services</p>
              </h2>
              <p className="text-[#0c0c0c]">
                Our Managed IT Services are designed to provide comprehensive,
                proactive support for all your IT needs, allowing your business
                to thrive without the burden of managing complex technology
                in-house
              </p>
            </div>
          </div>

          <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <Image
              src="/images/FractionalCTO.jpg"
              alt="Fractional CTO Services"
              width={400}
              height={400}
              className="w-52 h-48 mx-auto mt-6 "
            />
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-[#061BB0] mb-3">
                <p>Fractional CTO Services</p>
              </h2>
              <p className="text-[#0c0c0c]">
                We provide businesses with on- demand technology leadership
                without the full-time commitment. We offer strategic guidance in
                areas like technology roadmap, digital transformation, and
                scalable IT infrastructure. Our services enable business to
                access top-tier technical expertise for projects on a flexible
                part-time basis .
              </p>
            </div>
          </div>

          <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <Image
              src="/images/Emerging.jpg"
              alt="Emerging Tech Training"
              width={400}
              height={400}
              className="w-52 h-48 mx-auto mt-6 "
            />
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-[#061BB0] mb-3">
                <p>Emerging Tech Training</p>
              </h2>
              <p className="text-[#0c0c0c]">
                We offer hands-on training in cutting- edge technologies. Our
                customized programs are designed to build deep technical
                expertise, in teams to leverage emerging technologies for
                business growth. Whether you're a startup or an established
                enterprise, our training ensures your workforce is future-ready,
                helping you stay competitive and drive digital transformation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatWeOffer;
