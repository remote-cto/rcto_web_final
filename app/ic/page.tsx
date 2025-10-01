//app/ic/page.tsx

"use client";
import React, { useState } from "react";
import { Shield, TrendingUp, Lock, Users, CheckCircle } from "lucide-react";
import FormHeader from "../components/FormHeader";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  websiteUrl: string;
  priorities: string[];
  challenge: string;
  techStage: string;
  optIn: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  websiteUrl?: string;
  priorities?: string;
  challenge?: string;
  techStage?: string;
}

interface SubmitStatus {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const InsiderCirclePage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    websiteUrl: "",
    priorities: [],
    challenge: "",
    techStage: "",
    optIn: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    loading: false,
    error: null,
    success: false,
  });

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full Name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Work Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (
      formData.phone &&
      !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(formData.phone)
    ) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.companyName.trim())
      newErrors.companyName = "Company Name is required.";

    if (!formData.websiteUrl.trim()) {
      newErrors.websiteUrl = "Website URL is required.";
    } else {
      try {
        new URL(formData.websiteUrl);
      } catch (_) {
        newErrors.websiteUrl =
          "Please enter a valid URL (e.g., https://example.com).";
      }
    }

    if (formData.priorities.length === 0) {
      newErrors.priorities = "Please select at least one priority.";
    }

    if (!formData.challenge.trim())
      newErrors.challenge = "Please describe your biggest challenge.";

    if (!formData.techStage)
      newErrors.techStage = "Please select your current tech stage.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckboxChange = (value: string): void => {
    setFormData((prev) => {
      const newPriorities = prev.priorities.includes(value)
        ? prev.priorities.filter((p) => p !== value)
        : [...prev.priorities, value];
      return { ...prev, priorities: newPriorities };
    });

    if (errors.priorities) {
      setErrors((prev) => ({ ...prev, priorities: undefined }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear validation error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setSubmitStatus({ loading: true, error: null, success: false });

    try {
      const response = await fetch("/api/insiderCircle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({ loading: false, error: null, success: true });
      } else {
        setSubmitStatus({
          loading: false,
          error: data.error || "Failed to submit form. Please try again.",
          success: false,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        loading: false,
        error: "An error occurred. Please try again later.",
        success: false,
      });
    }
  };

  if (submitStatus.success) {
    return (
      <>
        <FormHeader />
        <div className="min-h-screen bg-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto w-full">
            <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12 text-center border border-blue-100">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Thank You!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                You're now part of the Remote CTO Insider Circle. We've received
                your information and will be in touch soon with your assessment
                results and exclusive insights.
              </p>
              <button
                onClick={() => {
                  setSubmitStatus({
                    loading: false,
                    error: null,
                    success: false,
                  });
                  setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    companyName: "",
                    websiteUrl: "",
                    priorities: [],
                    challenge: "",
                    techStage: "",
                    optIn: false,
                  });
                }}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Submit Another Response
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <FormHeader />
      <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                Join the Remote CTO Insider Circle
              </h1>
              <p className="text-lg text-blue-100">
                Early Insights, Expert Guidance & Priority Access to Solutions
              </p>
            </div>

            <div className="p-6 lg:p-8">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Users className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-blue-600">
                      1. Basic Info
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="So we can address you properly"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition ${
                          errors.fullName
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="We'll share your assessment results here"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition ${
                          errors.email
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Helps us coordinate the session faster"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition ${
                          errors.phone
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-blue-600">
                      2. Company Details
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Who we'll be doing the assessment for"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition ${
                          errors.companyName
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                      />
                      {errors.companyName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.companyName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website / LinkedIn URL{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="url"
                        name="websiteUrl"
                        required
                        value={formData.websiteUrl}
                        onChange={handleChange}
                        placeholder="So we can understand your business before the session"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition ${
                          errors.websiteUrl
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                      />
                      {errors.websiteUrl && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.websiteUrl}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Lock className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-blue-600">
                      3. Current Situation / Context
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        What are your biggest technology priorities right now?{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-3">
                        {[
                          "Data insights & dashboards",
                          "Cybersecurity & risk mitigation",
                          "Privacy & regulatory compliance",
                          "All of the above",
                        ].map((priority) => (
                          <label
                            key={priority}
                            className="flex items-start cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={formData.priorities.includes(priority)}
                              onChange={() => handleCheckboxChange(priority)}
                              className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-3 text-gray-700 group-hover:text-gray-900">
                              {priority}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.priorities && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.priorities}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What's your biggest challenge today?{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="challenge"
                        required
                        value={formData.challenge}
                        onChange={handleChange}
                        placeholder="e.g., We have too much data but no insights..."
                        rows={4}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition resize-none ${
                          errors.challenge
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                      />
                      {errors.challenge && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.challenge}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Current stage of your tech setup:{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-3">
                        {[
                          "We have nothing in place yet",
                          "We have basic tools but need deeper visibility",
                          "We're mature but want expert validation",
                        ].map((stage) => (
                          <label
                            key={stage}
                            className="flex items-start cursor-pointer group"
                          >
                            <input
                              type="radio"
                              name="techStage"
                              required
                              value={stage}
                              checked={formData.techStage === stage}
                              onChange={handleChange}
                              className="mt-1 w-5 h-5 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-3 text-gray-700 group-hover:text-gray-900">
                              {stage}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.techStage && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.techStage}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {submitStatus.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-red-700">{submitStatus.error}</p>
                  </div>
                )}

                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-blue-600">
                      4. Consent & Opt-in
                    </h2>
                  </div>

                  <label className="flex items-start cursor-pointer group">
                    <input
                      type="checkbox"
                      name="optIn"
                      checked={formData.optIn}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700 group-hover:text-gray-900">
                      Yes, I'd like to receive free insights, compliance tips,
                      and cybersecurity updates via email/WhatsApp.
                    </span>
                  </label>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    Your information is secure and will never be shared with
                    third parties.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={submitStatus.loading}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    {submitStatus.loading
                      ? "Submitting..."
                      : "Join the Circle →"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsiderCirclePage;
