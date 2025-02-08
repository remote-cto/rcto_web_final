import { NextRequest } from 'next/server';
import connectDB from '../../../lib/db/connect';
import Enquiry from '../../../models/Enquiry';
import { sendEnquiryNotification } from '../../../lib/email/sendEnquiryNotification';

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    // Parse incoming JSON data
    const enquiryData = await req.json();

    // Create a new Enquiry document
    const newEnquiry = new Enquiry(enquiryData);

    // Save to MongoDB
    await newEnquiry.save();

    // Send email notification
    await sendEnquiryNotification(enquiryData);

    return new Response(JSON.stringify({ message: 'Enquiry submitted successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error processing enquiry:', error);
    return new Response(JSON.stringify({ message: 'Failed to process enquiry' }), {
      status: 500,
    });
  }
}