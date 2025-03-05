// import { MailerModule } from '@nestjs-modules/mailer';
// // import nodemailer from 'nodemailer';

// // const transporter = nodemailer.createTransport({
// //   service: 'gmail', // Use your email service provider
// //   host: 'smtp.gmail.com', // Replace with your SMTP server
// //   port: 587, // Use 587 for STARTTLS
// //   secure: false,
// //   auth: {
// //     user: process.env.EMAIL_USER, // Your email address
// //     pass: process.env.EMAIL_PASS, // Your email password
// //   },
// //   tls: {
// //     rejectUnauthorized: false,
// //   },
// // });

// const transporter = MailerModule.forRootAsync({
//   useFactory: () => ({
//     transport: {
//       host: 'smtp.gmail.com',
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   }),
// });

// export const sendEmail = async (to: string, subject: string, text: string) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     text,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };

// graduate_project/backend/src/utils/emailService.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: to, // List of recipients
      subject: subject, // Subject line
      text: text, // Plain text body
    };

    try {
      await this.mailerService.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
export default EmailService;
