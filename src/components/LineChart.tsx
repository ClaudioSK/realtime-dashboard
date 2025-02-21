'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: number[];
  label: string;
  color: string;
}

export default function LineChart({ data, label, color }: LineChartProps) {
  const chartData = {
    labels: data.map((_, index) => `${index + 1}m`),
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-[200px]">
      <Line options={options} data={chartData} />
    </div>
  );
}