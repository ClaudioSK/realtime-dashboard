'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ParetoChartProps {
  data: number[];
  labels: string[];
  color: string;
}

export default function ParetoChart({ data, labels, color }: ParetoChartProps) {
  const total = data.reduce((a, b) => a + b, 0);
  const sortedData = [...data].sort((a, b) => b - a);
  const cumulative = sortedData.map((_, i) => 
    (sortedData.slice(0, i + 1).reduce((a, b) => a + b, 0) / total) * 100
  );

  const chartData = {
    labels,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Valores',
        data: data,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        type: 'line' as const,
        label: 'Acumulado %',
        data: cumulative,
        borderColor: '#dc2626',
        borderWidth: 2,
        pointBackgroundColor: '#dc2626',
        pointRadius: 4,
        fill: false,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Valores'
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Porcentaje Acumulado'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="h-[200px]">
      <Chart type='bar' options={options} data={chartData} />
    </div>
  );
}