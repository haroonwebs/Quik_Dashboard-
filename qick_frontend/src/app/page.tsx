import DougnatDelay from "@/components/DougnatDelay";
import DougnatLive from "@/components/DougnatLive";
import DougnatAverage from "@/components/DougnatAverage";
import DeliveredOrder from "@/components/DeliveredOrder";
import MyBarChart from "./(home)/components/MyBarChart";
import usefetchOrders from "@/hooks/usefetchOrders";
import { ordertypes } from "@/types/ordertypes";
import Link from "next/link";

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
        ].includes(order.order_status)
      )
    : [];
  // calculate total Count of orders
  const totalOrdersCount = totalOrdersForAverage.length;
  // calculate total Value of orders
  const totalValue = totalOrdersForAverage.reduce((sum, order) => {
    return sum + Number(order.order_value);
  }, 0);
  // average value of orders
  // const averageOrderValue = totalValue / totalOrdersCount;

  return (
    <section className="bg-[#F5F8FA] min-h-100">
      <main className="w-full h-auto flex justify-center gap-8 mt-4 shadow-md">
        <div className=" flex flex-col justify-center items-center w-[950px] h-[800px] border bg-[#FFFFFF] border-[#EFF2F5] rounded-tl-[8px] rounded-tr-[5px]">
          <div className="flex justify-between items-center px-14 h-[100px] w-full">
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

          <div className=" flex flex-col justify-center items-center w-[810px] h-[650px] border border-[#EFF2F5] rounded-md">
            <div className=" flex justify-between items-center w-[768px] h-[80px] ">
              <div className="flex gap-2">
                <img src="/images/Vector(3).png" alt="" />
                <span className="text-[14px] font-[500px]">Live Order</span>
              </div>
              <div className="flex justify-center items-center rounded-md w-[230px] h-[35px] border border-[#EFF2F5]">
                <button className="flex justify-center items-center text-[9px] text-[#5E6278] font-[600px] ] rounded-md w-[80px] h-[27px] hover:bg-[#4FC9F3] hover:text-white">
                  Today
                </button>
                <button className="flex justify-center items-center text-[9px] text-[#5E6278] font-[600px]  rounded-md w-[80px] h-[27px] hover:bg-[#4FC9F3] hover:text-white ">
                  This week
                </button>
                <button className="flex justify-center items-center text-[9px] text-[#5E6278] font-[600px]  rounded-md w-[80px] h-[27px] hover:bg-[#4FC9F3] hover:text-white ">
                  This Month
                </button>
              </div>
            </div>
            <div className="flex justify-center items-end w-[768px] h-[540px] ">
              <MyBarChart />
            </div>
          </div>
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
          <div className=" flex items-center shadow-md justify-center gap-2  w-[406px] h-[162px] border-[#4FC9F3] bg-[#4FC9F333] border  rounded-2xl mt-6">
            <div className="w-[112px] h-[111px]">
              <DougnatLive
                graterValue={graterValueLive}
                total={totalLive}
                lessValue={lessValueLive}
              />
            </div>
            <div className="h-[111px] w-[243px] ">
              <span className="text-[18px] font-[600px]">Live Orders</span>
              <div className="flex flex-col justify-center items-center gap-2 h-[70px] bg-white mt-3 rounded-md">
                <div className="flex items-center gap-10">
                  <div className="flex justify-evenly items-center gap-2  font-[500px] text-xs">
                    <img
                      src="/images/Rectangle 8219.png"
                      alt="not found"
                      className="h-[7px] w-[7px]"
                    />
                    <span>Value &lt; 1000.00L</span>
                  </div>
                  <div className="text-xs font-[500px] text-[#7E8299]">
                    {lessValueLive} orders
                  </div>
                </div>
                <div className="w-[80%] h-[1px] bg-[#EFF2F5]"></div>
                <div className="flex items-center gap-10">
                  <div className="flex justify-evenly items-center gap-2  font-[500px] text-xs">
                    <img
                      src="/images/Rectangle 8220.png"
                      alt="not found"
                      className="h-[7px] w-[7px]"
                    />
                    <span>Value &gt; 1000.00L</span>
                  </div>
                  <div className="text-xs font-[500px] text-[#7E8299]">
                    {graterValueLive} orders
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* dougnat graphs for delayed orders */}
          <div className=" flex items-center justify-center shadow-md gap-2  w-[406px] h-[162px] border-[#FFB5B5] bg-[#FAFAFA] border  rounded-2xl">
            <div className="w-[112px] h-[111px]">
              <DougnatDelay
                graterValue={graterValueDelay}
                lessValue={lessValueDelay}
                total={totalDelay}
              />
            </div>
            <div className="h-[111px] w-[243px] ">
              <span className="text-[18px] font-[600px]">Delayed Orders</span>
              <div className="flex flex-col justify-center items-center gap-2 h-[70px] bg-white mt-3 rounded-md">
                <div className="flex items-center gap-10">
                  <div className="flex justify-evenly items-center gap-2  font-[500px] text-xs">
                    <img
                      src="/images/Rectangle 8224.png"
                      alt="not found"
                      className="h-[7px] w-[7px]"
                    />
                    <span>Value &lt; 1000.00L</span>
                  </div>
                  <div className="text-xs font-[500px] text-[#7E8299]">
                    {lessValueDelay} orders
                  </div>
                </div>
                <div className="w-[80%] h-[1px] bg-[#EFF2F5]"></div>
                <div className="flex items-center gap-10">
                  <div className="flex justify-evenly items-center gap-2  font-[500px] text-xs">
                    <img
                      src="/images/Rectangle 8225.png"
                      alt="not found"
                      className="h-[7px] w-[7px]"
                    />
                    <span>Value &gt; 1000.00L</span>
                  </div>
                  <div className="text-xs font-[500px] text-[#7E8299]">
                    {graterValueDelay} orders
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* dougnat graphs for average order size  */}
          <div className=" flex items-center justify-center shadow-md gap-2  w-[406px] h-[162px] border-[#8AEFD1] bg-[#4FC9F333] border  rounded-2xl ">
            <div className="w-[112px] h-[111px]">
              <DougnatAverage total={totalValue} />
            </div>
            <div className="h-[111px] w-[243px] ">
              <span className="text-[18px] font-[600px]">
                Average Order Size
              </span>
              <div className="flex flex-col justify-center items-center gap-2 h-[70px] bg-white mt-3 rounded-md">
                <div className="flex items-center gap-10">
                  <div className="flex justify-evenly items-center gap-2  font-[500px] text-xs">
                    <img
                      src="/images/Rectangle 8215.png"
                      alt="not found"
                      className="h-[7px] w-[7px]"
                    />
                    <span>Value &lt; 1000.00L</span>
                  </div>
                  <div className="text-xs font-[500px] text-[#7E8299]">
                    35 orders
                  </div>
                </div>
                <div className="w-[80%] h-[1px] bg-[#EFF2F5]"></div>
                <div className="flex items-center gap-10">
                  <div className="flex justify-evenly items-center gap-2  font-[500px] text-xs">
                    <img
                      src="/images/Rectangle 8216.png"
                      alt="not found"
                      className="h-[7px] w-[7px]"
                    />
                    <span>Value &gt; 1000.00L</span>
                  </div>
                  <div className="text-xs font-[500px] text-[#7E8299]">
                    35 orders
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* dougnat graphs for delivered */}
          <div className=" flex items-center justify-center shadow-md gap-2  w-[406px] h-[162px] border-[#a4f394] bg-[#45e48733] border  rounded-2xl ">
            <div className="w-[112px] h-[111px]">
              <DeliveredOrder
                graterValue={graterValueDelivered}
                lessValue={lessValueDelivered}
                total={totalDelivered}
              />
            </div>
            <div className="h-[111px] w-[243px] ">
              <span className="text-[18px] font-[600px]">Delivered Orders</span>
              <div className="flex flex-col justify-center items-center gap-2 h-[70px] bg-white mt-3 rounded-md">
                <div className="flex items-center gap-10">
                  <div className="flex justify-evenly items-center gap-2  font-[500px] text-xs">
                    <div className="w-[7px] h-[7px] bg-[#1fe070] rounded"></div>
                    <span>Value &lt; 1000.00L</span>
                  </div>
                  <div className="text-xs font-[500px] text-[#7E8299]">
                    {lessValueDelivered} orders
                  </div>
                </div>
                <div className="w-[80%] h-[1px] bg-[#EFF2F5]"></div>
                <div className="flex items-center gap-10">
                  <div className="flex justify-evenly items-center gap-2  font-[500px] text-xs">
                    <div className="w-[7px] h-[7px] bg-[#87f5b5] rounded"></div>
                    <span>Value &gt; 1000.00L</span>
                  </div>
                  <div className="text-xs font-[500px] text-[#7E8299]">
                    {graterValueDelivered} orders
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
