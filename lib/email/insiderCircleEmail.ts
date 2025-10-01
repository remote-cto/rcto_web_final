//lib/email/insiderCircleEmail.ts

import { transporter } from "./config";

interface InsiderCircleFormData {
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

interface EmailResponse {
  success: boolean;
  error?: string;
}

export async function sendInsiderCircleEmail(
  formData: InsiderCircleFormData
): Promise<EmailResponse> {
  const adminEmailContent = `
    New Insider Circle Submission

    Basic Information:
    -----------------
    Full Name: ${formData.fullName}
    Email: ${formData.email}
    Phone: ${formData.phone || "Not provided"}

    Company Details:
    ---------------
    Company Name: ${formData.companyName}
    Website/LinkedIn URL: ${formData.websiteUrl}

    Current Situation:
    -----------------
    Technology Priorities: ${formData.priorities.join(", ")}
    
    Biggest Challenge:
    ${formData.challenge}

    Current Tech Stage: ${formData.techStage}

    Communication Preferences:
    -------------------------
    Opted in for insights/updates: ${formData.optIn ? "Yes" : "No"}
  `;

  const userConfirmationContent = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <p style="margin-bottom: 14px;">Dear ${formData.fullName},</p>

    <p style="margin-bottom: 14px;">Welcome to the <strong>Remote CTO Insider Circle!</strong> 🎉</p>

    <p style="margin-bottom: 14px;">Thank you for joining our exclusive community. We're excited to have you on board and look forward to helping ${formData.companyName} achieve its technology goals.</p>

    <h3 style="margin-bottom: 10px; color: #0073e6;">What Happens Next?</h3>

    <p style="margin-bottom: 14px;">Our team will review your priorities and challenges, and we'll reach out to you within <strong>24-48 hours</strong> with:</p>

    <ul style="margin-bottom: 14px; padding-left: 20px;">
      <li style="margin-bottom: 8px;">📊 Your personalized technology assessment</li>
      <li style="margin-bottom: 8px;">💡 Exclusive insights tailored to your needs</li>
      <li style="margin-bottom: 8px;">🎯 Priority access to our solutions and services</li>
    </ul>

    <h3 style="margin-bottom: 10px; color: #0073e6;">As an Insider Circle Member, You Get:</h3>

    <ul style="margin-bottom: 14px; padding-left: 20px;">
      <li style="margin-bottom: 8px;"><strong>✅ Early Access</strong> – Be the first to know about new tools, services, and insights</li>
      <li style="margin-bottom: 8px;"><strong>✅ Expert Guidance</strong> – Direct access to our team of technology experts</li>
      <li style="margin-bottom: 8px;"><strong>✅ Priority Support</strong> – Fast-tracked responses to your queries</li>
      <li style="margin-bottom: 8px;"><strong>✅ Exclusive Content</strong> – Compliance tips, cybersecurity updates, and industry best practices</li>
    </ul>

    <p style="margin-bottom: 14px;">
      If you have any immediate questions, feel free to reach out to us at 
      <a href="https://wa.me/9662512899" target="_blank" style="color: #0073e6; font-weight: bold; text-decoration: none;">+91 966-251-2899</a>.
    </p>

    <h3 style="margin-bottom: 10px; color: #0073e6;">About Remote CTO</h3>

    <p style="margin-bottom: 10px;">We bring <strong>25+ years of expertise</strong> to help businesses scale their technology:</p>

    <ul style="margin-bottom: 14px; padding-left: 20px;">
      <li style="margin-bottom: 8px;"><strong>🔷 Deep Tech IT Solutions</strong> – AI-driven automation, scalable data systems, and cybersecurity</li>
      <li style="margin-bottom: 8px;"><strong>🔷 Fractional CTO Services</strong> – Strategic tech leadership without full-time costs</li>
      <li style="margin-bottom: 8px;"><strong>🔷 IT Managed Services</strong> – End-to-end IT management and 24/7 monitoring</li>
    </ul>

    <p style="margin-bottom: 14px;">
      Learn more: <a href="https://www.remotecto.in" style="color: #0073e6; font-weight: bold; text-decoration: none;">www.remotecto.in</a>
    </p>

    <p style="margin-bottom: 14px;">We look forward to partnering with you on your technology journey!</p>

    <p>Best regards,<br/>
    <strong>The Remote CTO Team</strong></p>
  </div>
`;

  try {
    // Send email to admin
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.HOST_EMAIL,
      subject: `New Insider Circle Member: ${formData.fullName} from ${formData.companyName}`,
      text: adminEmailContent,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: formData.email,
      subject: "Welcome to the Remote CTO Insider Circle! 🎉",
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