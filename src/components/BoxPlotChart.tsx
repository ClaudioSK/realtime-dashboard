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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BoxPlotChartProps {
  data: {
    min: number;
    q1: number;
    median: number;
    q3: number;
    max: number;
  };
  label: string;
  color: string;
}

export default function BoxPlotChart({ data, label, color }: BoxPlotChartProps) {
  const chartData = {
    labels: [label],
    datasets: [
      {
        label: 'Min-Max',
        data: [{ x: label, y: data.min, y1: data.max }],
        backgroundColor: `${color}33`,
        borderColor: color,
        borderWidth: 1,
      },
      {
        label: 'Q1-Q3',
        data: [{ x: label, y: data.q1, y1: data.q3 }],
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
      },
      {
        label: 'Median',
        data: [{ x: label, y: data.median }],
        backgroundColor: 'white',
        borderColor: color,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="h-[200px]">
      <Bar data={chartData} />
    </div>
  );
}