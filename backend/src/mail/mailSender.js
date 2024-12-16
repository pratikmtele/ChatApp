import nodemailer from "nodemailer";

function MailSender(email, OTP) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.MAIL_AUTH_PASS,
    },
  });

  const body = `
    Dear User,\n
    Use the One Time Password (OTP) ${OTP} to forget your account password.
  `;

  var mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: "OTP for Authentication",
    text: body,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return error;
    }
  });
}

export default MailSender;
