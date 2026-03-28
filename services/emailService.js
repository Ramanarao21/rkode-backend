import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async ({ subject, html }) => {
  try {
    console.log("📧 Sending email to:", process.env.SENDER_EMAIL);
    
    const info = await transporter.sendMail({
      from: `"RKode Form" <${process.env.EMAIL}>`,
      to: process.env.SENDER_EMAIL,
      subject,
      html,
    });
    
    console.log("✅ Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("❌ Email failed:", err.message);
    return { success: false, error: err.message };
  }
};

// Generate email template for form submission
export const generateFormSubmissionEmail = (formData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          border-radius: 10px 10px 0 0;
          text-align: center;
        }
        .content {
          background: #f9f9f9;
          padding: 30px;
          border: 1px solid #ddd;
          border-radius: 0 0 10px 10px;
        }
        .field {
          margin-bottom: 20px;
          padding: 15px;
          background: white;
          border-radius: 5px;
          border-left: 4px solid #667eea;
        }
        .label {
          font-weight: bold;
          color: #667eea;
          font-size: 12px;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        .value {
          color: #333;
          font-size: 16px;
        }
        .message-box {
          background: white;
          padding: 20px;
          border-radius: 5px;
          border: 1px solid #ddd;
          margin-top: 10px;
          white-space: pre-wrap;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🎉 New Form Submission</h1>
        <p>You have received a new contact form submission</p>
      </div>
      
      <div class="content">
        <div class="field">
          <div class="label">Full Name</div>
          <div class="value">${formData.firstName} ${formData.lastName}</div>
        </div>
        
        <div class="field">
          <div class="label">Email Address</div>
          <div class="value">${formData.email}</div>
        </div>
        
        <div class="field">
          <div class="label">Enquiry Type</div>
          <div class="value">${formData.enquiryType}</div>
        </div>
        
        <div class="field">
          <div class="label">Message</div>
          <div class="message-box">${formData.message}</div>
        </div>
        
        <div class="field">
          <div class="label">Submitted At</div>
          <div class="value">${new Date(formData.createdAt).toLocaleString()}</div>
        </div>
      </div>
      
      <div class="footer">
        <p>This email was sent from your RKode contact form</p>
        <p>Submission ID: #${formData.id}</p>
      </div>
    </body>
    </html>
  `;
};
