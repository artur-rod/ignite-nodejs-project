import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
class User {
  constructor() {
    if (!this.id) this.id = uuidV4();
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  driver_license: string;

  @Column()
  admin: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: string;

  @Expose({ name: "avatar_url" })
  avatar_url(): string {
    switch (process.env.STORAGE_TYPE) {
      case "LOCAL":
        return `${process.env.EXPOSE_STORAGE_URL}/avatar/${this.avatar}`;
      case "ONLINE":
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      default:
        return null;
    }
  }
}

export { User };
