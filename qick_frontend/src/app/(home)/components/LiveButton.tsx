"use client";
import React from "react";
import DougnatLive from "@/components/DougnatLive";
import { ordertypes } from "@/types/ordertypes";

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
  const handle_LiveUrl = () => {
    window.history.pushState({}, "", `/order?order_status=${"live_orders"}`);
  };

  return (
    <div
      onClick={handle_LiveUrl}
      className="flex flex-col md:flex-row items-center shadow-md justify-center md:gap-2 w-[333px]  md:w-[406px] h-[322px] md:h-[162px] border-[#4FC9F3] bg-[#4FC9F333] hover:bg-[#dff5fc33] transition hover:shadow-2xl border  rounded-2xl mt-3"
    >
      <span className="md:hidden pr-48 text-[18px] font-[600px]">
        Live Orders
      </span>

      <div className="md:w-[112px] md:h-[111px] w-[125px] h-[124px]">
        <DougnatLive
          graterValue={graterValue.length}
          total={total}
          lessValue={lessValue.length}
        />
      </div>
      <div className="h-[111px] w-[243px] mt-5">
        <span className="hidden md:block text-[18px] font-[600px]">
          Live Orders
        </span>
        <div className="flex flex-col justify-center items-center gap-2 h-[70px] bg-white md:mt-3 rounded-md">
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
              {graterValue.length} orders
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
              {lessValue.length} orders
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveButton;
