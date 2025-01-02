import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models /usersModel";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",

  port: Number(process.env.DATABASE_PORT) || 5432,
  username: "postgres",
  password: process.env.DATABASE_PASSWORD || "803722",
  database: process.env.DATABASE_NAME || "qick_project",
  synchronize: true,
  logging: false,
  entities: [User],
});
