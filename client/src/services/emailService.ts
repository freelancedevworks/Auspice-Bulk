import emailjs from '@emailjs/browser';

// Get these from your EmailJS dashboard
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // The ID of the template you just created
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

interface EmailData {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject?: string;
}

export const sendEmail = async (data: EmailData) => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: data.name,
        from_email: data.email,
        phone_number: data.phone,
        message: data.message,
        subject: data.subject || "New Contact Form Submission",
        to_name: "AuspiceBulk Team",
        reply_to: data.email,
      },
      PUBLIC_KEY
    );

    return response;
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
}; 