"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
  less: number | never[];
  grater: number | never[];
  timePeriod: string | never[];
}

const MyBarChart: React.FC<MyCharProp> = ({ less, grater, timePeriod }) => {
  const [status, setStatus] = useState<string | null>("live_orders");

  const searchParams = useSearchParams();
  useEffect(() => {
    const status = searchParams?.get("order_status");
    setStatus(status);
    console.log("status", status);
  }, [searchParams, status]);

  const generateFilteredData = () => {
    const today = new Date();
    let labels = [];
    let data_1 = [];
    let data_2 = [];

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
        data_1.push(grater); // Replace with actual data
        data_2.push(less);
      }
    } else if (timePeriod === "week") {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // Get the start of the week (Sunday)

      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startOfWeek);
        currentDay.setDate(startOfWeek.getDate() + i);
        labels.push(currentDay.toDateString());
        data_1.push(grater); // Replace with actual data
        data_2.push(less);
      }
    } else if (timePeriod === "day") {
      labels.push(today.toDateString());
      data_1.push(grater); // Replace with actual data
      data_2.push(less);
    }

    return { labels, data_1, data_2 };
  };

  let datacolor1;
  let datacolor2;
  let bordercolor;
  console.log("s", status);
  if (status === "average") {
    datacolor1 = "#639787";
    datacolor2 = "#8AEFD1";
    bordercolor = "rgba(28, 58, 106, 1)";
  } else if (status === "delayed") {
    datacolor1 = "#FFB5B5";
    datacolor2 = "#D48989";
    bordercolor = "rgba(28, 58, 106, 1)";
  } else if (status === "delivered") {
    datacolor1 = "#1fe070";
    datacolor2 = "#87f5b5";
    bordercolor = "rgba(28, 58, 106, 1)";
  } else {
    datacolor1 = "rgba(79, 201, 243, 1)";
    datacolor2 = "rgba(28, 58, 106, 1)";
    bordercolor = "rgba(28, 58, 106, 1)";
  }
  const { labels, data_1, data_2 } = generateFilteredData();

  const chartTData = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: data_2,
        backgroundColor: datacolor1,
        borderColor: bordercolor,
        borderWidth: 0,
        stack: "Stack 0",
      },
      {
        label: "Dataset 2",
        data: data_1,
        backgroundColor: datacolor2,
        borderColor: bordercolor,
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
        max: 160, // Set the maximum value of the y-axis to accommodate stacked values
        ticks: {
          stepSize: 20, // Set the step size for the y-axis ticks
        },
        stacked: true, // Enable stacking on the y-axis
      },
    },
  };

  return <Bar data={chartTData} options={options} height={200} />;
};

export default MyBarChart;
