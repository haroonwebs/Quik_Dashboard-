"use client";
import React from "react";
import DougnatLive from "@/components/DougnatLive";

interface LiveButtonProps {
  lessValue: number | never[];
  graterValue: number | never[];
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
      className=" flex items-center shadow-md justify-center gap-2  w-[406px] h-[162px] border-[#4FC9F3] bg-[#4FC9F333] hover:bg-[#9dc1ce33] border  rounded-2xl mt-6"
    >
      <div className="w-[112px] h-[111px]">
        <DougnatLive
          graterValue={graterValue}
          total={total}
          lessValue={lessValue}
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
              {graterValue} orders
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
              {lessValue} orders
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveButton;
