"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import FormHeader from "@/app/components/FormHeader";

interface FormData {
  name: string;
  email: string;
  website: string;
  ideaSentence: string;
  problem: string;
  solution: string;
  buildStatus: string;
  validationStatus: string;
  helpNeeded: string[];
  helpNeededOther?: string;
  fundingStatus: string;
  fundingAmount: string;
  runway: string;
  partnership: string;
  gtm: string;
  whySelect: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  ideaSentence?: string;
  problem?: string;
  solution?: string;
  [key: string]: string | undefined;
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    website: "",
    ideaSentence: "",
    problem: "",
    solution: "",
    buildStatus: "",
    validationStatus: "Just an idea",
    helpNeeded: [],
    fundingStatus: "No, bootstrapped",
    fundingAmount: "",
    runway: "<3 months",
    partnership: "",
    gtm: "",
    whySelect: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const Router = useRouter();

  const validateEmail = (email: string): boolean => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        helpNeeded: [...formData.helpNeeded, value],
      });
    } else {
      setFormData({
        ...formData,
        helpNeeded: formData.helpNeeded.filter((item) => item !== value),
      });
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Please enter a valid email address";
    if (!formData.ideaSentence.trim())
      newErrors.ideaSentence = "Idea summary is required";
    if (!formData.problem.trim())
      newErrors.problem = "Problem description is required";
    if (!formData.solution.trim())
      newErrors.solution = "Solution description is required";

    return newErrors;
  };

  const handleSubmit = async (): Promise<void> => {
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/submit-idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setShowThankYouPopup(true);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to submit your idea. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeThankYouPopup = (): void => {
    setShowThankYouPopup(false);
    Router.push("/");
  };

  return (
    <>
    <FormHeader/>
      <div className="min-h-screen bg-white text-blue-700 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-6">
            <h1 className="text-3xl font-bold text-center">
              📝 Idea Submission Form
            </h1>
            <h2 className="text-xl font-semibold text-center mt-2">
              Remote CTO Global Ideathon
            </h2>
          </div>

          <div className="p-6 space-y-8">
            <section>
              <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
                👤 Founder Info
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-blue-700 font-medium mb-2"
                    htmlFor="name"
                  >
                    1. Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full p-3 border ${
                      errors.name ? "border-red-500" : "border-blue-300"
                    } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-blue-700 font-medium mb-2"
                    htmlFor="email"
                  >
                    2. Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 border ${
                      errors.email ? "border-red-500" : "border-blue-300"
                    } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-blue-700 font-medium mb-2"
                    htmlFor="website"
                  >
                    3. Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* The Idea */}
            <section>
              <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
                💡 The Idea
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-blue-700 font-medium mb-2"
                    htmlFor="ideaSentence"
                  >
                    4. What's your startup idea in one sentence?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="ideaSentence"
                    name="ideaSentence"
                    value={formData.ideaSentence}
                    onChange={handleInputChange}
                    className={`w-full p-3 border ${
                      errors.ideaSentence ? "border-red-500" : "border-blue-300"
                    } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.ideaSentence && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.ideaSentence}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-blue-700 font-medium mb-2"
                    htmlFor="problem"
                  >
                    5. What problem does it solve, and for whom?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="problem"
                    name="problem"
                    value={formData.problem}
                    onChange={handleInputChange}
                    className={`w-full p-3 border ${
                      errors.problem ? "border-red-500" : "border-blue-300"
                    } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-24`}
                  ></textarea>
                  {errors.problem && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.problem}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-blue-700 font-medium mb-2"
                    htmlFor="solution"
                  >
                    6. What makes your solution different or better?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="solution"
                    name="solution"
                    value={formData.solution}
                    onChange={handleInputChange}
                    className={`w-full p-3 border ${
                      errors.solution ? "border-red-500" : "border-blue-300"
                    } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-24`}
                  ></textarea>
                  {errors.solution && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.solution}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Execution Status */}
            <section>
              <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
                🔨 Execution Status
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-blue-700 font-medium mb-2"
                    htmlFor="buildStatus"
                  >
                    7. Do you have anything built — a deck, prototype, or MVP?
                  </label>
                  <textarea
                    id="buildStatus"
                    name="buildStatus"
                    value={formData.buildStatus}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-blue-700 font-medium mb-2">
                    8. Have you validated the idea with users or market signals?
                  </label>
                  <div className="space-y-2">
                    {[
                      "Just an idea",
                      "Spoke to users",
                      "Early pilot",
                      "Active users",
                    ].map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name="validationStatus"
                          value={option}
                          checked={formData.validationStatus === option}
                          onChange={handleInputChange}
                          className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-blue-700 font-medium mb-2">
                    9. What kind of help do you need most right now?
                  </label>
                  <div className="space-y-2">
                    {[
                      "Tech development",
                      "Architecture/CTO guidance",
                      "UI/UX",
                      "GTM & product-market fit",
                    ].map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          name="helpNeeded"
                          value={option}
                          checked={formData.helpNeeded.includes(option)}
                          onChange={handleCheckboxChange}
                          className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="helpNeeded"
                          value="Other"
                          checked={formData.helpNeeded.includes("Other")}
                          onChange={handleCheckboxChange}
                          className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span>Other (specify)</span>
                      </label>
                      {formData.helpNeeded.includes("Other") && (
                        <input
                          type="text"
                          name="helpNeededOther"
                          onChange={handleInputChange}
                          className="mt-2 w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Please specify"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Financial Readiness */}
            <section>
              <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
                💰 Financial Readiness
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-blue-700 font-medium mb-2">
                    10. Have you raised any funding yet?
                  </label>
                  <div className="space-y-2">
                    {[
                      "No, bootstrapped",
                      "Yes, friends & family",
                      "Yes, angel or VC round",
                    ].map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name="fundingStatus"
                          value={option}
                          checked={formData.fundingStatus === option}
                          onChange={handleInputChange}
                          className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    className="block text-blue-700 font-medium mb-2"
                    htmlFor="fundingAmount"
                  >
                    11. If yes, how much have you raised so far (in ₹ or $)?
                    (optional)
                  </label>
                  <input
                    type="text"
                    id="fundingAmount"
                    name="fundingAmount"
                    value={formData.fundingAmount}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-blue-700 font-medium mb-2">
                    12. What's your current runway or burn rate like?
                  </label>
                  <div className="space-y-2">
                    {[
                      "<3 months",
                      "3–6 months",
                      "6–12 months",
                      "12+ months",
                      "I'm pre-revenue / no burn",
                    ].map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name="runway"
                          value={option}
                          checked={formData.runway === option}
                          onChange={handleInputChange}
                          className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-blue-700 font-medium mb-2">
                    13. Would you be open to co-building, revenue-share, or
                    equity-based partnerships?
                  </label>
                  <div className="space-y-2">
                    {["Yes", "No", "Depends on terms"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name="partnership"
                          value={option}
                          checked={formData.partnership === option}
                          onChange={handleInputChange}
                          className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Vision & Fit */}
            <section>
              <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
                🚀 Vision & Fit
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-blue-700 font-medium mb-2"
                    htmlFor="gtm"
                  >
                    14. How do you plan to take this to market (GTM)?
                  </label>
                  <textarea
                    id="gtm"
                    name="gtm"
                    value={formData.gtm}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  ></textarea>
                </div>

                <div>
                  <label
                    className="block text-blue-700 font-medium mb-2"
                    htmlFor="whySelect"
                  >
                    15. Why should we select your idea to build for free?
                  </label>
                  <textarea
                    id="whySelect"
                    name="whySelect"
                    value={formData.whySelect}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  ></textarea>
                </div>
              </div>
            </section>

            {submitError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{submitError}</span>
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Your Idea"}
              </button>
            </div>
          </div>
        </div>

        {showThankYouPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <svg
                    className="h-10 w-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600 mb-6">
                  Your idea has been successfully submitted. We'll review it and
                  get back to you soon.
                </p>
                <button
                  onClick={closeThankYouPopup}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
