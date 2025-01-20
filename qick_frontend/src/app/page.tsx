import usefetchOrders from "@/hooks/usefetchOrders";
import { ordertypes } from "@/types/ordertypes";
import LiveButton from "./(home)/components/LiveButton";
import Link from "next/link";
import DelayButton from "./(home)/components/DelayButton";
import AverageButton from "./(home)/components/AverageButton";
import DeliveredButton from "./(home)/components/DeliveredButton";
import BarChart from "./(home)/components/BarChart";
import TrendGraph from "@/components/TrendGraph";
import SelectOrderStatus from "@/components/SelectOrderStatus";

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
    ? Delayed_orders?.filter((grater) => grater.order_value > 1000)
    : [];
  const lessValueDelay = Array.isArray(Delayed_orders)
    ? Delayed_orders?.filter((grater) => grater.order_value < 1000)
    : [];

  // filters for delivered orders
  const Delivered_Orders: ordertypes[] = Array.isArray(orders)
    ? orders?.filter((order) => order.order_status === "delivered")
    : [];

  const totalDelivered = Delivered_Orders.length;
  const graterValueDelivered = Array.isArray(Delivered_Orders)
    ? Delivered_Orders?.filter((grater) => grater.order_value > 1000)
    : [];
  const lessValueDelivered = Array.isArray(Delivered_Orders)
    ? Delivered_Orders?.filter((grater) => grater.order_value < 1000)
    : [];

  // filters for Live order
  const Live_Orders: ordertypes[] = Array.isArray(orders)
    ? orders?.filter((order) =>
        [
          "pickup awaiting",
          "pickedup",
          "warehouse",
          "delivery attempt tried",
        ].includes(order?.order_status)
      )
    : [];
  const totalLive = Live_Orders.length;
  const graterValueLive = Array.isArray(Live_Orders)
    ? Live_Orders?.filter((grater) => grater.order_value > 1000)
    : [];
  const lessValueLive = Array.isArray(Live_Orders)
    ? Live_Orders?.filter((grater) => grater.order_value < 1000)
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
        ].includes(order?.order_status)
      )
    : [];
  // calculate total Count of orders
  const totalOrdersCount = totalOrdersForAverage.length;
  // calculate total Value of orders
  const totalValue = totalOrdersForAverage?.reduce((sum, order) => {
    return sum + Number(order.order_value);
  }, 0);

  const graterValueAverage = Array.isArray(totalOrdersForAverage)
    ? totalOrdersForAverage?.filter((grater) => grater.order_value > 1000)
    : [];
  const lessValueAverage = Array.isArray(totalOrdersForAverage)
    ? totalOrdersForAverage?.filter((grater) => grater.order_value < 1000)
    : [];

  // average value of orders
  const averageOrderValue = Math.floor(totalValue / totalOrdersCount);

  // for trend graph
  const calculate_TrendPercentage = (totalDelivered: any, totalOrders: any) => {
    if (totalOrders === 0) {
      return totalDelivered === 0 ? 0 : 100;
    }
    const trendPercentage =
      ((totalDelivered - totalOrders) / totalOrders) * 100;

    return trendPercentage;
  };
  const trendPercentage = calculate_TrendPercentage(
    totalDelivered,
    totalOrders
  );

  return (
    <section className="bg-[#F5F8FA] min-h-100">
      <main className="w-full h-auto flex flex-col md:flex-row justify-center gap-4 md:gap-8 mt-4 shadow-md">
        <div className="flex flex-col justify-center items-center w-full md:w-[950px] h-auto md:h-[800px] border bg-[#FFFFFF] border-[#EFF2F5] rounded-tl-[8px] rounded-tr-[5px]">
          <div className="flex flex-col md:flex-row justify-between items-center px-2 h-auto md:h-[100px] w-full">
            <div className="flex  flex-col px-4 pr-60 md:pr-0">
              <span className="text-[16px] md:text-[20px] font-semibold">
                Orders Statistics
              </span>
              <span className="text-[#7E8299] text-[12px] font-medium">
                Last updated: {Date()}
              </span>
            </div>

            {/* trend graph section */}
            <TrendGraph
              totalDelivered={totalDelivered}
              totalOrders={totalOrders}
              trendPercentage={trendPercentage}
            />
            {/* end trent graph section */}
          </div>
          {/* graph section */}
          <BarChart />
        </div>

        <div className="flex flex-col shadow-lg items-center w-full md:w-[480px] h-auto border border-[#EFF2F5] gap-3 bg-[#FFFFFF] rounded-tl-[8px] rounded-tr-[5px]">
          <div className="flex  justify-center items-center w-full md:w-[406px] h-auto md:h-[47px] gap-2 border border-[#EFF2F5] rounded-md mt-6">
            <div className="flex justify-center items-center w-[192px] gap-1 h-[32px] border border-[#EFF2F5] rounded-md bg-[#4FC9F3] hover:cursor-pointer hover:bg-white hover:border-none transition">
              <img
                className="w-4 h-3  hover:text-black "
                src="/images/Group 981.png"
                alt="orders"
              />
              <Link href="/">
                <span className="text-[#FFFFFF] hover:text-black ">Orders</span>
              </Link>
            </div>
            <div className="flex justify-center items-center w-[192px] gap-1 h-[32px] border border-[#EFF2F5] rounded-md hover:cursor-pointer">
              <img
                className="w-4 h-3 text-[#5E6278]"
                src="/images/Group 984.png"
                alt="orders"
              />
              <Link href="/payouts">
                <span>Payouts</span>
              </Link>
            </div>
          </div>

          <SelectOrderStatus />
          {/* select box order status selection  */}
          {/* <div className="flex flex-col md:flex-row justify-end w-full md:w-[406px] h-auto md:h-[47px] gap-1 md:gap-4 mt-3 px-4 md:px-0">
            <span>Order Status</span>
            <div className="w-full md:w-[300px] h-[35px] border border-[#EFF2F5] rounded-md">
              <select
                className="w-full md:w-[275px] h-[35px] text-[#7E8299] font-[500px] bg-transparent outline-none  px-2"
                onChange={(e) => e.target.value}
              >
                "pickup awaiting", "pickedup", "warehouse", "delivery attempt
                tried", "delivered", "delayed"
                <option disabled value="select" className="p-3 ">
                  select
                </option>
                <option value="pickup awaiting" className="p-3 ">
                  Pickup Awaiting
                </option>
                <option value="pickedup" className="p-3 ">
                  Picked Up
                </option>
                <option value="warehouse" className="p-3 ">
                  Reached Warehouse
                </option>
                <option value="delivery attempt tried" className="p-3 ">
                  Delivery attempt tried
                </option>
                <option value="delivered" className="p-3 ">
                  Delivered
                </option>
                <option value="delayed" className="p-3 ">
                  Delayed
                </option>
              </select>
            </div>
          </div> */}

          <div className="flex flex-col md:flex-row  justify-end w-full md:w-[406px] h-auto md:h-[47px] gap-1 md:gap-4 px-4 md:px-0">
            <span>Date Range</span>
            <div className="w-full md:w-[300px] h-[35px] border border-[#EFF2F5] rounded-md px-2">
              <input
                type="Date"
                className="w-full md:w-[275px] h-[35px] text-[#7E8299] bg-transparent outline-none px-2"
              />
            </div>
          </div>

          <LiveButton
            graterValue={graterValueLive}
            total={totalLive}
            lessValue={lessValueLive}
          />
          <DelayButton
            graterValue={graterValueDelay}
            lessValue={lessValueDelay}
            total={totalDelay}
          />
          <AverageButton
            total={averageOrderValue}
            lessValue={lessValueAverage}
            graterValue={graterValueAverage}
          />
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
