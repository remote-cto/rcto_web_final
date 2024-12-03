import React from "react";

const FooterForm = () => {
  return (
    <div>
      <section className="bg-gradient-to-r from-indigo-500 to-blue-500">
      <h2 className="text-4xl  font-bold text-center text-[#eaecf2]">
       Talk To Us
      </h2>
      <p className="text-lg font-bold text-center text-[#f3f3f6] mt-2">Feel free to  reach out to us!</p>
      <p className="text-lg font-bold text-center text-[#f3f3f5] mt-1">You can call, email, schedule a meeting, or simply fill out the form</p>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            
            <div className="lg:col-span-2 lg:py-12">
              <strong className="max-w-xl  text-white  text-lg lg:text-3xl">
               Phone
              </strong>
              <p className="text-xl text-white underline">+91 966-251-2899</p>

              <div className="mt-8">
              <strong className="max-w-xl  text-white  text-lg lg:text-3xl">
               Email
              </strong>
              <p className="text-white text-xl underline">connect@remotecto.in</p>

                
              </div>
              <h1 className="text-lg mt-10 lg:text-4xl text-white underline">Click to schedule ->
                <h2 className="text-lg lg:text-4xl text-white underline">
                a free 30 min call with our
                founder

                </h2>
              </h1>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form action="#" className="space-y-4">
                <div>
                  <label className="sr-only" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Name"
                    type="text"
                    id="name"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Email address"
                      type="email"
                      id="email"
                    />
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Phone Number"
                      type="tel"
                      id="phone"
                    />
                  </div>
                </div>

                

                <div>
                  <label className="sr-only" htmlFor="message">
                    Message
                  </label>

                  <textarea
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Message"
                    rows="8"
                    id="message"
                  ></textarea>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                  >
                    Send Enquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FooterForm;
