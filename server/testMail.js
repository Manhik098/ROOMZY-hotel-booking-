// import 'dotenv/config';
// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 587,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// transporter.verify((error, success) => {
//   if (error) {
//     console.error("❌ SMTP Connection Failed:", error.message);
//   } else {
//     console.log("✅ SMTP Connection Successful");
//   }
// });

// const mailOptions = {
//   from: process.env.SENDER_EMAIL,
//   to: process.env.SENDER_EMAIL, // test by sending to self
//   subject: "Test Email from Hotel App",
//   text: "This is a test email from your app using Brevo SMTP.",
// };

// transporter.sendMail(mailOptions, (err, info) => {
//   if (err) {
//     console.error("❌ Failed to send email:", err.message);
//   } else {
//     console.log("✅ Email sent:", info.response);
//   }
// });
