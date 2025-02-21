'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MainDashboardChartProps {
  data: {
    userHistory: number[];
    sessionHistory: number[];
    activeUsers: number;
    totalSessions: number;
    systemMetrics: {
      cpu: number;
      memory: number;
      network: number;
    };
  };
}

const MainDashboardChart = ({ data }: MainDashboardChartProps) => {
  const labels = Array.from({ length: data.userHistory.length }, (_, i) => `T-${data.userHistory.length - i}`);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Usuarios Activos',
        data: data.userHistory,
        borderColor: '#2563eb',
        backgroundColor: '#2563eb33',
        fill: true,
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Sesiones',
        data: data.sessionHistory,
        borderColor: '#16a34a',
        backgroundColor: '#16a34a33',
        fill: true,
        tension: 0.4,
        yAxisID: 'y1'
      },
      {
        label: 'CPU',
        data: labels.map(() => data.systemMetrics.cpu),
        borderColor: '#8b5cf6',
        backgroundColor: '#8b5cf633',
        fill: true,
        tension: 0.4,
        yAxisID: 'y2'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14
          },
          padding: 20
        }
      },
      tooltip: {
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 13 }
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Usuarios',
          font: { size: 12 }
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Sesiones',
          font: { size: 12 }
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'CPU %',
          font: { size: 12 }
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default MainDashboardChart;