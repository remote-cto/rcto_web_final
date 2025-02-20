import { transporter } from './config';

// Define the form data interface
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

// Define the email response interface
interface EmailResponse {
  success: boolean;
  error?: string;
}

export async function sendTechChallengeEmail(formData: TechChallengeFormData): Promise<EmailResponse> {
  const emailContent = `
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
    ${formData.challengeArea === 'Other' ? `Other Challenge Area: ${formData.otherChallengeArea}` : ''}
    Description: ${formData.description}
    Duration: ${formData.duration}
    Impact: ${formData.impact}
    Previous Attempts: ${formData.previousAttempts}

    Next Steps:
    ----------
    Discovery Call Requested: ${formData.discoveryCall ? 'Yes' : 'No'}
    Additional Details: ${formData.additionalDetails || 'None provided'}
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.HOST_EMAIL,
      subject: `New Tech Challenge Submission from ${formData.fullName}`,
      text: emailContent,
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}