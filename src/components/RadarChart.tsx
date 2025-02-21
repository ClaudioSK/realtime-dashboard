'use client';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  data: number[];
  label: string;
  color: string;
}

export default function RadarChart({ data, label, color }: RadarChartProps) {
  const chartData = {
    labels: ['Usuarios', 'Sesiones', 'Tráfico', 'CPU', 'Memoria', 'Red'],
    datasets: [{
      label,
      data,
      backgroundColor: `${color}33`,
      borderColor: color,
      borderWidth: 2,
    }]
  };

  return (
    <div className="h-[200px]">
      <Radar data={chartData} />
    </div>
  );
}