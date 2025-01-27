"use client";

import React, { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range"; // Import DateRange instead of Calendar
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangeFilter: React.FC = () => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: undefined,
    endDate: undefined,
  });

  const handleSelect = (ranges: any) => {
    const { selection } = ranges; // Get the selection from the ranges
    setDateRange({
      startDate: selection.startDate,
      endDate: selection.endDate,
    });

    const formattedStartDate = selection.startDate.toLocaleDateString("en-CA");
    const formattedEndDate = selection.endDate.toLocaleDateString("en-CA");
    const url = new URL(window.location.href);
    if (formattedStartDate === formattedEndDate) {
      url.searchParams.delete("endDate");
      url.searchParams.set("startDate", formattedStartDate);
    } else {
      url.searchParams.delete("startDate");
      url.searchParams.delete("endDate");
      url.searchParams.set("startDate", formattedStartDate);
      url.searchParams.set("endDate", formattedEndDate);
    }
    window.history.pushState({}, "", url.toString());
    setIsPickerOpen(false);
  };

  const formatDate = (date: Date | undefined) => {
    return date ? date.toLocaleDateString("en-CA") : "Select Date";
  };

  const pickerRef = useRef<HTMLDivElement | null>(null); // Ref for the date picker

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row justify-end w-full lg:w-[406px] h-auto lg:h-[47px] gap-1 lg:gap-7 px-4 lg:px-0">
      <span className="pr-[6px] text-[12px] font-[500px]">Date Range</span>
      <div
        className="w-full lg:w-[300px] h-[35px] border border-[#EFF2F5] rounded-md px-2 pt-1 relative"
        onClick={() => setIsPickerOpen(!isPickerOpen)}
      >
        <span className=" text-[#7E8299] pl-[6px] ">
          {dateRange.startDate && dateRange.endDate
            ? `${formatDate(dateRange.startDate)} - ${formatDate(
                dateRange.endDate
              )}`
            : "Select Date Range"}
        </span>
        {isPickerOpen && (
          <div
            ref={pickerRef}
            className="absolute top-[40px] z-10 bg-white shadow-md rounded-md"
          >
            <DateRange
              ranges={[
                {
                  startDate: dateRange.startDate || new Date() || undefined,
                  endDate: dateRange.endDate || new Date() || undefined,
                  key: "selection",
                },
              ]}
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
