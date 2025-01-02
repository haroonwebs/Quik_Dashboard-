import express from "express";
import { AppDataSource } from "./dbConnection";

import * as dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

AppDataSource.initialize()
  .then(() => {
    console.log("Postgres is connected successfully");
    app.listen(PORT, (): void => {
      console.log(`servier is running at Port ${PORT}`);
    });
  })
  .catch((e: any) => {
    console.log("error while connecting database" + e);
  });

// app.use("/api/v1", router);

// app.listen(PORT, (): void => {
//   console.log(`servier is running at Port ${PORT}`);
// });
