"use client";
import React, { useState } from "react";

const DateRangeFilter = () => {
  const [date, setDate] = useState<string>("");

  window.history.pushState({}, "", `/orders?date=${date}`);

  return (
    <div className="flex flex-col md:flex-row  justify-end w-full md:w-[406px] h-auto md:h-[47px] gap-1 md:gap-4 px-4 md:px-0">
      <span>Date Range</span>
      <div className="w-full md:w-[300px] h-[35px] border border-[#EFF2F5] rounded-md px-2">
        <input
          onChange={(e) => setDate(e.target.value)}
          type="Date"
          value={date}
          className="w-full md:w-[275px] h-[35px] text-[#7E8299] bg-transparent outline-none px-2"
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;
