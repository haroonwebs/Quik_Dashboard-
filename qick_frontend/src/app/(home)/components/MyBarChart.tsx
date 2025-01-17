"use client";
import React from "react";
import { ordertypes } from "@/types/ordertypes";
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
interface MyCharProp {
  less: ordertypes[];
  grater: ordertypes[];
  timePeriod: string;
}

const MyBarChart: React.FC<MyCharProp> = ({ less, grater, timePeriod }) => {
  const generateFilteredData = () => {
    const today = new Date("2025-01-17");
    let labels = [];
    let data = [];

    if (timePeriod === "month") {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const daysInMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      ).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        labels.push(`${monthNames[today.getMonth()]} ${day}`);
        data.push(Math.floor(Math.random() * 100)); // Replace with actual data
      }
    } else if (timePeriod === "week") {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // Get the start of the week (Sunday)

      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startOfWeek);
        currentDay.setDate(startOfWeek.getDate() + i);
        labels.push(currentDay.toDateString());
        data.push(Math.floor(Math.random() * 100)); // Replace with actual data
      }
    } else if (timePeriod === "day") {
      labels.push(today.toDateString());
      data.push(Math.floor(Math.random() * 100)); // Replace with actual data
    }

    return { labels, data };
  };

  const { labels, data } = generateFilteredData();

  const chartTata = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [
          65, 59, 80, 81, 56, 55, 40, 70, 90, 100, 60, 50, 30, 20, 10, 5, 15,
          25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 123, 434,
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
          95, 105, 115, 125, 135, 145, 155, 165, 175, 185, 195, 234, 432,
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

  return <Bar data={chartTata} options={options} height={210} />;
};

export default MyBarChart;
