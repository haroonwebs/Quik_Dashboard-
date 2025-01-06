import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 256 })
  order_name!: string;

  @Column({ type: "text", nullable: true })
  order_description!: string;

  @Column({ type: "decimal" })
  order_value!: number;

  @Column({ type: Date })
  delivery_date!: Date;

  @Column({
    type: "enum",
    enum: ["active", "delayed", "delivered"],
    default: "active",
  })
  order_status: string | undefined;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at!: Date;
}
