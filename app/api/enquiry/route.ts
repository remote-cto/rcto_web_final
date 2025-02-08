import { NextRequest } from 'next/server';
import connectDB from '../../../lib/db/connect';
import Enquiry from '../../../models/Enquiry';

// Replace this with your Zapier webhook URL
const ZAPIER_WEBHOOK_URL = 'YOUR_ZAPIER_WEBHOOK_URL';

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    // Parse incoming JSON data
    const { name, email, phone, message } = await req.json();

    // Create a new Enquiry document
    const newEnquiry = new Enquiry({
      name,
      email,
      phone,
      message,
    });

    // Save to MongoDB
    await newEnquiry.save();

    // Send to Zapier webhook
    try {
      await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          submitDate: new Date().toISOString(),
        }),
      });
    } catch (zapierError) {
      console.error('Error sending to Zapier:', zapierError);
      // Continue execution even if Zapier fails
    }

    return new Response(JSON.stringify({ message: 'Enquiry submitted successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    return new Response(JSON.stringify({ message: 'Failed to submit enquiry' }), {
      status: 500,
    });
  }
}