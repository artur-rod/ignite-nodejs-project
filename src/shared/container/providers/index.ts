import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayJS } from "./DateProvider/implementations/DayJS";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { Ethereal } from "./MailProvider/implementations/Ethereal";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvides";
import { StorageProviderInMemory } from "./StorageProvider/implementations/StorageProviderInMemory";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayJS);

container.registerInstance<IMailProvider>("MailProvider", new Ethereal());

const STORAGE = {
  LOCAL: StorageProviderInMemory,
  ONLINE: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  STORAGE[process.env.STORAGE_TYPE]
);
