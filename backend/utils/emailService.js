import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendContactEmail = async ({ name, email, subject, message }) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.CONTACT_EMAIL,
    subject: `Portfolio Contact: ${subject || 'New Message'}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr>
      <p><small>Sent from Portfolio Website</small></p>
    `
  };

  await transporter.sendMail(mailOptions);
};
