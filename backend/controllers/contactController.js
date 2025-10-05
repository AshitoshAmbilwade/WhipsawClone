import nodemailer from "nodemailer";

export const sendContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // NodeMailer transporter for Gmail App Password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password
      },
      secure: true, // use SSL
      port: 465
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Always your email
      replyTo: email, // User email
      to: process.env.EMAIL_USER, // Receive emails here
      subject: `Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error.response || error);
    res.status(500).json({ message: "Error sending email", error: error.message });
  }
};
