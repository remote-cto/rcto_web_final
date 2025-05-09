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
                      Terms & Conditions
                    </button>{" "}
                    and Privacy Policy of the Remote CTO Global Ideathon.
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

            {/* Terms & Conditions Popup */}
            {showTermsPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-blue-700 font-['Montserrat']">
                      📋 Rules & Terms — Remote CTO Global Ideathon
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

                  <div className="space-y-4 text-sm">
                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        ✅ Eligibility
                      </h5>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          Open to individuals, student innovators, and
                          early-stage startup founders from{" "}
                          <strong>any country</strong>.
                        </li>
                        <li>
                          You must have a clear idea, problem statement, and
                          potential impact.
                        </li>
                        <li>
                          Technical expertise is <strong>not mandatory</strong>{" "}
                          — we're here to help you build.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        📝 Submission Guidelines
                      </h5>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          All entries must be submitted via the official form by{" "}
                          <strong>20th May 2025</strong>.
                        </li>
                        <li>
                          You may optionally include pitch decks, wireframes, or
                          prototypes.
                        </li>
                        <li>
                          Multiple submissions are allowed, but only one will be
                          selected.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        🧠 Selection Criteria
                      </h5>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          Clarity and relevance of the problem being solved
                        </li>
                        <li>Potential for real-world impact</li>
                        <li>
                          Feasibility of building the product within 4–8 weeks
                        </li>
                        <li>Vision and commitment of the founder/team</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        🛠️ What We Offer (If Selected)
                      </h5>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          Complete MVP/product build by the Remote CTO team
                        </li>
                        <li>
                          CTO-level tech strategy, architecture, and process
                          design
                        </li>
                        <li>
                          UI/UX design, full-stack development, and deployment
                        </li>
                        <li>Go-to-market guidance and post-launch advisory</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        ⚠️ What's Not Included
                      </h5>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>Funding or cash prize</li>
                        <li>
                          Equity dilution (unless mutually discussed later)
                        </li>
                        <li>Long-term maintenance unless agreed separately</li>
                        <li>
                          Cost of hosting or any 3rd party vendor licenses or
                          any kind of other expense
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        💸 Third-Party Costs
                      </h5>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          While Remote CTO will cover the full product build,{" "}
                          <strong>any third-party costs incurred</strong> during
                          development (e.g., hosting, paid APIs, licensed
                          products, SMS/email credits, cloud services, etc.){" "}
                          <strong>
                            will be the responsibility of the selected
                            founder/team.
                          </strong>
                        </li>
                        <li>
                          We will inform you of these costs upfront and proceed
                          only upon your approval.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        🔐 IP, Confidentiality & Rights
                      </h5>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          You <strong>retain full ownership</strong> of your
                          idea and intellectual property.
                        </li>
                        <li>
                          Remote CTO may document the journey for educational or
                          promotional purposes, with your permission.
                        </li>
                        <li>
                          Remote CTO will sign an NDA if requested
                          post-selection.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        📖 Data Privacy & Compliance
                      </h5>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          By submitting your application, you agree that Remote
                          CTO may store and process your personal information
                          for the purposes of evaluating your idea and
                          communicating with you regarding the Ideathon.
                        </li>
                        <li>
                          All personal data will be handled in accordance with{" "}
                          <strong>applicable data protection laws</strong>,
                          including the{" "}
                          <strong>
                            General Data Protection Regulation (GDPR)
                          </strong>{" "}
                          for EU participants.
                        </li>
                        <li>
                          Remote CTO will{" "}
                          <strong>
                            not sell, share, or use your data for any purpose
                            unrelated to the Ideathon
                          </strong>{" "}
                          without your explicit consent.
                        </li>
                        <li>
                          If at any point you wish to withdraw your submission
                          or request data deletion, you may contact us at
                          [connect@remotecto.in].
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        📌 Selection & Final Rights
                      </h5>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          Submissions will be evaluated by Remote CTO leadership
                          and a panel of external advisors.
                        </li>
                        <li>
                          Remote CTO{" "}
                          <strong>
                            reserves the full and final right to select the
                            winning idea
                          </strong>
                          .
                        </li>
                        <li>
                          The selection process is at the sole discretion of the
                          organizers, and the decision is{" "}
                          <strong>final and non-negotiable</strong>.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold font-['Montserrat-Light']">
                        📆 Timeline
                      </h5>
                      <ul className="list-disc pl-5 space-y-1 font-['Montserrat-Light']">
                        <li>
                          Applications close: <strong>20 May 2025</strong>
                        </li>
                        <li>
                          Finalists announced: <strong>1 June 2025</strong>
                        </li>
                        <li>
                          Winner selected: <strong>5 June 2025</strong>
                        </li>
                      </ul>
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
