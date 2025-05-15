// app/api/submit-idea/route.ts
import { NextResponse } from "next/server";
import { transporter } from "../../../lib/email/config";
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

interface IdeaSubmission {
  name: string;
  email: string;
  website?: string;
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
}

export async function POST(request: Request) {
  try {
    const formData: IdeaSubmission = await request.json();

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

     await writeToGoogleSheets(formData);

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

    return NextResponse.json({
      message:
        "Form submitted successfully! We'll review your idea and get back to you soon.",
    });
  } catch (error) {
    console.error("Error processing form submission:", error);

    return NextResponse.json(
      { message: "Failed to process your submission. Please try again." },
      { status: 500 }
    );
  }
}


async function writeToGoogleSheets(formData: IdeaSubmission) {
  try {
    // Create a JWT client using service account credentials
    const client = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Create Google Sheets API instance
    const sheets = google.sheets({ version: 'v4', auth: client });

    // Format the values for Google Sheets
    const values = [
      [
        formData.name,
        formData.email,
        formData.website || '',
        formData.ideaSentence,
        formData.problem,
        formData.solution,
        formData.buildStatus || '',
        formData.validationStatus,
        formData.helpNeeded.join(', '),
        formData.fundingStatus,
        formData.fundingAmount || '',
        formData.runway,
        formData.partnership || '',
        formData.gtm || '',
        formData.whySelect || '',
        new Date().toISOString(), // Timestamp
      ],
    ];

    // Append the data to the spreadsheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A2', // Start appending after header row
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error writing to Google Sheets:', error);
    throw error;
  }
}
