import { AppDataSource } from "../dbConnection";
import { Order } from "../models /ordersModel";
import cron from "node-cron";

cron.schedule("*/5 * * * *", async () => {
  //run every 5 mints
  const orderRepository = AppDataSource.getRepository(Order);
  const currentDate = new Date();
  await orderRepository
    .createQueryBuilder()
    .update(Order)
    .set({ order_status: "delayed" })
    .where("delivery_date < :currentDate AND order_status != :status", {
      currentDate,
      status: "delivered",
    })
    .execute();
});
