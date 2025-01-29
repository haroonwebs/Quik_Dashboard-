"use client";
import React, { useContext } from "react";
import DougnatAverage from "@/components/DougnatAverage";
import { ordertypes } from "@/types/ordertypes";
import OrdersContext from "@/contexts/OrdersContext";

interface DougnatAverageProps {
  lessValue: ordertypes[] | never[];
  graterValue: ordertypes[] | never[];
  total: string;
}

const AverageButton: React.FC<DougnatAverageProps> = ({
  lessValue,
  graterValue,
  total,
}) => {
  const { setContextOrders } = useContext(OrdersContext);

  const handle_Average = () => {
    setContextOrders(true);

    window.history.pushState({}, "", `/order?order_status=${"average"}`);
  };
  return (
    <div
      onClick={handle_Average}
      className="flex flex-col lg:flex-row items-center shadow-sm justify-center lg:gap-2 w-[333px]  lg:w-[406px] h-[322px] lg:h-[162px]  bg-[#FAFAFA] hover:bg-[#dff5fc33] transition hover:border-[#8AEFD1] hover:border  rounded-2xl mt-3"
    >
      <span className="lg:hidden pr-36 text-[18px] font-[600px]">
        Average Order Size
      </span>

      <div className="lg:w-[112px] md:h-[111px] w-[125px] h-[124px]">
        <DougnatAverage
          total={total}
          lessValue={lessValue.length}
          graterValue={graterValue.length}
        />
      </div>
      <div className="h-[111px] w-[243px] mt-5">
        <span className="hidden lg:block text-[18px] font-[600px]">
          Average Order Size
        </span>
        <div className="flex flex-col justify-center items-center gap-2 h-[70px] bg-white lg:mt-3 rounded-md">
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
              {lessValue.length} orders
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
              {graterValue.length} orders
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AverageButton;
