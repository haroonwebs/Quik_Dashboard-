"use client";
import React, { useState, useEffect, useContext } from "react";
import OrdersContext from "@/contexts/OrdersContext";

// import { useSearchParams } from "next/navigation";

const SelectOrderStatus = () => {
  const [status, setStatus] = useState<string | null>("");
  const { Contextorders, setContextOrders } = useContext(OrdersContext);

  useEffect(() => {
    if (status) {
      window.history.pushState({}, "", `/order?order_status=${status}`);
      setContextOrders(false);
    }
  }, [status]);

  const handleContext = () => {
    setContextOrders(false);
  };
  return (
    <div
      onClick={handleContext}
      className="flex flex-col lg:flex-row justify-end w-full lg:w-[406px] h-auto lg:h-[47px] gap-1 lg:gap-7 mt-3 px-4 lg:px-0"
    >
      <span className="text-[12px] font-[500px] ">Order Status</span>
      <div className="w-full lg:w-[300px] h-[35px] border border-[#EFF2F5] rounded-md">
        {Contextorders === true ? (
          <span className=" flex px-3 items-center  w-full lg:w-[275px] h-[35px] text-[#7E8299] font-[500px] ">
            Select Status
          </span>
        ) : (
          <select
            className="w-full lg:w-[275px] h-[35px] text-[#7E8299] font-[500px] bg-transparent outline-none  px-2"
            onChange={(e) => setStatus(e.target?.value)}
          >
            {/* <option value="select" className="p-3 ">
            select
          </option> */}
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
        )}
      </div>
    </div>
  );
};

export default SelectOrderStatus;
