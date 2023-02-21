import { SES } from "aws-sdk";
import fs from "fs";
import Handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider, ISendMailRequest } from "../IMailProvider";

class SESProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: {
        ses: new SES({
          apiVersion: "2010-12-01",
          region: process.env.AWS_REGION,
        }),
        aws: SES,
      },
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

    await this.client.sendMail({
      from,
      to,
      subject,
      html: compileTemplate(variables),
    });
  }
}

export { SESProvider };
