"use client";
import { useEffect, useState } from "react";
import React from "react";
import MyBarChart from "./MyBarChart";
import { useSearchParams } from "next/navigation";
import fetchById from "@/hooks/useFetchByStatus";
import { ordertypes } from "@/types/ordertypes";

const BarChart = () => {
  const [status, setStatus] = useState<string | null>("live_orders");
  const [startdate, setStartDate] = useState<string | null>("");
  const [enddate, setEndDate] = useState<string | null>("");
  const [orders, setOrders] = useState<ordertypes[]>([]);
  const [error, setError] = useState<any | null>(null);
  const [timePeriod, setTimePeriod] = useState("month");
  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams?.get("order_status");
    setStatus(status);
    const startDate = searchParams.get("start_date");
    setStartDate(startDate);
    const endDate = searchParams.get("end_date");
    setEndDate(endDate);

    // console.log("status", status);
    // console.log("date", date);
  }, [searchParams]);

  useEffect(() => {
    const fetchOrders = async () => {
      // Reset orders when fetching new data
      setOrders([]);

      try {
        if (status && { startdate, enddate }) {
          // Fetch by both status and date
          const { orders, error } = await fetchById(
            `http://localhost:4000/api/v1/orders/range?status=${status}&start_date=${startdate}&end_date=${enddate}`
          );
          if (error) throw new Error(error);
          setOrders(orders || []);
        } else if (status) {
          // Fetch by status only
          const { orders, error } = await fetchById(
            `http://localhost:4000/api/v1/orders/status?status=${status}`
          );
          if (error) throw new Error(error);
          setOrders(orders || []);
        } else if (Date) {
          // Fetch by date only
          const { orders, error } = await fetchById(
            `http://localhost:4000/api/v1/orders/date?date=${Date}`
          );
          if (error) throw new Error(error);
          setOrders(orders || []);
        }
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchOrders();
  }, [status, Date]);

  console.log("orders with date", Date, orders);

  // Finding orders whose value greater than 1000
  const greaterValue = Array.isArray(orders)
    ? orders.filter((order) => order?.order_value >= 1000)
    : [];

  // Finding orders whose value less than 1000
  const lessValue = Array.isArray(orders)
    ? orders.filter((order) => order?.order_value < 1000)
    : [];

  return (
    <div className="flex flex-col justify-center items-center w-full md:mb-14 md:w-[900px] h-full md:h-[780px] border border-[#EFF2F5] rounded-md">
      <div className="flex justify-around md:justify-between items-center w-full md:w-[850px] h-full mt-2 md:mt-0 md:h-[80px] ">
        <div className="flex mb-2 md:mb-0 mt-2 md:mt-0 gap-2 ">
          <img src="/images/Group 2169.png" alt="" />
          <span className="text-[14px] font-[500px]">Live Order</span>
        </div>
        <div className="flex justify-center items-center ">
          {/* Select Box for Mobile */}
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target?.value)}
            className="md:hidden rounded-md border border-[#EFF2F5] w-[109px] h-[29px] text-[#5E6278] text-[9px] font-[600px] outline-none bg-transparent"
          >
            <option value="day">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
          </select>

          {/* Button Layout for Larger Screens */}
          <div className="hidden md:flex justify-center items-center rounded-md w-[230px] h-[35px] border border-[#EFF2F5]">
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
      <div className="flex justify-center items-end w-full md:w-[850px] h-full md:h-[620px] ">
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
