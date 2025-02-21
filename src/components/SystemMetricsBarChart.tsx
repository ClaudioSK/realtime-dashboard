'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
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

interface SystemMetricsBarChartProps {
  data: {
    cpu: number;
    memory: number;
    network: number;
  };
}

export default function SystemMetricsBarChart({ data }: SystemMetricsBarChartProps) {
  const chartData = {
    labels: ['CPU', 'Memoria', 'Red'],
    datasets: [
      {
        data: [data.cpu, data.memory, data.network],
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(37, 99, 235, 0.7)'
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(139, 92, 246)',
          'rgb(37, 99, 235)'
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.raw}%`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value: number) => `${value}%`
        }
      }
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center p-2">
      <div className="w-[90%] h-[90%]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}