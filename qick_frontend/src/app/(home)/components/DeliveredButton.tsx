"use client";
import DeliveredOrder from "@/components/DeliveredOrder";
import React from "react";
import { ordertypes } from "@/types/ordertypes";

interface DeliveredOrderProps {
  lessValue: ordertypes[] | never[];
  graterValue: ordertypes[] | never[];
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
      className="flex flex-col lg:flex-row items-center shadow-sm justify-center lg:gap-2 w-[333px]  lg:w-[406px] h-[322px] lg:h-[162px] border-[#a4f394] bg-[#45e48733] hover:bg-[#dff5fc33] transition hover:border-[#a4f394] hover:border  rounded-2xl mt-3"
    >
      <span className="lg:hidden pr-40 text-[18px] font-[600px]">
        Delivered Orders
      </span>

      <div className="lg:w-[112px] md:h-[111px] w-[125px] h-[124px]">
        <DeliveredOrder
          graterValue={graterValue.length}
          lessValue={lessValue.length}
          total={total}
        />
      </div>
      <div className="h-[111px] w-[243px] mt-5">
        <span className="hidden lg:block text-[18px] font-[600px]">
          Delivered Orders
        </span>
        <div className="flex flex-col justify-center items-center gap-2 h-[70px] bg-white lg:mt-3 rounded-md">
          <div className="flex items-center gap-10">
            <div className="flex justify-evenly items-center gap-2  font-[500px] text-xs">
              <div className="w-[7px] h-[7px] bg-[#1fe070] rounded"></div>
              <span>Value &lt; 1000.00L</span>
            </div>
            <div className="text-xs font-[500px] text-[#7E8299]">
              {lessValue.length} orders
            </div>
          </div>
          <div className="w-[80%] h-[1px] bg-[#EFF2F5]"></div>
          <div className="flex items-center gap-10">
            <div className="flex justify-evenly items-center gap-2  font-[500px] text-xs">
              <div className="w-[7px] h-[7px] bg-[#87f5b5] rounded"></div>
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

export default DeliveredButton;
