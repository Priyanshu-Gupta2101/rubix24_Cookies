const nodemailer = require("nodemailer");

async function sendVerificationCode(email, code) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      secure: true,
    });

    const verificationLink = `${process.env.SERVER_URL}/verify-email/${email}/${code}`;

    const mail = await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: `Verify your Account`,
      secureConnection: true,
      text: "Hello. This email is for your email verification.",
      html: `
      <p>Dear User,</p>
        <p>Thank you for registering! Please use the following verification code to verify your account:</p>
        <h3>${code}</h3>
        <p>Click the link below to complete the verification process:</p>
        <a href="${verificationLink}">Verify Email</a>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best Regards,<br>Your Business Name</p>
            `,
    });

    console.log("Mail Sent", mail.messageId);
    return;
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
}

module.exports = sendVerificationCode;
