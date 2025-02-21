import { transporter } from "./config";

interface TechChallengeFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  challengeArea: string;
  otherChallengeArea?: string;
  description: string;
  duration: string;
  impact: string;
  previousAttempts: string;
  discoveryCall: boolean;
  additionalDetails?: string;
}

interface EmailResponse {
  success: boolean;
  error?: string;
}

export async function sendTechChallengeEmail(
  formData: TechChallengeFormData
): Promise<EmailResponse> {
  const adminEmailContent = `
    New Tech Challenge Submission

    Basic Information:
    -----------------
    Full Name: ${formData.fullName}
    Company Name: ${formData.companyName}
    Email: ${formData.email}
    Phone: ${formData.phone}

    Tech Challenge Details:
    ---------------------
    Challenge Area: ${formData.challengeArea}
    ${
      formData.challengeArea === "Other"
        ? `Other Challenge Area: ${formData.otherChallengeArea}`
        : ""
    }
    Description: ${formData.description}
    Duration: ${formData.duration}
    Impact: ${formData.impact}
    Previous Attempts: ${formData.previousAttempts}

    Next Steps:
    ----------
    Discovery Call Requested: ${formData.discoveryCall ? "Yes" : "No"}
    Additional Details: ${formData.additionalDetails || "None provided"}
  `;

  const userConfirmationContent = `
    Dear ${formData.fullName},

    Thank you for submitting your Tech Challenge Form to Remote-CTO. We appreciate you taking the time to share your technical challenges with us.

    Our team will carefully review your submission and get back to you within 24-48 hours.

    If you have any immediate questions, please don't hesitate to reach out to us.

    Best regards,
    The Remote-CTO Team
  `;

  try {
    // Send email to admin
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.HOST_EMAIL,
      subject: `New Tech Challenge Submission from ${formData.fullName}`,
      text: adminEmailContent,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: formData.email,
      subject: "Thank you for your Tech Challenge submission - Remote-CTO",
      text: userConfirmationContent,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
