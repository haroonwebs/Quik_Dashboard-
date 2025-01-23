import React from "react";
import { GoArrowDown } from "react-icons/go";
import { TbPercentage } from "react-icons/tb";

interface trendGraphProps {
  totalOrders: number | undefined;
  totalDelivered: number;
  trendPercentage: any;
}

const TrendGraph: React.FC<trendGraphProps> = ({
  totalOrders,
  totalDelivered,
  trendPercentage,
}) => {
  const PercentagePositive = Math.abs(trendPercentage);
  return (
    <div className="flex md:flex-nowrap justify-center items-center gap-2 w-full md:w-[400px] ">
      <div className="flex justify-between items-center bg-[#FAFAFA]   w-full md:w-[164px] h-[44px] rounded-lg px-2">
        <div className="flex justify-center bg-red-50  items-center gap-[2px] rounded-[4px]">
          <span className="flex justify-center items-center text-[10px] tracking-tighter">
            {PercentagePositive.toFixed(2)}
            <TbPercentage className="text-[8px]" />
          </span>
          <GoArrowDown className="text-[12px] text-red-700" />
        </div>

        <span className="text-[12px] tracking-tighter font-[600px]">
          Total orders
        </span>
        <span className="tracking-tighter">{totalOrders}</span>
      </div>
      <div className="flex justify-between items-center bg-[#FAFAFA] w-full md:w-[164px]   h-[44px] rounded-lg px-2">
        <div className="flex justify-center bg-green-50 items-center gap-[2px] rounded-[4px]">
          <span className="flex justify-center items-center text-[10px] tracking-tighter">
            {PercentagePositive.toFixed(2)}
            <TbPercentage className="text-[8px] " />
          </span>
          <GoArrowDown className="text-[12px] rotate-180 text-green-600" />
        </div>
        <span className="text-[12px] font-[600px] tracking-tighter">
          Delivered orders
        </span>
        <span className=" tracking-tighter">{totalDelivered}</span>
      </div>
    </div>
  );
};

export default TrendGraph;
