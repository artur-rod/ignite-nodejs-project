import { container } from "tsyringe";

import { S3StorageProvider } from "./implementations/S3StorageProvides";
import { StorageProviderInMemory } from "./implementations/StorageProviderInMemory";
import { IStorageProvider } from "./IStorageProvider";

const STORAGE = {
  LOCAL: StorageProviderInMemory,
  ONLINE: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  STORAGE[process.env.STORAGE_TYPE]
);
