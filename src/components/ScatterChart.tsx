'use client';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

interface ScatterChartProps {
  data: Array<{ x: number; y: number }>;
  label: string;
  color: string;
}

export default function ScatterChart({ data, label, color }: ScatterChartProps) {
  const chartData = {
    datasets: [{
      label,
      data,
      backgroundColor: color,
    }]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-[200px]">
      <Scatter options={options} data={chartData} />
    </div>
  );
}