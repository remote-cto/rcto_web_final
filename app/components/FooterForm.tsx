"use client";

import React from "react";

const FooterForm = () => {
    const handleRedirect = () => {
        // Get the current year and month
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so add 1
    
        // Construct the Calendly URL
        const calendlyUrl = `https://calendly.com/nitesh-remotecto/cc?month=${year}-${month}`;
    
        // Open the Calendly URL in a new tab
        window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
    };
    
    return (
        <div>
            <section className="bg-gradient-to-r from-indigo-500 to-blue-500">
                <h2 className="text-xl lg:text-5xl font-bold text-center text-[#eaecf2] font-mono mt-10">
                    Talk To Us
                </h2>
                <p className="text-lg font-bold text-center text-[#f3f3f6] mt-2">Feel free to reach out to us!</p>
                <p className="text-lg font-bold text-center text-[#f3f3f5] mt-1">You can call, email, schedule a meeting, or simply fill out the form</p>
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                        <div className="lg:col-span-2 lg:py-12">
                            <strong className="max-w-xl text-white text-lg lg:text-3xl">
                                Phone
                            </strong>
                            <p className="text-xl text-white underline">+91 966-251-2899</p>

                            <div className="mt-8">
                                <strong className="block text-white text-lg lg:text-3xl mb-2">
                                    Email
                                </strong>
                                <a
                                    href="mailto:connect@remotecto.in"
                                    className="text-white text-xl underline"
                                >
                                    connect@remotecto.in
                                </a>
                            </div>

                            <div
                                className="text-lg mt-10 lg:text-4xl text-white underline cursor-pointer"
                                onClick={handleRedirect}
                            >
                                Click to schedule &gt;
                                <h2 className="text-lg lg:text-4xl text-white underline">
                                    a free 30 min call with our founder
                                </h2>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                            <form action="#" className="space-y-4">
                                <div>
                                    <label className="sr-only" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-2 border-gray-300 p-3 text-sm 
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                                        transition duration-300 ease-in-out 
                                        placeholder-gray-500"
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
                                            className="w-full rounded-lg border-2 border-gray-300 p-3 text-sm 
                                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                                            transition duration-300 ease-in-out 
                                            placeholder-gray-500"
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
                                            className="w-full rounded-lg border-2 border-gray-300 p-3 text-sm 
                                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                                            transition duration-300 ease-in-out 
                                            placeholder-gray-500"
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
                                        className="w-full rounded-lg border-2 border-gray-300 p-3 text-sm 
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                                        transition duration-300 ease-in-out 
                                        placeholder-gray-500"
                                        placeholder="Message"
                                        
                                        id="message"
                                    ></textarea>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white 
                                        sm:w-auto hover:bg-gray-800 transition duration-300 ease-in-out"
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