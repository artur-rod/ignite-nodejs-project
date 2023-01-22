import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  // eslint-disable-next-line prettier/prettier
  PrimaryColumn
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Category } from "./category";

@Entity("cars")
class Car {
  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.available = true;
    }
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;
}

export { Car };
