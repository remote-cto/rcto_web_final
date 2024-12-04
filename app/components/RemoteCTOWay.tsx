import React from "react";
import Image from "next/image";

const RemoteCTOWay = () => {
  return (
    <>
      <section className="mt-2 lg:mt-10">
        <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-xl font-extrabold lg:text-5xl">
              <strong className="font-extrabold text-[#061BB0] sm:block font-mono">
                The REMOTE CTO Way
              </strong>
            </h1>
          </div>
        </div>
      </section>

      <section className="mt-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center">
          <div className="lg:w-1/2 lg:pr-10 text-center lg:text-left">
            <p>
              Remote CTO is a pioneering deep technology consulting and
              implementation company that also offers fractional CTO services to
              businesses of all sizes.
            </p>
            <p className="mt-3">
              Based in Ahmedabad, India's first Heritage City, we pride
              ourselves on our deep tech advisory and digital transformation
              expertise. Our mission is to enable seamless digital
              transformation for businesses of all sizes, ensuring they navigate
              the complexities of the digital landscape with ease.
            </p>
            <p className="mt-3">
              We specialize in deep technology research, consulting, training
              and implementation, helping companies leverage cutting-edge
              innovations in areas like data management, cybersecurity, and AI.
            </p>
            <p className="mt-3 mb-4">
              Remote CTO acts as an on-demand technical partner, guiding
              companies through complex digital transformation journeys without
              the need for a full-time, in-house CTO
            </p>
          </div>

          <div className="lg:w-1/2 mt-6 lg:mt-0">
            <Image
              src="/images/RemoteCTOWay.jpg"
              width={270}
              height={300}
              alt="Image Description"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default RemoteCTOWay;