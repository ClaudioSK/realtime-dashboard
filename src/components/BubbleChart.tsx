'use client';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

interface BubbleChartProps {
  data: Array<{ x: number; y: number; r: number }>;
  label: string;
  color: string;
}

export default function BubbleChart({ data, label, color }: BubbleChartProps) {
  const chartData = {
    datasets: [{
      label,
      data,
      backgroundColor: `${color}88`,
      borderColor: color,
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
      <Bubble options={options} data={chartData} />
    </div>
  );
}