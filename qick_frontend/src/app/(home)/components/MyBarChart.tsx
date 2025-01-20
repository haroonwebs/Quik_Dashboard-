"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MyCharProp {
  lessValueOrders: ordertypes[] | never[];
  graterValueOrders: ordertypes[] | never[];
  timePeriod: string | never[];
}

const MyBarChart: React.FC<MyCharProp> = ({
  lessValueOrders,
  graterValueOrders,
  timePeriod,
}) => {
  const [status, setStatus] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [chartData, setChartData] = useState<{
    labels: string[];
    data_1: number[];
    data_2: number[];
  }>({
    labels: [],
    data_1: [],
    data_2: [],
  });

  useEffect(() => {
    const statusParam = searchParams?.get("order_status");
    setStatus(statusParam);
    console.log("status", statusParam);
  }, [searchParams]);

  useEffect(() => {
    // Call the function to generate filtered data and set it to the chartData state
    const { labels, data_1, data_2 } = generateFilteredData();
    setChartData({ labels, data_1, data_2 });
  }, [lessValueOrders, graterValueOrders, timePeriod]);

  const generateFilteredData = () => {
    const today = new Date();
    let labels: string[] = [];
    let data_1: number[] = [];
    let data_2: number[] = [];

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
        const dateLabel = `${monthNames[today.getMonth()]} ${day}`;
        labels.push(dateLabel);

        const dateKey = new Date(
          today.getFullYear(),
          today.getMonth(),
          day
        ).toLocaleDateString(); // Use local date string

        const greaterCount = graterValueOrders.filter(
          (order) => new Date(order.created_at).toLocaleDateString() === dateKey
        ).length;

        const lessCount = lessValueOrders.filter(
          (order) => new Date(order.created_at).toLocaleDateString() === dateKey
        ).length;

        data_1.push(greaterCount);
        data_2.push(lessCount);
      }
    } else if (timePeriod === "week") {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // Get the start of the week (Sunday)

      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startOfWeek);
        currentDay.setDate(startOfWeek.getDate() + i);

        const dateLabel = currentDay.toDateString(); // Example: "Sun Jan 14 2025"
        labels.push(dateLabel);

        const dateKey = currentDay.toLocaleDateString(); // Use local date string

        const greaterCount = graterValueOrders.filter(
          (order) => new Date(order.created_at).toLocaleDateString() === dateKey
        ).length;

        const lessCount = lessValueOrders.filter(
          (order) => new Date(order.created_at).toLocaleDateString() === dateKey
        ).length;

        data_1.push(greaterCount);
        data_2.push(lessCount);
      }
    } else if (timePeriod === "day") {
      const dateLabel = today.toDateString();
      labels.push(dateLabel);

      const dateKey = today.toLocaleDateString(); // Use local date string

      const greaterCount = graterValueOrders.filter(
        (order) => new Date(order.created_at).toLocaleDateString() === dateKey
      ).length;

      const lessCount = lessValueOrders.filter(
        (order) => new Date(order.created_at).toLocaleDateString() === dateKey
      ).length;

      data_1.push(greaterCount);
      data_2.push(lessCount);
    }

    return { labels, data_1, data_2 };
  };

  let datacolor1: string;
  let datacolor2: string;
  let bordercolor: string;

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

  const chartTData = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Dataset 1",
        data: chartData.data_2,
        backgroundColor: datacolor1,
        borderColor: bordercolor,
        borderRadius: 10,
        borderWidth: 0,
        stack: "Stack 0",
      },
      {
        label: "Dataset 2",
        data: chartData.data_1,
        backgroundColor: datacolor2,
        borderColor: bordercolor,
        borderRadius: 10,
        borderWidth: 0,
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
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        stacked: true,
      },
    },
  };

  return <Bar data={chartTData} options={options} height={200} />;
};

export default MyBarChart;
