"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DeliveredOrderProps {
  lessValue: number | never[];
  graterValue: number | never[];
  total: number;
}

const DeliveredOrder: React.FC<DeliveredOrderProps> = ({
  graterValue,
  lessValue,
  total,
}) => {
  const data = {
    datasets: [
      {
        data: [lessValue, graterValue],
        backgroundColor: ["#1fe070", "#87f5b5"],
        borderColor: ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)"],
        borderWidth: 1,
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

export default DeliveredOrder;
