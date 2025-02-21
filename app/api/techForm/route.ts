//app/api/techForm/route.ts

import { NextResponse } from 'next/server';
import { sendTechChallengeEmail } from '@/lib/email/techFormEmail';
import { type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();
    
    // Validate required fields
    const requiredFields = [
      'fullName',
      'companyName',
      'email',
      'phone',
      'challengeArea',
      'description',
      'duration',
      'impact',
      'previousAttempts',
      'discoveryCall'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const result = await sendTechChallengeEmail(formData);
    
    if (result.success) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      throw new Error(result.error || 'Failed to send email');
    }
  } catch (error) {
    console.error('Error in email API route:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      },
      { status: 500 }
    );
  }
}

// Optionally, you can also implement other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}