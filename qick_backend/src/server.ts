import express from "express";
import { AppDataSource } from "./dbConnection";
import router from "./routes/applicationRoutes";

import cors from "cors";

import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

AppDataSource.initialize()
  .then(() => {
    console.log("Postgres is connected successfully");

    // user routes
    app.use("/api/v1", router);

    // server setup is here

    app.listen(PORT, (): void => {
      console.log(`servier is running at Port ${PORT}`);
    });
  })
  .catch((e: any) => {
    console.log("error while connecting database" + e);
  });
