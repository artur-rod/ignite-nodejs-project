import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import upload from "@config/upload";

import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const path = resolve(upload.tmpFolder, file);
    const fileContent = await fs.promises.readFile(path);

    const fileType = mime.getType(path);

    await this.client
      .putObject({
        Bucket: process.env.AWS_BUCKET,
        Key: `${folder}/${file}`,
        Body: fileContent,
        ContentType: fileType,
        ACL: "public-read",
      })
      .promise();

    await fs.promises.unlink(path);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key: `${folder}/${file}`,
      })
      .promise();
  }
}

export { S3StorageProvider };
