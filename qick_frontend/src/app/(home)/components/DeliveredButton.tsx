"use client";
import DeliveredOrder from "@/components/DeliveredOrder";
import React from "react";

interface DeliveredOrderProps {
  lessValue: number | never[];
  graterValue: number | never[];
  total: number;
}

const DeliveredButton: React.FC<DeliveredOrderProps> = ({
  lessValue,
  graterValue,
  total,
}) => {
  const handle_delivered = () => {
    window.history.pushState({}, "", `/order?order_status=${"delivered"}`);
  };
  return (
    <div
      onClick={handle_delivered}
      className=" flex items-center justify-center shadow-md gap-2  w-[406px] h-[162px] border-[#a4f394] bg-[#45e48733] border  rounded-2xl "
    >
      <div className="w-[112px] h-[111px]">
        <DeliveredOrder
          graterValue={graterValue}
          lessValue={lessValue}
          total={total}
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
              {lessValue} orders
            </div>
          </div>
          <div className="w-[80%] h-[1px] bg-[#EFF2F5]"></div>
          <div className="flex items-center gap-10">
            <div className="flex justify-evenly items-center gap-2  font-[500px] text-xs">
              <div className="w-[7px] h-[7px] bg-[#87f5b5] rounded"></div>
              <span>Value &gt; 1000.00L</span>
            </div>
            <div className="text-xs font-[500px] text-[#7E8299]">
              {graterValue} orders
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveredButton;
