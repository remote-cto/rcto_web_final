//app/api/submit-idea
import { NextResponse } from "next/server";
import { transporter } from "../../../lib/email/config";
import connectDB from "../../../lib/db/connect";
import IdeaSubmission from "../../../models/IdeaSubmission";

interface IdeaSubmissionData {
  name: string;
  email: string;
  website?: string;
  referralSource?: string;  
  ideaSentence: string;
  problem: string;
  solution: string;
  buildStatus?: string;
  validationStatus: string;
  helpNeeded: string[];
  fundingStatus: string;
  fundingAmount?: string;
  runway: string;
  partnership?: string;
  gtm?: string;
  whySelect?: string;
  processingFlag?: number;
}

export async function POST(request: Request) {
  try {
    const formData: IdeaSubmissionData = await request.json();

    // Default to processing both database and email (for backward compatibility)
    const processingFlag =
      formData.processingFlag !== undefined ? formData.processingFlag : 2;

    if (
      !formData.name ||
      !formData.email ||
      !formData.ideaSentence ||
      !formData.problem ||
      !formData.solution
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(String(formData.email).toLowerCase())) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    let ideaSubmissionId = null;

    if (processingFlag === 1 || processingFlag === 2) {
      // Connect to MongoDB
      await connectDB();

      const ideaSubmission = new IdeaSubmission(formData);
      await ideaSubmission.save();

      ideaSubmissionId = ideaSubmission._id;
    }

    if (processingFlag === 0 || processingFlag === 2) {
      const helpNeededText =
        formData.helpNeeded.length > 0
          ? formData.helpNeeded.join(", ")
          : "None specified";

      const emailHtml = `
        <h1>New Startup Idea Submission</h1>
        <h2>Founder Information</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Website:</strong> ${formData.website || "Not provided"}</p>
         <p><strong>Referral Source:</strong> ${formData.referralSource || "Not specified"}</p>
        
        <h2>The Idea</h2>
        <p><strong>Idea in one sentence:</strong> ${formData.ideaSentence}</p>
        <p><strong>Problem it solves:</strong> ${formData.problem}</p>
        <p><strong>Solution differentiation:</strong> ${formData.solution}</p>
        
        <h2>Execution Status</h2>
        <p><strong>Build Status:</strong> ${
          formData.buildStatus || "Not provided"
        }</p>
        <p><strong>Validation Status:</strong> ${formData.validationStatus}</p>
        <p><strong>Help Needed:</strong> ${helpNeededText}</p>
        
        <h2>Financial Readiness</h2>
        <p><strong>Funding Status:</strong> ${formData.fundingStatus}</p>
        <p><strong>Funding Amount:</strong> ${
          formData.fundingAmount || "Not provided"
        }</p>
        <p><strong>Runway:</strong> ${formData.runway}</p>
        <p><strong>Partnership:</strong> ${
          formData.partnership || "Not specified"
        }</p>
        
        <h2>Vision & Fit</h2>
        <p><strong>Go-to-Market Plan:</strong> ${
          formData.gtm || "Not provided"
        }</p>
        <p><strong>Why Select:</strong> ${
          formData.whySelect || "Not provided"
        }</p>
      `;

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.HOST_EMAIL,
        subject: `[Idea Submission] ${formData.ideaSentence}`,
        html: emailHtml,
        replyTo: formData.email,
      };

      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json({
      message:
        "Form submitted successfully! We'll review your idea and get back to you soon.",
      success: true,
      ideaId: ideaSubmissionId,
      processingMode:
        processingFlag === 0
          ? "email-only"
          : processingFlag === 1
          ? "database-only"
          : "both",
    });
  } catch (error) {
    console.error("Error processing form submission:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        message: "Failed to process your submission. Please try again.",
        error: errorMessage,
        success: false,
      },
      { status: 500 }
    );
  }
}
