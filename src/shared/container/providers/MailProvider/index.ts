import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { EtherealProvider } from "./implementations/EtherealProvider";
import { SESProvider } from "./implementations/SESProvider";

const MAILER = {
  LOCAL: container.resolve(EtherealProvider),
  ONLINE: container.resolve(SESProvider),
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  MAILER[process.env.MAILER_TYPE]
);
