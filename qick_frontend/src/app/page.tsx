import usefetchOrders from "@/hooks/usefetchOrders";
import { ordertypes } from "@/types/ordertypes";
import LiveButton from "./(home)/components/LiveButton";
import Link from "next/link";
import DelayButton from "./(home)/components/DelayButton";
import AverageButton from "./(home)/components/AverageButton";
import DeliveredButton from "./(home)/components/DeliveredButton";
import BarChart from "./(home)/components/BarChart";

export default async function Home() {
  // used usefetchOrders hook to fetch all orders from the database
  const { orders, error } = await usefetchOrders(
    "http://localhost:4000/api/v1/orders"
  );
  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  const totalOrders = orders?.length;

  // filters for delayed orders
  const Delayed_orders: ordertypes[] = Array.isArray(orders)
    ? orders?.filter((order) => order.order_status == "delayed")
    : [];

  const totalDelay = Delayed_orders.length;
  const graterValueDelay = Array.isArray(Delayed_orders)
    ? Delayed_orders?.filter((grater) => grater.order_value > 1000).length
    : [];
  const lessValueDelay = Array.isArray(Delayed_orders)
    ? Delayed_orders?.filter((grater) => grater.order_value < 1000).length
    : [];

  // filters for delivered orders
  const Delivered_Orders: ordertypes[] = Array.isArray(orders)
    ? orders?.filter((order) => order.order_status === "delivered")
    : [];

  const totalDelivered = Delivered_Orders.length;
  const graterValueDelivered = Array.isArray(Delivered_Orders)
    ? Delivered_Orders?.filter((grater) => grater.order_value > 1000).length
    : [];
  const lessValueDelivered = Array.isArray(Delivered_Orders)
    ? Delivered_Orders?.filter((grater) => grater.order_value < 1000).length
    : [];

  // filters for Live order
  const Live_Orders: ordertypes[] = Array.isArray(orders)
    ? orders?.filter((order) =>
        [
          "pickup awaiting",
          "pickedup",
          "warehouse",
          "delivery attempt tried",
        ].includes(order.order_status)
      )
    : [];
  const totalLive = Live_Orders.length;
  const graterValueLive = Array.isArray(Live_Orders)
    ? Live_Orders?.filter((grater) => grater.order_value > 1000).length
    : [];
  const lessValueLive = Array.isArray(Live_Orders)
    ? Live_Orders?.filter((grater) => grater.order_value < 1000).length
    : [];
  // filters for average size of orders
  const totalOrdersForAverage: ordertypes[] = Array.isArray(orders)
    ? orders?.filter((order) =>
        [
          "pickup awaiting",
          "pickedup",
          "warehouse",
          "delivery attempt tried",
          "delivered",
          "delayed",
        ].includes(order.order_status)
      )
    : [];
  // calculate total Count of orders
  const totalOrdersCount = totalOrdersForAverage.length;
  // calculate total Value of orders
  const totalValue = totalOrdersForAverage.reduce((sum, order) => {
    return sum + Number(order.order_value);
  }, 0);

  const graterValueAverage = Array.isArray(totalOrdersForAverage)
    ? totalOrdersForAverage?.filter((grater) => grater.order_value > 1000)
        .length
    : [];
  const lessValueAverage = Array.isArray(totalOrdersForAverage)
    ? totalOrdersForAverage?.filter((grater) => grater.order_value < 1000)
        .length
    : [];

  // average value of orders
  const averageOrderValue = Math.floor(totalValue / totalOrdersCount);

  return (
    <section className="bg-[#F5F8FA] min-h-100">
      <main className="w-full h-auto flex justify-center gap-8 mt-4 shadow-md">
        <div className=" flex flex-col justify-center items-center w-[950px] h-[800px] border bg-[#FFFFFF] border-[#EFF2F5] rounded-tl-[8px] rounded-tr-[5px]">
          <div className="flex justify-between items-center px-2 h-[100px] w-full">
            <div className="flex flex-col px-4">
              <span className="text-[20px] font-[600px]">
                Orders Statistics
              </span>
              <span className="text-[#7E8299] text-[12px] font-[500px]">
                Last updated: Oct 10 at 4:00 PM
              </span>
            </div>
            <div className="flex w-[354px] h-[45px] gap-2">
              <div className="flex justify-evenly items-center bg-[#FAFAFA] w-[164px] h-[44px] rounded-lg">
                <img src="/images/Group 2022.png" alt="not found" />
                <span className="text-[12px] font-[600px]">Total orders</span>
                <span>{totalOrders}</span>
              </div>
              <div className="flex justify-evenly items-center bg-[#FAFAFA] w-[164px] h-[44px] rounded-lg">
                <img src="/images/Vector(2).png" alt="not found" />
                <span className="text-[12px] font-[600px]">
                  Delivered orders
                </span>
                <span>{Delivered_Orders?.length}</span>
              </div>
            </div>
          </div>
          {/* graph section */}

          <BarChart />
        </div>
        {/* sidebar code
         */}
        <div className=" flex flex-col shadow-lg  items-center w-[480px] h-auto border border-[#EFF2F5] gap-3 bg-[#FFFFFF] rounded-tl-[8px] rounded-tr-[5px]">
          <div className=" flex items-center justify-center  w-[406px] h-[47px] gap-2 border border-[#EFF2F5] rounded-md mt-6">
            <div className=" flex justify-center items-center w-[192px] gap-1 h-[32px] border border-[#EFF2F5] rounded-md bg-[#4FC9F3] hover:cursor-pointer hover:bg-white hover:border-none transition">
              {" "}
              <img
                className="w-4 h-3 bg-[#5E6278]"
                src="/images/Vector.png"
                alt="orders"
              />
              <Link href="/">
                <span>Orders</span>
              </Link>
            </div>
            <div className=" flex justify-center items-center w-[192px] gap-1 h-[32px] border border-[#EFF2F5] rounded-md hover:cursor-pointer ">
              {" "}
              <img
                className="w-4 h-3 ]"
                src="/images/Vector(1).png"
                alt="orders"
              />
              <Link href="/payouts">
                <span>Payouts</span>
              </Link>
            </div>
          </div>
          {/* selectbox */}
          <div className=" flex  justify-end w-[406px] h-[47px] gap-3  ">
            <span>Order Status</span>
            <div className="w-[300px] h-[35px] border border-[#EFF2F5] rounded-md ">
              <select
                className="w-[275px] h-[35px] text-[#7E8299] font-[500px] bg-transparent outline-none px-2"
                name=""
                id=""
              >
                <option value="select" className=" p-3 ">
                  select
                </option>
                <option value="select" className=" p-3 ">
                  Pickup Awaitng
                </option>
                <option value="select" className=" p-3 ">
                  Picked Up
                </option>
                <option value="select" className=" p-3 ">
                  Reached Warehouse
                </option>
                <option value="select" className=" p-3 ">
                  Delivery attempt tried
                </option>
                <option value="select" className=" p-3 ">
                  Delivered
                </option>
              </select>
            </div>
          </div>
          {/* date range */}
          <div className=" flex  justify-end w-[406px] h-[47px] gap-4  ">
            <span>Date Range</span>
            <div className="w-[300px] h-[35px] border border-[#EFF2F5] rounded-md px-2">
              <input
                type="Date"
                className="w-[275px] h-[35px] text-[#7E8299]  bg-transparent outline-none px-2"
              ></input>
            </div>
          </div>

          {/* dougnat graphs for live orders */}
          <LiveButton
            graterValue={graterValueLive}
            total={totalLive}
            lessValue={lessValueLive}
          />
          {/* dougnat graphs for delayed orders */}
          <DelayButton
            graterValue={graterValueDelay}
            lessValue={lessValueDelay}
            total={totalDelay}
          />
          {/* dougnat graphs for average order size  */}
          <AverageButton
            total={averageOrderValue}
            lessValue={lessValueAverage}
            graterValue={graterValueAverage}
          />
          {/* dougnat graphs for delivered */}
          <DeliveredButton
            graterValue={graterValueDelivered}
            lessValue={lessValueDelivered}
            total={totalDelivered}
          />
        </div>
      </main>
    </section>
  );
}
