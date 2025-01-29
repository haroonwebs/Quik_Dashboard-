"use client";
import React, { useContext, useEffect, useState } from "react";
import DougnatLive from "@/components/DougnatLive";
import { ordertypes } from "@/types/ordertypes";
import OrdersContext from "@/contexts/OrdersContext";

interface LiveButtonProps {
  lessValue: ordertypes[] | never[];
  graterValue: ordertypes[] | never[];
  total: number;
}

const LiveButton: React.FC<LiveButtonProps> = ({
  total,
  lessValue,
  graterValue,
}) => {
  const { setContextOrders } = useContext(OrdersContext);

  const handle_LiveUrl = () => {
    setContextOrders(true);
    window.history.pushState({}, "", `/order?order_status=${"live_orders"}`);
  };

  return (
    <div
      onClick={handle_LiveUrl}
      className="flex flex-col lg:flex-row items-center shadow-sm justify-center lg:gap-2 w-[333px]  lg:w-[406px] h-[322px] lg:h-[162px]  bg-[#4FC9F333] hover:border-[#4FC9F3] hover:border transition hover:shadow-md   rounded-2xl mt-3"
    >
      <span className="lg:hidden pr-48 text-[18px] font-[600px]">
        Live Orders
      </span>

      <div className="lg:w-[112px] lg:h-[111px] w-[125px] h-[124px]">
        <DougnatLive
          graterValue={graterValue.length}
          total={total}
          lessValue={lessValue.length}
        />
      </div>
      <div className="h-[111px] w-[243px] mt-5">
        <span className="hidden lg:block text-[18px] font-[600px]">
          Live Orders
        </span>
        <div className="flex flex-col justify-center items-center gap-2 h-[70px] bg-white lg:mt-3 rounded-md">
          <div className="flex items-center gap-10">
            <div className="flex justify-evenly items-center gap-2  font-[500px] text-xs">
              <img
                src="/images/Rectangle 8220.png"
                alt="not found"
                className="h-[7px] w-[7px]"
              />
              <span>Value &lt; 1000.00L</span>
            </div>
            <div className="text-xs font-[500px] text-[#7E8299]">
              {lessValue.length} orders
            </div>
          </div>
          <div className="w-[80%] h-[1px] bg-[#EFF2F5]"></div>
          <div className="flex items-center gap-10">
            <div className="flex justify-evenly items-center gap-2  font-[500px] text-xs">
              <img
                src="/images/Rectangle 8219.png"
                alt="not found"
                className="h-[7px] w-[7px]"
              />
              <span>Value &gt; 1000.00L</span>
            </div>
            <div className="text-xs font-[500px] text-[#7E8299]">
              {graterValue.length} orders
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveButton;
