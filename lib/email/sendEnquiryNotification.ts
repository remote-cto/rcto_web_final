//lib/email/sendEnquiryNotification.ts

import { transporter } from './config';

interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function sendEnquiryNotification(enquiryData: EnquiryData) {
  const { name, email, phone, message } = enquiryData;
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.HOST_EMAIL, 
    subject: 'New Customer Enquiry Received',
    html: `
      <h2>New Customer Enquiry Details</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Enquiry notification email sent successfully');
  } catch (error) {
    console.error('Error sending enquiry notification email:', error);
    throw error;
  }
}