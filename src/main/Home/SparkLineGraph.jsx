import React, { useEffect } from "react";
import { useRef } from "react";
import { Line } from "react-chartjs-2";

const SparklineGraph = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = chartRef.current; // Get the chart instance
    if (chartInstance) {
      chartInstance.destroy(); // Destroy the previous chart instance
    }
  }, [data]); // Re-run this effect whenever the data changes

  const chartData = {
    labels: data.map((_, index) => index + 1),
    datasets: [
      {
        label: "Sparkline",
        data: data.map((value) => parseFloat(value)),
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        pointRadius: 0,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
        //type: "linear", // Specify the scale type
      },
      y: {
        display: false,
        //type: "linear", // Specify the scale type
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default SparklineGraph;
