const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: parseInt(process.env.SMTP_PORT),
  host: process.env.SMTP_SERVER,
  secure: false,
  auth: {
    user: process.env.SMTP_SENDER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const getMailData = ({ to, subject, text, html, attachment }) => ({
  from: process.env.SMTP_SENDER,
  to,
  subject,
  text,
  html,
  attachment,
});

const sendMail = (data) => {
  const mailData = getMailData(data);
  transporter.sendMail(mailData, (error, info) => {
    console.log({ error, info });
    if (error) return { error: error };
    return { success: `Message Sent Successsfully. ID: ${info.messageId}` };
  });
};

module.exports = sendMail;
