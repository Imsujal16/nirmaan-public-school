require('dotenv').config();
const nodemailer = require('nodemailer');

async function testSMTP() {
  console.log("Testing SMTP connection with credentials from .env...");
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE === 'true' || true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS.replace(/\s+/g, '') // remove spaces
    }
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_USER, // Send to self
      subject: "Test SMTP Email",
      text: "If you receive this, SMTP is working perfectly."
    });
    console.log("SUCCESS! Email sent. Message ID: " + info.messageId);
  } catch (error) {
    console.error("FAILED! SMTP Error:", error.message);
  }
}

testSMTP();
