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
  Button,
  Box,
  Container,
  Alert,
} from "@mui/material";

import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import FormHeader from "../components/FormHeader";

interface FormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  businessDescription: string;
  challengeArea: string;
  otherChallengeArea: string;
  description: string;
  duration: string;
  impact: string;
  previousAttempts: string;
  discoveryCall: string;
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
    businessDescription: "",
    challengeArea: "",
    otherChallengeArea: "",
    description: "",
    duration: "",
    impact: "",
    previousAttempts: "",
    discoveryCall: "yes",
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
        body: JSON.stringify({
          ...formData,
          discoveryCall: formData.discoveryCall === "yes",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          loading: false,
          error: null,
          success: true,
        });

        toast.success(
          "Form submitted successfully! We will get back to you soon."
        );

        setFormData({
          fullName: "",
          companyName: "",
          email: "",
          phone: "",
          businessDescription: "",
          challengeArea: "",
          otherChallengeArea: "",
          description: "",
          duration: "",
          impact: "",
          previousAttempts: "",
          discoveryCall: "yes",
          additionalDetails: "",
        });

        router.push("/tc/thankyou");
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

      toast.error(errorMessage);
    }
  };

  // Blue and white themed styles
  const blueThemeStyles = {
    "& label.Mui-focused": {
      color: "#1a73e8", // Google blue
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#1a73e8",
      },
      "&:hover fieldset": {
        borderColor: "#4285f4", // Lighter blue on hover
      },
    },
    "& .MuiFormLabel-root": {
      color: "#5f6368", // Dark gray for labels
    },
  };

  return (
    <>
      <FormHeader />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f8faff", // Very light blue background
          py: 8,
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Container maxWidth="md">
          <Card
            sx={{
              background: "#ffffff",
              boxShadow: "0 8px 24px rgba(26, 115, 232, 0.12)",
              borderRadius: "12px",
              border: "1px solid rgba(26, 115, 232, 0.1)",
              overflow: "hidden",
            }}
          >
            <Box 
              sx={{ 
                bgcolor: "#1a73e8", 
                py: 3, 
                px: 4 
              }}
            >
              <Typography
                // variant="h4"
                color="white"
                gutterBottom
                className="font-['Switzer'] text-xl lg:text-4xl font-bold"
              >
                Remote CTO - Tech Challenge Submission
              </Typography>
              <Typography variant="subtitle1" color="rgba(255, 255, 255, 0.85)">
                Struggling with a tech issue? Share your challenge, and our
                experts will help you find the right solution!
              </Typography>
            </Box>

            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                {/* Basic Information Section */}
                <Box mb={6}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      color: "#1a73e8", 
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 1
                    }}
                  >
                    📝 Basic Information
                  </Typography>

                  <Box display="flex" flexDirection="column" gap={3}>
                    <TextField
                      sx={blueThemeStyles}
                      label="Full Name"
                      required
                      fullWidth
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />

                    <TextField
                      sx={blueThemeStyles}
                      label="Company Name"
                      required
                      fullWidth
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          companyName: e.target.value,
                        })
                      }
                    />

                    <TextField
                      sx={blueThemeStyles}
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
                      sx={blueThemeStyles}
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
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      color: "#1a73e8", 
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 1
                    }}
                  >
                    💡 About Your Tech Challenge
                  </Typography>

                  <Box display="flex" flexDirection="column" gap={4}>
                    <TextField
                      sx={blueThemeStyles}
                      label="Describe Your Business in Simple Words"
                      required
                      fullWidth
                      multiline
                      rows={3}
                      value={formData.businessDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessDescription: e.target.value,
                        })
                      }
                      helperText="Example: We run an online tutoring platform and need better management for our classes."
                    />

                    <TextField
                      sx={blueThemeStyles}
                      label="Briefly describe your tech challenge"
                      required
                      fullWidth
                      multiline
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      helperText="Example: Our website is slow, and students complain about login issues."
                    />

                    <FormControl required>
                      <FormLabel sx={{ color: "#5f6368" }}>
                        What Are Some Features You Think Would Help?
                      </FormLabel>
                      <RadioGroup
                        value={formData.challengeArea}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            challengeArea: e.target.value,
                          })
                        }
                        sx={{
                          "& .MuiRadio-root": {
                            color: "#4285f4",
                            "&.Mui-checked": {
                              color: "#1a73e8",
                            },
                          },
                        }}
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
                        sx={blueThemeStyles}
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

                    <FormControl>
                      <FormLabel sx={{ color: "#5f6368" }}>
                        What's the impact of this challenge on your business?
                      </FormLabel>
                      <RadioGroup
                        value={formData.impact}
                        onChange={(e) =>
                          setFormData({ ...formData, impact: e.target.value })
                        }
                        sx={{
                          "& .MuiRadio-root": {
                            color: "#4285f4",
                            "&.Mui-checked": {
                              color: "#1a73e8",
                            },
                          },
                        }}
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
                      <FormLabel sx={{ color: "#5f6368" }}>
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
                        sx={{
                          "& .MuiRadio-root": {
                            color: "#4285f4",
                            "&.Mui-checked": {
                              color: "#1a73e8",
                            },
                          },
                        }}
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
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      color: "#1a73e8", 
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 1
                    }}
                  >
                    🚀 Next Steps
                  </Typography>

                  <Box display="flex" flexDirection="column" gap={4}>
                    <FormControl required>
                      <FormLabel sx={{ color: "#5f6368" }}>
                        Would you like a free 15-minute discovery call to
                        discuss this further?
                      </FormLabel>
                      <RadioGroup
                        value={formData.discoveryCall}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            discoveryCall: e.target.value,
                          })
                        }
                        sx={{
                          "& .MuiRadio-root": {
                            color: "#4285f4",
                            "&.Mui-checked": {
                              color: "#1a73e8",
                            },
                          },
                        }}
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
                      sx={blueThemeStyles}
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
                <Alert 
                  severity="info" 
                  sx={{ 
                    mb: 4,
                    bgcolor: "rgba(26, 115, 232, 0.1)",
                    "& .MuiAlert-icon": {
                      color: "#1a73e8"
                    }
                  }}
                >
                  <Typography variant="body2">
                    <strong>Privacy Notice:</strong> We respect your privacy.
                    All information shared will be kept confidential and used
                    solely to assess and address your tech challenge.
                  </Typography>
                </Alert>

                <Box display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    disabled={submitStatus.loading}
                    variant="contained"
                    sx={{
                      px: 4,
                      py: 1.5,
                      backgroundColor: "#1a73e8",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(26, 115, 232, 0.3)",
                      "&:hover": {
                        backgroundColor: "#0d65db",
                      },
                      "&:disabled": {
                        backgroundColor: "#ccc",
                      },
                      fontWeight: "medium",
                    }}
                  >
                    {submitStatus.loading ? "Submitting..." : "Submit"}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default TechChallengePage;