import fs from "fs";
import { resolve } from "path";

import upload from "@config/upload";

import { IStorageProvider } from "../IStorageProvider";

class StorageProviderInMemory implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    );

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const path = `${upload.tmpFolder}/${folder}/${file}`;

    try {
      await fs.promises.stat(path);
    } catch {
      return;
    }

    await fs.promises.unlink(path);
  }
}

export { StorageProviderInMemory };
