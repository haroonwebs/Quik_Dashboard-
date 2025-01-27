"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DougnatLiveProps {
  lessValue: number | never[];
  graterValue: number | never[];
  total: number;
}

const DougnatLive: React.FC<DougnatLiveProps> = ({
  lessValue,
  graterValue,
  total,
}) => {
  const data = {
    datasets: [
      {
        data: [lessValue, graterValue],
        backgroundColor: ["#4FC9F3", "#1C3A6A"],
        borderColor: ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "75%",
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="relative flex items-center justify-center pb-10">
      <Doughnut data={data} options={options} />
      <div className="absolute text-center">
        <span className="text-2xl font-[600px]">{total}</span>{" "}
      </div>
    </div>
  );
};

export default DougnatLive;
