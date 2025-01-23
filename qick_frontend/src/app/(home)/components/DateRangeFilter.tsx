"use client";

import React, { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main CSS file
import "react-date-range/dist/theme/default.css"; // Theme CSS file

const DateRangeFilter: React.FC = () => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const handleSelect = (date: Date) => {
    setStartDate(date);

    const formattedDate = date.toLocaleDateString("en-CA");
    const url = new URL(window.location.href);
    url.searchParams.set("date", formattedDate);
    window.history.pushState({}, "", url.toString());

    setIsPickerOpen(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-CA");
  };

  return (
    <div className="flex flex-col md:flex-row justify-end w-full md:w-[406px] h-auto md:h-[47px] gap-1 md:gap-7 px-4 md:px-0">
      <span className="pr-[6px] text-[12px] font-[500px]">Date Range</span>
      <div
        className="w-full md:w-[300px] h-[35px] border border-[#EFF2F5] rounded-md px-2 pt-1 relative"
        onClick={() => setIsPickerOpen(!isPickerOpen)}
      >
        <span className=" text-[#7E8299] pl-[6px] ">
          {formatDate(startDate)}
        </span>
        {isPickerOpen && (
          <div className="absolute top-[40px] z-10 bg-white shadow-md rounded-md">
            <Calendar
              date={startDate}
              onChange={handleSelect}
              color="#4CAF50"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangeFilter;
