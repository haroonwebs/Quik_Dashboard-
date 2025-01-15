"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MyBarChart: React.FC = () => {
  const data = {
    labels: [
      "January 1",
      "January 2",
      "January 3",
      "January 4",
      "January 5",
      "January 6",
      "January 7",
      "January 8",
      "January 9",
      "January 10",
      "January 11",
      "January 12",
      "January 13",
      "January 14",
      "January 15",
      "January 16",
      "January 17",
      "January 18",
      "January 19",
      "January 20",
      "January 21",
      "January 22",
      "January 23",
      "January 24",
      "January 25",
      "January 26",
      "January 27",
      "January 28",
      "January 29",
      "January 30",
    ],
    datasets: [
      {
        label: "Dataset 1",
        data: [
          65, 59, 80, 81, 56, 55, 40, 70, 90, 100, 60, 50, 30, 20, 10, 5, 15,
          25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165,
        ],
        backgroundColor: "rgba(28, 58, 106, 1)",
        borderColor: "rgba(28, 58, 106, 1)",
        borderWidth: 0,
        stack: "Stack 0",
      },
      {
        label: "Dataset 2",
        data: [
          30, 20, 40, 50, 30, 25, 20, 15, 10, 5, 15, 25, 35, 45, 55, 65, 75, 85,
          95, 105, 115, 125, 135, 145, 155, 165, 175, 185, 195, 205, 215, 225,
        ],
        backgroundColor: "rgba(79, 201, 243, 1)",
        borderColor: "rgba(79, 201, 243, 1)",
        borderWidth: 0,
        borderRadius: 10,
        stack: "Stack 0",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Disable grid lines for the x-axis
        },
      },
      y: {
        grid: {
          display: false, // Enable grid lines for the y-axis
        },
        min: 0, // Set the minimum value of the y-axis
        max: 300, // Set the maximum value of the y-axis to accommodate stacked values
        ticks: {
          stepSize: 10, // Set the step size for the y-axis ticks
        },
        stacked: true, // Enable stacking on the y-axis
      },
    },
  };

  return <Bar data={data} options={options} height={210} />;
};

export default MyBarChart;
