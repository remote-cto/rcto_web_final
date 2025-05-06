"use client";
import { CoolMode } from "@/components/ui/cool-mode";
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
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

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

  const inputClasses = (errorField: string) => `
    w-full rounded-lg border-2 p-3 text-sm
    ${
      errors[errorField as keyof typeof errors]
        ? "border-red-500"
        : "border-blue-200"
    }
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-all duration-300 ease-in-out
    shadow-[0_0_10px_rgba(59,130,246,0.1)]
    hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]
    focus:shadow-[0_0_20px_rgba(59,130,246,0.3)]
    placeholder-gray-500
  `;

  return (
    <div>
      <section className="bg-white font-mono py-16 relative overflow-hidden">
       
        <h2
          className="text-3xl lg:text-6xl font-bold text-center text-[#061BB0] mb-12 font-['Montserrat']
          relative
         "
        >
          TALK TO US
        </h2>

        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-5">
            {/* Enhanced contact info section */}
            <div className="lg:col-span-2 lg:py-12 space-y-8">
              <div className="transform transition-all duration-300 hover:scale-105">
                <strong className="block text-blue-700 text-2xl lg:text-3xl mb-2">
                  Phone
                </strong>
                <a
                  href="https://wa.me/9662512899"
                  target="_blank"
                  className="text-[#061BB0] text-xl relative group
                    after:content-[''] after:absolute after:bottom-0 after:left-0
                    after:w-full after:h-0.5 after:bg-blue-400
                    after:transform after:scale-x-0 after:origin-left
                    after:transition-transform after:duration-300
                    group-hover:after:scale-x-100
                    hover:text-blue-800 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  +91 966-251-2899
                </a>
              </div>

              <div className="transform transition-all duration-300 hover:scale-105">
                <strong className="block text-[#061BB0] text-2xl lg:text-3xl mb-2">
                  Email
                </strong>
                <a
                  href="mailto:connect@remotecto.in"
                  className="text-blue-600 text-xl relative group
                    after:content-[''] after:absolute after:bottom-0 after:left-0
                    after:w-full after:h-0.5 after:bg-blue-400
                    after:transform after:scale-x-0 after:origin-left
                    after:transition-transform after:duration-300
                    group-hover:after:scale-x-100
                    hover:text-blue-800 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  connect@remotecto.in
                </a>
              </div>
            </div>

            {/* Enhanced form section - white with blue accents */}
            <div
              className="rounded-lg bg-white p-8 lg:p-12
              shadow-[0_0_20px_rgba(59,130,246,0.2)]
              hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]
              transition-shadow duration-300 ease-in-out
              border-2 border-blue-100
              lg:col-span-3"
            >
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
                    className={inputClasses("name")}
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
                      className={inputClasses("email")}
                      placeholder="Email address *"
                      type="email"
                      id="email"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.email}
                      </p>
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
                      className={inputClasses("phone")}
                      placeholder="Phone Number *"
                      type="tel"
                      id="phone"
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.phone}
                      </p>
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
                    className={inputClasses("message")}
                    placeholder="Message *"
                    rows={5}
                    id="message"
                  ></textarea>
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Enhanced Submit Button */}
                <div className="mt-6">
                  <CoolMode>
                    <button
                      type="submit"
                      className="inline-block w-full sm:w-auto px-5 py-3 
                      bg-[#061BB0] text-white font-medium rounded-lg
                      transform transition-all duration-300 ease-in-out
                      hover:scale-105 hover:bg-blue-700
                      shadow-[0_0_15px_rgba(59,130,246,0.2)]
                      hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Send Enquiry
                    </button>
                  </CoolMode>
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
