"use client";
import { useEffect, useState } from "react";
import React from "react";
import MyBarChart from "./MyBarChart";
import { useSearchParams } from "next/navigation";
import fetchById from "@/hooks/useFetchByStatus";
import { ordertypes } from "@/types/ordertypes";

const BarChart = () => {
  const [status, setStatus] = useState<string | null>("live_orders");
  const [orders, setOrders] = useState<ordertypes[]>([]);
  const [error, setError] = useState<any | null>(null);
  const [timePeriod, setTimePeriod] = useState("month");
  const searchParams = useSearchParams();
  useEffect(() => {
    const status = searchParams?.get("order_status");
    setStatus(status);
    console.log("status", status);
  }, [searchParams, status]);

  useEffect(() => {
    if (status) {
      const fetchOrders = async () => {
        const { orders, error } = await fetchById(
          `http://localhost:4000/api/v1/orders/status?status=${status}`
        );
        if (error) {
          setError(error);
        } else {
          setOrders(orders || []);
        }
      };

      fetchOrders();
    }
  }, [status]);
  //  finding orders whose value grater then 1000
  const graterValue = Array.isArray(orders)
    ? orders.filter((order) => order.order_value >= 1000).length
    : [];
  //  finding orders whose value less then 1000
  const lessValue = Array.isArray(orders)
    ? orders.filter((order) => order.order_value < 1000).length
    : [];

  return (
    <div className=" flex flex-col justify-center items-center w-full md:w-[900px] h-full md:h-[650px] border border-[#EFF2F5] rounded-md">
      <div className=" flex justify-between items-center w-full md:w-[850px] h-full md:h-[80px] ">
        <div className="flex mb-2 md:mb-0 mt-2 md:mt-0 gap-2 ">
          <img src="/images/Vector(3).png" alt="" />
          <span className="text-[14px] font-[500px]">Live Order</span>
        </div>
        <div className="md:flex hidden justify-center items-center rounded-md w-[230px] h-[35px] border border-[#EFF2F5]">
          <button
            onClick={() => setTimePeriod("day")}
            className="flex justify-center items-center text-[9px] text-[#5E6278] font-[600px] ] rounded-md w-[80px] h-[27px] hover:bg-[#4FC9F3] hover:text-white"
          >
            Today
          </button>
          <button
            onClick={() => setTimePeriod("week")}
            className="flex justify-center items-center text-[9px] text-[#5E6278] font-[600px]  rounded-md w-[80px] h-[27px] hover:bg-[#4FC9F3] hover:text-white "
          >
            This week
          </button>
          <button
            onClick={() => setTimePeriod("month")}
            className="flex justify-center items-center text-[9px] text-[#5E6278] font-[600px]  rounded-md w-[80px] h-[27px] hover:bg-[#4FC9F3] hover:text-white "
          >
            This Month
          </button>
        </div>
      </div>
      <div className="flex justify-center items-end w-full md:w-[850px] h-full md:h-[620px] ">
        <MyBarChart
          less={lessValue}
          grater={graterValue}
          timePeriod={timePeriod}
        />
      </div>
    </div>
  );
};

export default BarChart;
