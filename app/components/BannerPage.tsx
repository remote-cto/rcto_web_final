import React from "react";

const BannerPage = () => {
  return (
    <div className="mt-10 font-mono">
      <section className="bg-gradient-to-r from-indigo-500 to-blue-500 mb-10">
        <h1 className="text-3xl text-white font-extrabold sm:text-3xl px-10 ">Remote CTO</h1>
        <div className="mx-auto  lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl text-white font-extrabold sm:text-8xl">
              Leave the
            </h1>
            <h1 className="text-3xl text-white font-extrabold sm:text-8xl">
              tech to us
            </h1>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2  mb-10 lg:mb-2"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BannerPage;
