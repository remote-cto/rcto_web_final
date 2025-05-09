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
  termsAgreed: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  ideaSentence?: string;
  problem?: string;
  solution?: string;
  termsAgreed?: string;
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
    termsAgreed: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [showTermsPopup, setShowTermsPopup] = useState<boolean>(false);
  const [showPrivacyPopup, setShowPrivacyPopup] = useState<boolean>(false);

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

  const openTermsPopup = (): void => {
    setShowTermsPopup(true);
  };

  const closeTermsPopup = (): void => {
    setShowTermsPopup(false);
  };
  const openPrivacyPopup = (): void => {
    setShowPrivacyPopup(true);
  };

  const closePrivacyPopup = (): void => {
    setShowPrivacyPopup(false);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, checked } = e.target;

    if (name === "termsAgreed") {
      setFormData({
        ...formData,
        termsAgreed: checked,
      });

      if (errors.termsAgreed && checked) {
        setErrors({
          ...errors,
          termsAgreed: undefined,
        });
      }
      return;
    }

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
    if (!formData.termsAgreed)
      newErrors.termsAgreed = "You must agree to the Terms & Conditions";

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
      <FormHeader />
      <div className="min-h-screen bg-white text-blue-700 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-6">
            <h1 className="text-3xl font-bold text-center font-['Montserrat']">
              📝 Idea Submission Form
            </h1>
            <h2 className="text-xl font-semibold text-center mt-2 font-['Montserrat-Light']">
              Remote CTO Global Ideathon
            </h2>
          </div>

          <div className="p-6 space-y-8">
            <section>
              <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4 font-['Montserrat']">
                👤 Founder Info
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-blue-700 font-bold mb-2 font-['Montserrat-Light']"
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
                    className="block text-blue-700 font-bold mb-2 font-['Montserrat-Light']"
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
                    className="block text-blue-700 font-bold mb-2 font-['Montserrat-Light']"
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

            <section>
              <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4 font-['Montserrat']">
                💡 The Idea
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-blue-700 font-bold mb-2 font-['Montserrat-Light']"
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
                    className="block text-blue-700 font-bold mb-2 font-['Montserrat-Light']"
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
                    className="block text-blue-700 font-bold mb-2 font-['Montserrat-Light']"
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

            <section>
              <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4 font-['Montserrat']">
                🔨 Execution Status
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-blue-700 font-bold mb-2 font-['Montserrat-Light']"
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
                  <label className="block text-blue-700 font-bold mb-2 font-['Montserrat-Light']">
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
                        className="flex items-center space-x-2 font-['Montserrat-Light']"
                      >
                        <input
                          type="radio"
                          name="validationStatus"
                          value={option}
                          checked={formData.validationStatus === option}
                          onChange={handleInputChange}
                          className="text-blue-600 focus:ring-blue-500 h-4 w-4 "
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-blue-700 font-bold mb-2 font-['Montserrat-Light']">
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
                        className="flex items-center space-x-2 font-['Montserrat-Light']"
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

            <section>
              <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4 font-['Montserrat']">
                💰 Financial Readiness
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-blue-700 font-bold mb-2 font-['Montserrat-Light']">
                    10. Have you raised any funding yet?
                  </label>
                  <div className="space-y-2 font-['Montserrat-Light']">
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
                    className="block text-blue-700 font-bold mb-2 font-['Montserrat-Light']"
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
                  <label className="block text-blue-700 font-bold mb-2 font-['Montserrat-Light']">
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
                        className="flex items-center space-x-2 font-['Montserrat-Light']"
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
                  <label className="block text-blue-700 font-bold mb-2 font-['Montserrat-Light']">
                    13. Would you be open to co-building, revenue-share, or
                    equity-based partnerships?
                  </label>
                  <div className="space-y-2 font-['Montserrat-Light']">
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

            <section>
              <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4 font-['Montserrat']">
                🚀 Vision & Fit
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-blue-700 font-bold mb-2 font-['Montserrat-Light']"
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
                    className="block text-blue-700 font-bold mb-2 font-['Montserrat-Light']"
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

            {/* Terms & Conditions Section */}
            <section className="mt-6">
              <div className="flex items-start mt-4">
                <div className="flex items-center h-5">
                  <input
                    id="termsAgreed"
                    name="termsAgreed"
                    type="checkbox"
                    checked={formData.termsAgreed}
                    onChange={handleCheckboxChange}
                    className={`focus:ring-blue-500 h-4 w-4 text-blue-600 border ${
                      errors.termsAgreed ? "border-red-500" : "border-blue-300"
                    } rounded`}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="termsAgreed"
                    className={`font-['Montserrat-Light'] ${
                      errors.termsAgreed ? "text-red-500" : "text-blue-700"
                    }`}
                  >
                    I have read and agree to the{" "}
                    <button
                      type="button"
                      onClick={openTermsPopup}
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      Terms and Conditions
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      onClick={openPrivacyPopup}
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      Privacy Policy
                    </button>{" "}
                    of the Remote CTO Global Ideathon.
                    <span className="text-red-500"> *</span>
                  </label>
                </div>
              </div>
              {errors.termsAgreed && (
                <p className="text-red-500 text-sm mt-1 ml-7">
                  {errors.termsAgreed}
                </p>
              )}
            </section>

            {showPrivacyPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-blue-700 font-['Montserrat']">
                      🔐 Privacy Policy — Remote CTO Global Ideathon
                    </h3>
                    <button
                      onClick={closePrivacyPopup}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4 text-sm">
                    <p className="font-semibold text-gray-700 font-['Montserrat-Light']">
                      <strong>Effective Date:</strong> May 1, 2025
                    </p>
                    <p className="font-['Montserrat-Light']">
                      Remote CTO ("we", "our", or "us") is committed to
                      safeguarding the privacy and personal data of all
                      participants in the Remote CTO Global Ideathon
                      ("Ideathon"). This Privacy Policy outlines the types of
                      data we collect, the purposes for which we use it, the
                      legal basis for processing, how it is stored and
                      protected, your rights as a data subject, and our
                      obligations under relevant data protection regulations
                      including the General Data Protection Regulation (GDPR),
                      the California Consumer Privacy Act (CCPA), and other
                      applicable global data privacy laws.
                    </p>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        📌 1. Scope of this Policy
                      </h5>
                      <p className="font-['Montserrat-Light']">
                        This policy applies to all personal information
                        collected through:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>The Ideathon submission form</li>
                        <li>
                          Communications and interactions related to the
                          Ideathon (e.g., email correspondence, surveys)
                        </li>
                        <li>
                          Any optional materials you provide (e.g., pitch decks,
                          documents, or links)
                        </li>
                      </ul>
                      <p className="font-['Montserrat-Light'] mt-2">
                        By participating in the Ideathon, you acknowledge and
                        consent to the collection and processing of your
                        personal data in accordance with this policy.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        📋 2. Types of Information Collected
                      </h5>
                      <p className="font-['Montserrat-Light']">
                        We may collect and process the following categories of
                        personal and project-related data:
                      </p>

                      <h6 className="font-semibold mt-2 font-['Montserrat-Light']">
                        2.1. Personal Identification Information
                      </h6>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>Full name</li>
                        <li>Email address</li>
                        <li>Phone number (if provided)</li>
                        <li>Country of residence and city</li>
                        <li>
                          Professional background (organization, job title,
                          LinkedIn profile, etc.)
                        </li>
                      </ul>

                      <h6 className="font-semibold mt-2 font-['Montserrat-Light']">
                        2.2. Submission Content
                      </h6>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>Title and description of your idea or project</li>
                        <li>
                          Details about your startup, innovation, or technology
                          solution
                        </li>
                        <li>
                          Optional attachments (e.g., pitch decks, flowcharts,
                          business plans, mockups)
                        </li>
                        <li>
                          URLs linking to repositories, videos, or other online
                          resources relevant to your submission
                        </li>
                      </ul>

                      <h6 className="font-semibold mt-2 font-['Montserrat-Light']">
                        2.3. System & Usage Data (If Applicable)
                      </h6>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          IP address and browser metadata (automatically
                          collected for security/logging purposes if using our
                          web platform)
                        </li>
                        <li>Date and time of submission</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        🎯 3. Purpose and Use of Data
                      </h5>
                      <p className="font-['Montserrat-Light']">
                        We collect your data for the following purposes:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          <strong>Submission Evaluation</strong>: To assess the
                          originality, feasibility, and alignment of your
                          submission with the Ideathon objectives
                        </li>
                        <li>
                          <strong>Communication</strong>: To notify you about
                          application status, shortlisting, or interview
                          opportunities
                        </li>
                        <li>
                          <strong>Participant Support</strong>: To offer
                          assistance, clarify submission details, or provide
                          Ideathon updates
                        </li>
                        <li>
                          <strong>
                            Marketing and Promotion (with consent only)
                          </strong>
                          : To showcase selected submissions or testimonials in
                          promotional material, social media, or publications
                        </li>
                        <li>
                          <strong>Internal Record-Keeping</strong>: To maintain
                          audit trails and records for program monitoring and
                          evaluation
                        </li>
                      </ul>
                      <p className="font-['Montserrat-Light'] mt-2">
                        Your data will not be used for profiling or automated
                        decision-making processes. We <strong>do not</strong>{" "}
                        sell or rent your information to any third parties.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        🌍 4. Legal Basis for Processing
                      </h5>
                      <p className="font-['Montserrat-Light']">
                        Under applicable data protection laws, we rely on one or
                        more of the following legal grounds to process your
                        data:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          <strong>Consent</strong>: You provide explicit consent
                          at the time of form submission
                        </li>
                        <li>
                          <strong>Legitimate Interests</strong>: To organize,
                          administer, and improve the Ideathon while ensuring
                          transparency and fairness
                        </li>
                        <li>
                          <strong>Legal Obligation</strong>: To comply with
                          applicable regulations, including audit and tax
                          obligations (where applicable)
                        </li>
                      </ul>
                      <p className="font-['Montserrat-Light'] mt-2">
                        For EU/EEA residents, all processing activities are
                        conducted in accordance with Article 6 of the GDPR.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        🕒 5. Data Retention
                      </h5>
                      <p className="font-['Montserrat-Light']">
                        We will retain your personal and submission data only
                        for as long as necessary to fulfill the purposes
                        outlined in this policy, and no longer than:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          <strong>Three (3) months</strong> after the conclusion
                          of the Ideathon
                        </li>
                        <li>
                          Or until a <strong>valid deletion request</strong> is
                          received from you
                        </li>
                      </ul>
                      <p className="font-['Montserrat-Light'] mt-2">
                        After this retention period, data will be securely
                        deleted or anonymized for statistical and research
                        purposes.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        🔒 6. Data Storage and Security
                      </h5>
                      <p className="font-['Montserrat-Light']">
                        We implement appropriate technical and organizational
                        measures to ensure a high level of data security. These
                        include:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          Hosting all digital data on{" "}
                          <strong>secure, encrypted cloud servers</strong>{" "}
                          compliant with global data security standards (e.g.,
                          Google Cloud, Microsoft Azure)
                        </li>
                        <li>
                          Use of <strong>TLS/SSL encryption</strong> for all
                          form submissions and email communication
                        </li>
                        <li>
                          Access controls ensuring that only authorized
                          personnel can view or manage data
                        </li>
                        <li>
                          Regular security reviews, vulnerability testing, and
                          system patching
                        </li>
                        <li>
                          Secure deletion and disposal of data after the
                          retention period
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        ⚙️ 7. Use of Third-Party Tools and Services
                      </h5>
                      <p className="font-['Montserrat-Light']">
                        We may engage reputable third-party service providers to
                        assist in managing submissions and communication,
                        including:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          <strong>Google Forms or Typeform</strong> (for data
                          collection)
                        </li>
                        <li>
                          <strong>
                            Email marketing and notification services
                          </strong>{" "}
                          (e.g., Mailchimp, SendGrid)
                        </li>
                        <li>
                          <strong>Cloud storage providers</strong> (e.g., Google
                          Drive, AWS S3)
                        </li>
                      </ul>
                      <p className="font-['Montserrat-Light'] mt-2">
                        These services may store and process data in
                        jurisdictions outside your home country, including the
                        United States, Europe, or India. All such providers are
                        required to adhere to equivalent data protection
                        standards, including compliance with Standard
                        Contractual Clauses (SCCs) where applicable.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        🔄 8. Data Sharing and Disclosure
                      </h5>
                      <p className="font-['Montserrat-Light']">
                        We do <strong>not</strong> sell, rent, or trade your
                        personal data with any third parties. Your information
                        may only be shared under the following conditions:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          With authorized internal teams for the purpose of
                          evaluation and communication
                        </li>
                        <li>
                          With shortlisted partners or jury members under strict
                          confidentiality agreements
                        </li>
                        <li>
                          With third parties as required by law, court order, or
                          regulatory obligation
                        </li>
                      </ul>
                      <p className="font-['Montserrat-Light'] mt-2">
                        In all cases, access is granted only on a need-to-know
                        basis.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        🧑‍⚖️ 9. Your Rights
                      </h5>
                      <p className="font-['Montserrat-Light']">
                        Depending on your jurisdiction, you may have the
                        following rights concerning your personal data:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          <strong>Right of Access</strong> – Request a copy of
                          the data we hold about you
                        </li>
                        <li>
                          <strong>Right of Rectification</strong> – Request
                          corrections to any inaccurate or incomplete data
                        </li>
                        <li>
                          <strong>Right to Withdraw Consent</strong> – Revoke
                          consent previously given for data processing
                        </li>
                        <li>
                          <strong>Right to Erasure</strong> – Request permanent
                          deletion of your submission and personal data
                        </li>
                        <li>
                          <strong>Right to Restrict Processing</strong> –
                          Request a halt to processing under certain conditions
                        </li>
                        <li>
                          <strong>Right to Data Portability</strong> – Request
                          that your data be transferred to another provider
                        </li>
                      </ul>
                      <p className="font-['Montserrat-Light'] mt-2">
                        To exercise any of these rights, contact us at{" "}
                        <strong>connect@remotecto.in</strong>. We will respond
                        within 30 days of receiving a valid request.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        👶 10. Children's Data
                      </h5>
                      <p className="font-['Montserrat-Light']">
                        This program is not intended for participants under the
                        age of 18. We do not knowingly collect data from minors
                        without parental or guardian consent. If such data has
                        been inadvertently collected, please contact us
                        immediately for prompt deletion.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        📝 11. Changes to this Privacy Policy
                      </h5>
                      <p className="font-['Montserrat-Light']">
                        We reserve the right to update or modify this Privacy
                        Policy at any time to reflect changes in our practices,
                        legal requirements, or technology. When we do, we will
                        revise the "Effective Date" at the top of this page and
                        notify participants where appropriate.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        📞 12. Contact Us
                      </h5>
                      <p className="font-['Montserrat-Light']">
                        For any questions, clarifications, or concerns regarding
                        this policy or how your data is handled, please contact
                        us at:
                      </p>
                      <p className="font-['Montserrat-Light'] mt-2">
                        <strong>Remote CTO – Privacy Office</strong>
                        <br />
                        Email:{" "}
                        <a
                          href="mailto:connect@remotecto.in"
                          className="text-blue-600 hover:underline"
                        >
                          connect@remotecto.in
                        </a>
                        <br />
                        Website:{" "}
                        <a
                          href="https://www.remotecto.in"
                          className="text-blue-600 hover:underline"
                        >
                          www.remotecto.in
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={closePrivacyPopup}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded font-['Montserrat-Light']"
                    >
                      I Understand
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Terms & Conditions Popup */}
            {showTermsPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-blue-700 font-['Montserrat']">
                      📋 Terms and Conditions — Remote CTO Global Ideathon
                    </h3>
                    <button
                      onClick={closeTermsPopup}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-6 text-sm">
                    <div className="border-b pb-2">
                      <p className="font-bold font-['Montserrat-Light'] text-blue-600">
                        Remote CTO Global Ideathon
                      </p>
                      <p className="text-gray-600 font-['Montserrat-Light']">
                        Effective Date: May 1, 2025
                      </p>
                      <p className="mt-2 font-['Montserrat-Light']">
                        These Terms and Conditions ("Terms") govern your
                        participation in the{" "}
                        <strong>Remote CTO Global Ideathon</strong> ("the
                        Ideathon"), organized by <strong>Remote CTO</strong>{" "}
                        ("Organizer", "we", "us", or "our"). By submitting an
                        application or participating in any manner in the
                        Ideathon, you ("Participant", "you", or "your") agree to
                        be bound by these Terms.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light'] text-blue-700">
                        1.  Eligibility
                      </h5>
                      <p className="mb-2 font-['Montserrat-Light']">
                        The Ideathon is open to individuals aged 18 years or
                        older, regardless of nationality or residence.
                        Specifically, eligible participants include:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>Independent innovators and professionals</li>
                        <li>
                          Students currently enrolled in an accredited
                          educational institution
                        </li>
                        <li>Early-stage startup founders or teams</li>
                        <li>
                          You must have a clearly defined idea or concept,
                          accompanied by a well-articulated problem statement
                          and a potential use case or societal/market impact.
                        </li>
                        <li>
                          Technical knowledge is <strong>not mandatory</strong>,
                          and mentorship will be provided as necessary.
                        </li>
                        <li>
                          Employees or affiliates of Remote CTO involved in
                          organizing or judging the Ideathon are not eligible to
                          participate.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light'] text-blue-700">
                        2.  Submission Requirements
                      </h5>
                      <p className="mb-2 font-['Montserrat-Light']">
                        All entries must be submitted via the official
                        application form available on the Remote CTO website.
                        The following rules apply:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          The final submission deadline is{" "}
                          <strong>11:59 PM IST on May 20, 2025</strong>. Late
                          entries will not be considered.
                        </li>
                        <li>
                          Each submission must include a title, summary of the
                          idea, description of the problem, and a proposed
                          solution or approach.
                        </li>
                        <li>
                          Optional supporting materials such as pitch decks,
                          mockups, wireframes, video demonstrations, or working
                          prototypes may be attached.
                        </li>
                        <li>
                          Participants may submit multiple ideas, but only{" "}
                          <strong>
                            one submission per participant or team will be
                            selected for final consideration
                          </strong>
                          .
                        </li>
                        <li>
                          Submissions must be original and must not infringe
                          upon the intellectual property rights of any third
                          party.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light'] text-blue-700">
                        3.  Selection Criteria
                      </h5>
                      <p className="mb-2 font-['Montserrat-Light']">
                        Submissions will be evaluated by a panel comprising
                        Remote CTO's leadership and external expert advisors.
                        The evaluation will be based on the following
                        non-exhaustive criteria:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>Clarity of the problem statement</li>
                        <li>
                          Relevance and originality of the proposed solution
                        </li>
                        <li>Potential for real-world application and impact</li>
                        <li>
                          Technical and operational feasibility within a 4–8
                          week development cycle
                        </li>
                        <li>
                          Vision, commitment, and adaptability of the founder or
                          team
                        </li>
                      </ul>
                      <p className="mt-2 font-['Montserrat-Light']">
                        Shortlisted participants may be contacted for further
                        clarification or interviews prior to final selection.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light'] text-blue-700">
                        4.  Program Benefits for Selected Participants
                      </h5>
                      <p className="mb-2 font-['Montserrat-Light']">
                        Participants whose submissions are selected will receive
                        support in building a fully functional MVP or working
                        product. This includes:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          End-to-end product development by the Remote CTO
                          engineering team
                        </li>
                        <li>
                          Strategic technology consultation at a CTO level
                          (including architecture and scalability planning)
                        </li>
                        <li>UI/UX design and full-stack development</li>
                        <li>Deployment and hosting support</li>
                        <li>
                          Advisory on go-to-market strategy, positioning, and
                          post-launch roadmap
                        </li>
                      </ul>
                      <p className="mt-2 font-['Montserrat-Light']">
                        All services will be delivered at no cost, unless
                        explicitly mentioned under Section 6 below.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light'] text-blue-700">
                        5.  Exclusions and Limitations
                      </h5>
                      <p className="mb-2 font-['Montserrat-Light']">
                        Participation in the Ideathon does{" "}
                        <strong>not include</strong>:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          Cash prizes, grants, or direct financial support
                        </li>
                        <li>
                          Equity investment or equity transfer (unless
                          separately negotiated and agreed upon in writing
                          post-selection)
                        </li>
                        <li>
                          Long-term maintenance or upgrades post-deployment
                          unless separately agreed
                        </li>
                        <li>
                          Legal, regulatory, or financial consulting services
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light'] text-blue-700">
                        6.  Third-Party Costs and Licensing
                      </h5>
                      <p className="mb-2 font-['Montserrat-Light']">
                        Remote CTO will cover the complete design and
                        development effort. However, the following{" "}
                        <strong>third-party costs</strong>—if required for your
                        project—are <strong>not</strong> included and must be
                        borne by the participant:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          Hosting charges (e.g., AWS, Azure, Vercel, etc.)
                        </li>
                        <li>Domain name registration</li>
                        <li>
                          Paid APIs or third-party integrations (e.g., map
                          services, payment gateways)
                        </li>
                        <li>
                          SaaS licenses or credits (e.g., Firebase, analytics
                          tools)
                        </li>
                        <li>
                          Communication credits (e.g., SMS, email platforms)
                        </li>
                      </ul>
                      <p className="mt-2 font-['Montserrat-Light']">
                        Remote CTO will clearly communicate these costs to the
                        participant before incurring any expense, and will
                        proceed only upon the participant's prior written
                        approval.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light'] text-blue-700">
                        7.  Intellectual Property (IP), Confidentiality, and
                        Non-Disclosure
                      </h5>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          All intellectual property rights in the idea,
                          underlying concept, and any original content submitted
                          by the participant shall remain with the participant.
                        </li>
                        <li>
                          Remote CTO claims no ownership of your IP unless a
                          separate commercial agreement is executed.
                        </li>
                        <li>
                          Remote CTO may request to document the development
                          journey (e.g., case study, interviews, feature
                          articles, etc.) for educational or promotional
                          purposes. This will only be done with the
                          participant's explicit consent.
                        </li>
                        <li>
                          Remote CTO is willing to enter into a Non-Disclosure
                          Agreement (NDA) upon request after selection.
                        </li>
                        <li>
                          Participants agree to refrain from submitting
                          proprietary content that is under a non-compete,
                          confidentiality, or IP restriction with a third party.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light'] text-blue-700">
                        8.  Data Privacy and Compliance
                      </h5>
                      <p className="mb-2 font-['Montserrat-Light']">
                        By submitting your application, you consent to the
                        collection, storage, and processing of your personal and
                        submission data by Remote CTO for purposes of:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>Application review and communication</li>
                        <li>Selection and onboarding</li>
                        <li>
                          Public or internal reporting on the Ideathon outcomes
                        </li>
                      </ul>
                      <p className="mt-2 font-['Montserrat-Light']">
                        All data will be handled in compliance with relevant
                        data protection laws, including but not limited to the
                        <strong>
                          {" "}
                          General Data Protection Regulation (GDPR)
                        </strong>
                        , the{" "}
                        <strong>California Consumer Privacy Act (CCPA)</strong>,
                        and similar frameworks. Your data will not be sold or
                        used for marketing without your explicit consent. You
                        may at any time request access, correction, or deletion
                        of your data by contacting
                        <strong> connect@remotecto.in</strong>.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light'] text-blue-700">
                        9.  Selection and Final Decision
                      </h5>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          All submissions will be reviewed by a selection
                          committee consisting of Remote CTO leadership and
                          qualified external advisors.
                        </li>
                        <li>
                          The selection process will be fair, confidential, and
                          solely at the discretion of the organizers.
                        </li>
                        <li>
                          The organizers reserve the right to disqualify any
                          submission deemed incomplete, offensive, plagiarized,
                          or in violation of any law or ethical standard.
                        </li>
                        <li>
                          The final decision regarding the selected idea(s)
                          shall be{" "}
                          <strong>absolute, binding, and non-negotiable</strong>
                          .
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light'] text-blue-700">
                        10.  Timeline
                      </h5>
                      <p className="mb-2 font-['Montserrat-Light']">
                        The official timeline for the Ideathon is as follows:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          <strong>Application Deadline</strong>: May 20, 2025
                        </li>
                        <li>
                          <strong>Finalist Announcements</strong>: June 1, 2025
                        </li>
                        <li>
                          <strong>Winner(s) Declared</strong>: June 5, 2025
                        </li>
                        <li>
                          <strong>MVP/Product Development Window</strong>:
                          June–July 2025 (tentatively 4–8 weeks based on project
                          scope)
                        </li>
                      </ul>
                      <p className="mt-2 font-['Montserrat-Light']">
                        The Organizer reserves the right to revise these dates
                        and timelines at its sole discretion and will notify
                        participants in advance of any such changes.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light'] text-blue-700">
                        11.  Disclaimers and Liability Limitation
                      </h5>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          Participation in the Ideathon is voluntary and at your
                          own risk.
                        </li>
                        <li>
                          Remote CTO makes no guarantees regarding investment,
                          commercialization, or continued product development
                          after the program.
                        </li>
                        <li>
                          Remote CTO will not be liable for any direct,
                          indirect, incidental, or consequential damages arising
                          from participation in the Ideathon.
                        </li>
                        <li>
                          In the event of a dispute, Indian law shall govern
                          these Terms, and the jurisdiction shall lie with the
                          courts of Ahmedabad, Gujarat, India.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light'] text-blue-700">
                        12.  Contact and Communication
                      </h5>
                      <p className="font-['Montserrat-Light']">
                        All inquiries regarding the Ideathon, these Terms, or
                        your submission should be directed to:
                      </p>
                      <p className="mt-2 font-['Montserrat-Light']">
                        <strong>Email</strong>: connect@remotecto.in
                      </p>
                      <p className="font-['Montserrat-Light']">
                        <strong>Website</strong>: www.remotecto.in
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={closeTermsPopup}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded font-['Montserrat-Light']"
                    >
                      I Understand
                    </button>
                  </div>
                </div>
              </div>
            )}

            {submitError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative font-['Montserrat-Light']">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{submitError}</span>
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 font-['Montserrat-Light'] ${
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
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-['Montserrat-Light']">
                  Thank You!
                </h3>
                <p className="text-gray-600 mb-6 font-['Montserrat-Light']">
                  Your idea has been successfully submitted. We'll review it and
                  get back to you soon.
                </p>
                <button
                  onClick={closeThankYouPopup}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded font-['Montserrat-Light']"
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
