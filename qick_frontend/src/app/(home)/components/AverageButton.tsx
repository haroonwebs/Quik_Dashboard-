"use client";
import React from "react";
import DougnatAverage from "@/components/DougnatAverage";

interface DougnatAverageProps {
  lessValue: number | never[];
  graterValue: number | never[];
  total: number;
}

const AverageButton: React.FC<DougnatAverageProps> = ({
  lessValue,
  graterValue,
  total,
}) => {
  const handle_Average = () => {
    window.history.pushState({}, "", `/order?order_status=${"delivered"}`);
  };
  return (
    <div className=" flex items-center justify-center shadow-md gap-2  w-[406px] h-[162px] border-[#8AEFD1] bg-[#4fc9f333] hover:bg-[#dff5fc33] transition hover:shadow-2xl border  rounded-2xl ">
      <div className="w-[112px] h-[111px]">
        <DougnatAverage
          total={total}
          lessValue={lessValue}
          graterValue={graterValue}
        />
      </div>
      <div onClick={handle_Average} className="h-[111px] w-[243px] ">
        <span className="text-[18px] font-[600px]">Average Order Size</span>
        <div className="flex flex-col justify-center items-center gap-2 h-[70px] bg-white mt-3 rounded-md">
          <div className="flex items-center gap-10">
            <div className="flex justify-evenly items-center gap-2  font-[500px] text-xs">
              <img
                src="/images/Rectangle 8215.png"
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
                src="/images/Rectangle 8216.png"
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

export default AverageButton;
