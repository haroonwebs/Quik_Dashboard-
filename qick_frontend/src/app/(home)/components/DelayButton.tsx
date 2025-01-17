"use client";
import DougnatDelay from "@/components/DougnatDelay";
import React from "react";

interface DougnatDelayProps {
  lessValue: number | never[];
  graterValue: number | never[];
  total: number;
}

const DelayButton: React.FC<DougnatDelayProps> = ({
  lessValue,
  graterValue,
  total,
}) => {
  const handle_delay = () => {
    window.history.pushState({}, "", `/order?order_status=${"delayed"}`);
  };
  return (
    <div
      onClick={handle_delay}
      className=" flex items-center justify-center shadow-md gap-2  w-[406px] h-[162px] border-[#FFB5B5] bg-[#FAFAFA] hover:bg-[#dff5fc33] transition hover:shadow-2xl border  rounded-2xl"
    >
      <div className="w-[112px] h-[111px]">
        <DougnatDelay
          graterValue={graterValue}
          lessValue={lessValue}
          total={total}
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
              {lessValue} orders
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
              {graterValue} orders
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelayButton;
