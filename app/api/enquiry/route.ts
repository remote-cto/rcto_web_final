import { NextRequest } from 'next/server'; 
import connectDB from '../../../lib/db/connect';
import Enquiry from '../../../models/Enquiry';

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    // Parse incoming JSON data from the request
    const { name, email, phone, message } = await req.json();

    // Create a new Enquiry document
    const newEnquiry = new Enquiry({
      name,
      email,
      phone,
      message,
    });

    // Save the Enquiry to the database
    await newEnquiry.save();

    // Respond with a success message
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
