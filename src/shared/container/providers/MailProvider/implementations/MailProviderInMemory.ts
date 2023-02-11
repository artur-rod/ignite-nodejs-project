import { IMailProvider, ISendMailRequest } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
  private messages = [];

  async sendMail({
    from,
    to,
    subject,
    variables,
    templatePath,
  }: ISendMailRequest): Promise<void> {
    this.messages.push({
      from,
      to,
      subject,
      variables,
      templatePath,
    });
  }
}

export { MailProviderInMemory };
