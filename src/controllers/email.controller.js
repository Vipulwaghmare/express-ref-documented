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

// ! Send mail
// const data = {
//   to: 'vipulwaghmare222@gmail.com',
//   subject: 'Test',
//   text: 'Text whre will this be',
//   html: '<h1>Hello this is h1 tag</h1>'
// }
// const test = sendMail(data)
// res.send(test);

const sendMail = (data) => {
  const mailData = getMailData(data);
  transporter.sendMail(mailData, (error, info) => {
    console.log({ error, info });
    if (error) return { error: error };
    return { success: `Message Sent Successsfully. ID: ${info.messageId}` };
  });
};

module.exports = sendMail;
