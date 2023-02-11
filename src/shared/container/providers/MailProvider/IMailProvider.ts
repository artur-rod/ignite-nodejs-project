interface ISendMailRequest {
  from: string;
  to: string;
  subject: string;
  variables: any;
  templatePath: string;
}

interface IMailProvider {
  sendMail(data: ISendMailRequest): Promise<void>;
}

export { IMailProvider, ISendMailRequest };
