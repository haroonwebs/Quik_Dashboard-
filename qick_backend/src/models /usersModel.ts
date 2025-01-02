import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = "";

  @Column()
  email: string = "";

  @Column()
  password: string = "";

  @Column({
    type: "enum",
    enum: ["admin", "user"],
    default: "user",
  })
  role: string | undefined;
}
