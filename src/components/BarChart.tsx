'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: number[];
  label: string;
  color: string;
}

export default function BarChart({ data, label, color }: BarChartProps) {
  const chartData = {
    labels: data.map((_, index) => `${index + 1}m`),
    datasets: [
      {
        label,
        data,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
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
      <Bar options={options} data={chartData} />
    </div>
  );
}