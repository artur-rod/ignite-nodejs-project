import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayJS } from "./DateProvider/implementations/DayJS";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { Ethereal } from "./MailProvider/implementations/Ethereal";
import { StorageProviderInMemory } from "./StorageProvider/implementations/StorageProviderInMemory";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayJS);

container.registerInstance<IMailProvider>("MailProvider", new Ethereal());

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  StorageProviderInMemory
);
