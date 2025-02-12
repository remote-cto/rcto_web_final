import Image from "next/image";
import React from "react";

const WhatClientSay: React.FC = () => {
  const testimonials = [
    {
      text: "Partnering with Remote CTO was the best decision for our organization. Their customized IT solutions and deep tech expertise helped us navigate the complexities of the digital world with ease.",
      author: "AdC Networks",
    },
    {
      text: "Remote CTO played a pivotal role in bringing our vision to life. Their innovative and fantastic Remote CTO services ensured that our startup launched successfully, within budget and securely. We highly recommend their services!",
      author: "Harish Kumar, CEO - CocoPalm",
    },
    {
      text: "Remote CTO's expertise in digital transformation and their exceptional Remote CTO services has given us the confidence to expand our digital presence while keeping our data safe. Exceptional service and support!",
      author: "S Gangadhar, Founder - ModularK",
    },
  ];

  return (
    <section className="bg-[#f5f7ff] py-10 px-4 md:px-16 lg:px-24 font-mono">
      <h2 className="text-xl lg:text-5xl font-bold text-center text-[#0026ff] mb-8 ">
        What Our Clients Say
      </h2>

      <div className="flex justify-center mb-3">
        <Image
          src="/images/ClientSay.png"
          alt="Client testimonial image"
          width={600}
          height={400}
          className="rounded-lg shadow-lg object-cover w-full max-w-[1000px] sx:h-[100px] lg:h-[300px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 shadow-md rounded-md text-[#333] space-y-4"
          >
            <p className="text-sm md:text-base">{testimonial.text}</p>
            <h4 className="text-base md:text-lg font-bold text-[#0026ff]">
              {testimonial.author}
            </h4>
          </div>
        ))}
      </div>

     
      
    </section>
  );
};

export default WhatClientSay;