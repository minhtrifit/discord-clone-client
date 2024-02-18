"use client";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

const StorageBieChart = (props: PropType) => {
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

  const data = {
    labels: ["User avatars", "Server avatars", "Images", "Files"],
    datasets: [
      {
        label: "# of Storages",
        data: [
          userRes?.data?.length,
          serverRes?.data?.length,
          imageRes?.data?.length,
          fileRes?.data?.length,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-[40%] xl:w-[400px] p-4 bg-primary-white dark:bg-primary-gray rounded-md">
      <Pie options={options} data={data} />
    </div>
  );
};

export default StorageBieChart;
