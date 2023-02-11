import fs from "fs";
import Handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider, ISendMailRequest } from "../IMailProvider";

class Ethereal implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        this.client = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async sendMail({
    from,
    to,
    subject,
    variables,
    templatePath,
  }: ISendMailRequest): Promise<void> {
    const template = fs.readFileSync(templatePath, { encoding: "utf-8" });
    const compileTemplate = Handlebars.compile(template);

    const message = await this.client.sendMail({
      from,
      to,
      subject,
      html: compileTemplate(variables),
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { Ethereal };
