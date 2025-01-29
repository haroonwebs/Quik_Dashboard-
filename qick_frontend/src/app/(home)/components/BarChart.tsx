"use client";
import { useEffect, useState, useContext } from "react";
import React from "react";
import MyBarChart from "./MyBarChart";
import { useSearchParams } from "next/navigation";
import fetchById from "@/hooks/useFetchByStatus";
import { ordertypes } from "@/types/ordertypes";
// import OrdersContext from "@/contexts/OrdersContext";

const BarChart = () => {
  const [status, setStatus] = useState<string | null>("live_orders");
  const [start_Date, setStartDate] = useState<string | null>("");
  const [end_Date, setEndtDate] = useState<string | null>("");
  const [orders, setOrders] = useState<ordertypes[]>([]);
  const [error, setError] = useState<any | null>(null);
  const [timePeriod, setTimePeriod] = useState("month");
  const searchParams = useSearchParams();
  // const { setContextOrders } = useContext(OrdersContext);

  useEffect(() => {
    const status = searchParams?.get("order_status");
    setStatus(status);
    //  setContextOrders(status);
    const startDate = searchParams?.get("startDate");
    setStartDate(startDate);
    const endDate = searchParams?.get("endDate");
    setEndtDate(endDate);
  }, [searchParams]);

  useEffect(() => {
    const fetchOrders = async () => {
      // Reset orders when fetching new data
      setOrders([]);
      try {
        if (status && start_Date && end_Date) {
          // Fetch by both status and date
          const { orders, error } = await fetchById(
            `http://localhost:4000/api/v1/orders/range?status=${status}&start_date=${start_Date}&end_date=${end_Date}`
          );
          if (error) throw new Error(error);
          setOrders(orders || []);
        } else if (status && start_Date) {
          // Fetch by status only
          const { orders, error } = await fetchById(
            `http://localhost:4000/api/v1/orders/date?start_date=${start_Date}&status=${status}`
          );
          if (error) throw new Error(error);
          setOrders(orders || []);
        } else if (status) {
          // Fetch by date only
          const { orders, error } = await fetchById(
            `http://localhost:4000/api/v1/orders/status?status=${status}`
          );
          if (error) throw new Error(error);
          setOrders(orders || []);
        }
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchOrders();
  }, [status, start_Date, end_Date]);

  // Finding orders whose value greater than 1000
  const greaterValue = Array.isArray(orders)
    ? orders.filter((order) => order?.order_value >= 1000)
    : [];

  // Finding orders whose value less than 1000
  const lessValue = Array.isArray(orders)
    ? orders.filter((order) => order?.order_value < 1000)
    : [];

  return (
    <div className="flex flex-col justify-center items-center w-full lg:mb-14 lg:w-[900px] h-full lg:h-[780px] border border-[#EFF2F5] rounded-md">
      <div className="flex justify-around lg:justify-between items-center w-full lg:w-[850px] h-full mt-2 lg:mt-0 lg:h-[80px] ">
        <div className="flex mb-2 md:mb-0 mt-2 lg:mt-0 gap-2 ">
          <img src="/images/Group 2169.png" alt="" />
          <span className="text-[14px] font-[500px]">Live Order</span>
        </div>
        <div className="flex justify-center items-center ">
          {/* Select Box for Mobile */}
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target?.value)}
            className="lg:hidden rounded-md border border-[#EFF2F5] w-[109px] h-[29px] text-[#5E6278] text-[9px] font-[600px] outline-none bg-transparent"
          >
            <option value="day">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
          </select>

          {/* Button Layout for Larger Screens */}
          <div className="hidden lg:flex justify-center items-center rounded-md w-[230px] h-[35px] border border-[#EFF2F5]">
            <button
              onClick={() => setTimePeriod("day")}
              className={`flex justify-center items-center text-[9px] font-[600] rounded-md w-[80px] h-[32px] ${
                timePeriod === "day"
                  ? "bg-[#4FC9F3] text-white"
                  : "text-[#5E6278] hover:bg-[#4FC9F3] hover:text-white"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimePeriod("week")}
              className={`flex justify-center items-center text-[9px] font-[600] rounded-md w-[80px] h-[32px] ${
                timePeriod === "week"
                  ? "bg-[#4FC9F3] text-white"
                  : "text-[#5E6278] hover:bg-[#4FC9F3] hover:text-white"
              }`}
            >
              This week
            </button>
            <button
              onClick={() => setTimePeriod("month")}
              className={`flex justify-center items-center text-[9px] font-[600] rounded-md w-[80px] h-[32px] ${
                timePeriod === "month"
                  ? "bg-[#4FC9F3] text-white"
                  : "text-[#5E6278] hover:bg-[#4FC9F3] hover:text-white"
              }`}
            >
              This Month
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-end w-full lg:w-[850px] h-full lg:h-[620px] ">
        <MyBarChart
          lessValueOrders={lessValue}
          graterValueOrders={greaterValue}
          timePeriod={timePeriod}
        />
      </div>
    </div>
  );
};

export default BarChart;
