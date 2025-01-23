"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DougnatAverageProps {
  lessValue: number | never[];
  graterValue: number | never[];
  total: string;
}

const DougnatAverage: React.FC<DougnatAverageProps> = ({
  total,
  lessValue,
  graterValue,
}) => {
  const data = {
    datasets: [
      {
        data: [lessValue, graterValue],
        backgroundColor: ["#639787", "#8AEFD1"],
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
        <span className="text-xl tracking-tighter font-[600px]">{total}</span>{" "}
        {/* Total value */}
      </div>
    </div>
  );
};

export default DougnatAverage;
