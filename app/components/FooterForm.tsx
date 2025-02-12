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

  const [errors, setErrors] = useState({
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
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // const handleRedirect = () => {
  //   const now = new Date();
  //   const year = now.getFullYear();
  //   const month = String(now.getMonth() + 1).padStart(2, "0");

  //   const calendlyUrl = `https://calendly.com/nitesh-remotecto/cc?month=${year}-${month}`;

  //   window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  // };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

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
  <section className="bg-gradient-to-r from-indigo-500 to-blue-500 font-mono py-16">
    <h2 className="text-3xl lg:text-6xl font-bold text-center text-white underline mb-12">
      TALK TO US
    </h2>

    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-5">
        {/* Contact Information Section */}
        <div className="lg:col-span-2 lg:py-12 space-y-8">
          <div>
            <strong className="block text-white text-2xl lg:text-3xl mb-2">
              Phone
            </strong>
            <a
              href="https://wa.me/9662512899"
              target="_blank"
              className="text-white text-xl underline hover:text-gray-200 transition duration-300"
            >
              +91 966-251-2899
            </a>
          </div>

          <div>
            <strong className="block text-white text-2xl lg:text-3xl mb-2">
              Email
            </strong>
            <a
              href="mailto:connect@remotecto.in"
              className="text-white text-xl underline hover:text-gray-200 transition duration-300"
            >
              connect@remotecto.in
            </a>
          </div>

          {/* Optional: Schedule a Call Button */}
          {/* <div
            className="mt-10 text-lg lg:text-2xl text-white underline cursor-pointer hover:text-gray-200 transition duration-300"
            onClick={handleRedirect}
          >
            Click to schedule a free 30 min call with our founder &gt;
          </div> */}
        </div>

        {/* Contact Form Section */}
        <div className="rounded-lg bg-white p-8 shadow-2xl lg:col-span-3 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="sr-only" htmlFor="name">
                Name
              </label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full rounded-lg border-2 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } p-3 text-sm 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                  transition duration-300 ease-in-out 
                  placeholder-gray-500`}
                placeholder="Name *"
                type="text"
                id="name"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Email and Phone Fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="sr-only" htmlFor="email">
                  Email
                </label>
                <input
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-lg border-2 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } p-3 text-sm 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                    transition duration-300 ease-in-out 
                    placeholder-gray-500`}
                  placeholder="Email address *"
                  type="email"
                  id="email"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="sr-only" htmlFor="phone">
                  Phone
                </label>
                <input
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full rounded-lg border-2 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } p-3 text-sm 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                    transition duration-300 ease-in-out 
                    placeholder-gray-500`}
                  placeholder="Phone Number *"
                  type="tel"
                  id="phone"
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label className="sr-only" htmlFor="message">
                Message
              </label>
              <textarea
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`w-full rounded-lg border-2 ${
                  errors.message ? "border-red-500" : "border-gray-300"
                } p-3 text-sm 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                  transition duration-300 ease-in-out 
                  placeholder-gray-500`}
                placeholder="Message *"
                rows={5}
                id="message"
              ></textarea>
              {errors.message && (
                <p className="mt-2 text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white 
                sm:w-auto hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
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
