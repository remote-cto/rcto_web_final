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
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <p style="margin-bottom: 14px;">Dear ${formData.fullName},</p>

    <p style="margin-bottom: 14px;">Thank you for submitting your Tech Challenge Form to <strong>Remote CTO</strong>. We appreciate you taking the time to share your technical challenges with us.</p>

    <p style="margin-bottom: 14px;">Our team will carefully review your submission and get back to you within <strong>24-48 hours</strong>.</p>

    <p style="margin-bottom: 14px;">
      If you have any immediate questions, please don't hesitate to reach out to us at 
     <a href="https://wa.me/9662512899" target="_blank"> <span style="font-weight: bold;">+91 966-251-2899</span></a>.
    </p>

    <h3 style="margin-bottom: 10px;">ABOUT REMOTE CTO</h3>

    <p style="margin-bottom: 10px;">We get it—technology is complex, and scaling it the right way is critical. At <strong>Remote CTO</strong>, we bring <strong>25+ years of expertise</strong> to help businesses with:</p>

    <ul style="margin-bottom: 10px; padding-left: 20px;">
      <li style="margin-bottom: 8px;"><strong>✅ Deep Tech IT Solutions –</strong> AI-driven automation, scalable data systems, and cybersecurity. <em>Design + Build + Deployment</em> capability.</li>
      <li style="margin-bottom: 8px;"><strong>✅ Fractional CTO Services –</strong> Strategic tech leadership for startups & enterprises <strong>WITHOUT THE FULL-TIME COST</strong>.</li>
      <li><strong>✅ IT Managed Services –</strong> End-to-end IT management, cloud security, and 24/7 monitoring.</li>
    </ul>

    <p style="margin-bottom: 10px;">Think of us as your extended tech team—whether you need advisory, implementation, or full-scale IT management, we've got you covered.</p>

    <p style="margin-bottom: 10px;">
      <a href="https://www.remotecto.in" style="color: #0073e6; font-weight: bold; text-decoration: none;">www.remotecto.in</a>
    </p>

    <p>Best regards,<br/>
    <strong>The Remote CTO Team</strong></p>
  </div>
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
      html: userConfirmationContent,
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
