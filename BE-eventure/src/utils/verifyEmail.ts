import nodemailer from "nodemailer";
import "dotenv/config";
export const sendVerificationEmail = async (email: string, token: string) => {
  if (!email || typeof email !== "string" || !/\S+@\S+\.\S+/.test(email)) {
    throw new Error("Invalid or missing recipient email address.");
  }

  console.log("Sending email to:", email); // Debug log for email
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  const verificatinUrl = `${process.env.PATH_URL}/api/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "verify email",
    html: `
  <h1>Email Verification</h1>
  <p>Please click the link below to verify your email </p>
  <a href=${verificatinUrl}>confirm verify email</a>
  `,
  };

  const info = await transport.sendMail(mailOptions);
  console.log("Email sent: ", info.response);
};
