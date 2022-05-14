import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "97b9a0db697ad0",
    pass: "22c11c3b974ad8"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
      await transport.sendMail({
        from: "Equipe Feedget <oi@feedget.com>",
        to: "Ricardo Lopes <prslopes1@gmail.com>",
        subject: subject,
        html: body
      });
  
    }
}