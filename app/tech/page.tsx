"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  MenuItem,
  Button,
  Box,
  Container,
  Select,
  TextareaAutosize,
  Alert,
} from "@mui/material";

import { toast } from "react-hot-toast";

interface FormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  challengeArea: string;
  otherChallengeArea: string;
  description: string;
  duration: string;
  impact: string;
  previousAttempts: string;
  discoveryCall: boolean;
  additionalDetails: string;
}

interface SubmitStatus {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const TechChallengePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    challengeArea: "",
    otherChallengeArea: "",
    description: "",
    duration: "",
    impact: "",
    previousAttempts: "",
    discoveryCall: true,
    additionalDetails: "",
  });
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    loading: false,
    error: null,
    success: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, error: null, success: false });

    try {
      const response = await fetch("/api/techForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          loading: false,
          error: null,
          success: true,
        });

        // Show success toast
        toast.success(
          "Form submitted successfully! We will get back to you soon."
        );

        // Reset form
        setFormData({
          fullName: "",
          companyName: "",
          email: "",
          phone: "",
          challengeArea: "",
          otherChallengeArea: "",
          description: "",
          duration: "",
          impact: "",
          previousAttempts: "",
          discoveryCall: false,
          additionalDetails: "",
        });

        // Redirect to /thankyou page
        router.push("/tech/thankyou");
      } else {
        throw new Error(data.error || "Failed to submit form");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      setSubmitStatus({
        loading: false,
        error: errorMessage,
        success: false,
      });

      // Show error toast
      toast.error(errorMessage);
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.50",
        py: 8,
        px: { xs: 2, sm: 3, lg: 4 },
      }}
    >
      <Container maxWidth="md">
        <Card>
          <CardContent>
            <Box textAlign="center" mb={4}>
              <Typography variant="h4" color="primary" gutterBottom>
                Remote CTO - Tech Challenge Submission Form
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Struggling with a tech issue? Share your challenge, and our
                experts will help you find the right solution!
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              {/* Basic Information Section */}
              <Box mb={6}>
                <Typography variant="h6" gutterBottom>
                  📝 Basic Information
                </Typography>

                <Box display="flex" flexDirection="column" gap={3}>
                  <TextField
                    label="Full Name"
                    required
                    fullWidth
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />

                  <TextField
                    label="Company Name"
                    required
                    fullWidth
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                  />

                  <TextField
                    label="Email Address"
                    type="email"
                    required
                    fullWidth
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />

                  <TextField
                    label="Phone Number"
                    type="tel"
                    fullWidth
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </Box>
              </Box>

              {/* Tech Challenge Section */}
              <Box mb={6}>
                <Typography variant="h6" gutterBottom>
                  💡 About Your Tech Challenge
                </Typography>

                <Box display="flex" flexDirection="column" gap={4}>
                  <FormControl>
                    <FormLabel>
                      Which area best describes your challenge? *
                    </FormLabel>
                    <RadioGroup
                      value={formData.challengeArea}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          challengeArea: e.target.value,
                        })
                      }
                    >
                      {[
                        "AI & Automation",
                        "Data Management & Analytics",
                        "Cybersecurity & Compliance",
                        "Cloud Infrastructure & DevOps",
                        "Application Development & Architecture",
                        "Integration",
                        "Other",
                      ].map((area) => (
                        <FormControlLabel
                          key={area}
                          value={area}
                          control={<Radio />}
                          label={area}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>

                  {formData.challengeArea === "Other" && (
                    <TextField
                      label="Please specify"
                      fullWidth
                      value={formData.otherChallengeArea}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          otherChallengeArea: e.target.value,
                        })
                      }
                    />
                  )}

                  <TextField
                    label="Briefly describe your tech challenge"
                    required
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />

                  <FormControl fullWidth>
                    <FormLabel>
                      How long have you been facing this issue?
                    </FormLabel>
                    <Select
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Select duration
                      </MenuItem>
                      <MenuItem value="less-than-1">Less than 1 month</MenuItem>
                      <MenuItem value="1-3">1–3 months</MenuItem>
                      <MenuItem value="over-3">Over 3 months</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>
                      What's the impact of this challenge on your business?
                    </FormLabel>
                    <RadioGroup
                      value={formData.impact}
                      onChange={(e) =>
                        setFormData({ ...formData, impact: e.target.value })
                      }
                    >
                      {[
                        "Minor inconvenience",
                        "Affecting team productivity",
                        "Causing significant downtime or losses",
                        "Blocking business growth",
                      ].map((impact) => (
                        <FormControlLabel
                          key={impact}
                          value={impact}
                          control={<Radio />}
                          label={impact}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel>
                      Have you previously tried to resolve this issue?
                    </FormLabel>
                    <RadioGroup
                      value={formData.previousAttempts}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          previousAttempts: e.target.value,
                        })
                      }
                    >
                      {[
                        "Yes, internally",
                        "Yes, with external consultants",
                        "No, this is the first attempt",
                      ].map((attempt) => (
                        <FormControlLabel
                          key={attempt}
                          value={attempt}
                          control={<Radio />}
                          label={attempt}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Box>

              {/* Next Steps Section */}
              <Box mb={6}>
                <Typography variant="h6" gutterBottom>
                  🚀 Next Steps
                </Typography>

                <Box display="flex" flexDirection="column" gap={4}>
                  <FormControl>
                    <FormLabel>
                      Would you like a free 15-minute discovery call?
                    </FormLabel>
                    <RadioGroup
                      value={formData.discoveryCall ? "yes" : "no"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          discoveryCall: e.target.value === "yes",
                        })
                      }
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>

                  <TextField
                    label="Any other details you'd like to share?"
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.additionalDetails}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        additionalDetails: e.target.value,
                      })
                    }
                  />
                </Box>
              </Box>

              {/* Privacy Notice */}
              <Alert severity="info" sx={{ mb: 4 }}>
                <Typography variant="body2">
                  <strong>Privacy Notice:</strong> We respect your privacy. All
                  information shared will be kept confidential and used solely
                  to assess and address your tech challenge.
                </Typography>
              </Alert>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  disabled={submitStatus.loading}
                  className={`px-6 py-2 font-medium w-fit transition-all shadow-[3px_3px_0px_black] 
      ${
        submitStatus.loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-500 hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] text-white"
      }`}
                >
                  {submitStatus.loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default TechChallengePage;
