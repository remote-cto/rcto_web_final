import { NextRequest } from "next/server";
import connectDB from "../../../lib/db/connect";
import Enquiry from "../../../models/Enquiry";
import { sendEnquiryNotification } from "../../../lib/email/sendEnquiryNotification";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const enquiryData = await req.json();

    const newEnquiry = new Enquiry(enquiryData);

    await newEnquiry.save();

    await sendEnquiryNotification(enquiryData);

    return new Response(
      JSON.stringify({ message: "Enquiry submitted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing enquiry:", error);
    return new Response(
      JSON.stringify({ message: "Failed to process enquiry" }),
      {
        status: 500,
      }
    );
  }
}
