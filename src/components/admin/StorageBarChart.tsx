"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PropType {
  userRes: any;
  serverRes: any;
  imageRes: any;
  fileRes: any;
}

const StorageBarChart = (props: PropType) => {
  const { userRes, serverRes, imageRes, fileRes } = props;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Discord Clone Supabase Storage",
      },
    },
  };

  const labels = [
    "User avatars",
    "Server avatars",
    "Image files",
    "Document files",
  ];

  const data = {
    labels,
    datasets: [
      {
        data: [
          userRes?.data?.length,
          serverRes.data?.length,
          imageRes.data?.length,
          fileRes.data?.length,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
      },
    ],
  };

  return (
    <div className="w-[90%] xl:w-[800px] p-4 bg-primary-white dark:bg-primary-gray rounded-md">
      <Bar options={options} data={data} />
    </div>
  );
};

export default StorageBarChart;
