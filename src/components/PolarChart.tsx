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
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderWidth: 1
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: {
        right: 120  // Espacio para las leyendas
      }
    },
    plugins: {
      legend: {
        position: 'right' as const,
        align: 'start' as const,
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 11
          }
        }
      }
    },
    scales: {
      r: {
        ticks: {
          backdropPadding: 3
        }
      }
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <PolarArea data={chartData} options={options} />
    </div>
  );
}