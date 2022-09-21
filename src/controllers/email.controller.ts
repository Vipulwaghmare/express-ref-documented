import nodemailer from 'nodemailer'

// ENV VARIABLE TYPES
// !DUPLICATE
declare var process: {
  env: {
    SESSION_SECRET: string,
    MONGODB_URL: string,
    SMTP_SERVER: string,
    SMTP_PORT: string,
    SMTP_LOGIN: string,
    SMTP_PASSWORD: string,
    SMTP_SENDER: string
  }
}

const transporter = nodemailer.createTransport({
  port: parseInt(process.env.SMTP_PORT),
  host: process.env.SMTP_SERVER,
  secure: false,
  auth: {
    user: process.env.SMTP_SENDER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface Attachment {
  filename: string
  path: string
}

interface MailData {
  to: string
  subject: string
  text: string
  html: string
  attachment?: Attachment[]
}

interface MailDataRespnse {
  from: string
  to: string
  subject: string
  text: string
  html: string
  attachment?: Attachment[]
}

const getMailData = ({ to, subject, text, html, attachment }: MailData): MailDataRespnse => ({
  from: process.env.SMTP_SENDER,
  to,
  subject,
  text,
  html,
  attachment
})

const sendMail = (data: MailData) => {
  const mailData = getMailData(data)
  transporter.sendMail(mailData, (error, info) => {
    console.log({ error, info })
    if (error) return { 'error': error }
    return { 'success': `Message Sent Successsfully. ID: ${info.messageId}` }
  })
}

export default sendMail;