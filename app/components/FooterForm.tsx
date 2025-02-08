"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

const FooterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRedirect = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    const calendlyUrl = `https://calendly.com/nitesh-remotecto/cc?month=${year}-${month}`;

    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Show loading toast
    const loadingToast = toast.loading("Submitting your enquiry...");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.dismiss(loadingToast);
        toast.success(
          "Thank you! Your enquiry has been submitted successfully.",
          {
            duration: 5000,
            position: "top-center",
          }
        );

        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.dismiss(loadingToast);
        toast.error("Failed to submit enquiry. Please try again.", {
          duration: 5000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      toast.dismiss(loadingToast);
      toast.error(
        "An error occurred while submitting the form. Please try again.",
        {
          duration: 5000,
          position: "top-center",
        }
      );
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-indigo-500 to-blue-500 font-mono">
        <h2 className="text-xl lg:text-5xl font-bold text-center text-[#eaecf2] font-mono">
          Talk To Us
        </h2>
        <p className="text-lg font-bold text-center text-[#f3f3f6] mt-2">
          Feel free to reach out to us!
        </p>
        <p className="text-lg font-bold text-center text-[#f3f3f5] mt-1">
          You can call, email, schedule a meeting, or simply fill out the form
        </p>
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
                <h2 className="text-lg lg:text-3xl text-white underline">
                  a free 30 min call with our founder
                </h2>
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="sr-only" htmlFor="name">
                    Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
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
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
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
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
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
