'use client';

import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

interface PolarChartProps {
  data: number[];
  labels: string[];
  colors: string[];
}

export default function PolarChart({ data, labels, colors }: PolarChartProps) {
  const chartData = {
    labels,
    datasets: [{
      data,
      backgroundColor: colors,
      borderWidth: 1
    }]
  };

  return (
    <div className="h-[200px]">
      <PolarArea data={chartData} />
    </div>
  );
}