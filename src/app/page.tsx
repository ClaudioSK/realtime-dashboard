'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import dynamic from 'next/dynamic';

const LineChart = dynamic(() => import('@/components/LineChart'), { ssr: false });
const BarChart = dynamic(() => import('@/components/BarChart'), { ssr: false });
const DoughnutChart = dynamic(() => import('@/components/DoughnutChart'), { ssr: false });
const ScatterChart = dynamic(() => import('@/components/ScatterChart'), { ssr: false });
const BoxPlotChart = dynamic(() => import('@/components/BoxPlotChart'), { ssr: false });
const ParetoChart = dynamic(() => import('@/components/ParetoChart'), { ssr: false });
const PolarChart = dynamic(() => import('@/components/PolarChart'), { ssr: false });
const SystemMetricsBarChart = dynamic(() => import('@/components/SystemMetricsBarChart'), { ssr: false });
const BubbleChart = dynamic(() => import('@/components/BubbleChart'), { ssr: false });
import ChartPanel from '@/components/ChartPanel';
import MainChartPanel from '@/components/MainChartPanel';
import SubChartPanel from '@/components/SubChartPanel';
const MainDashboardChart = dynamic(() => import('@/components/MainDashboardChart'), { ssr: false });

export default function Home() {
  const [stats, setStats] = useState({
    activeUsers: 0,
    totalSessions: 0,
    serverStatus: 'Desconectado',
    newUsers: 0,
    recurringUsers: 0,
    otherUsers: 0,
    systemMetrics: {
      cpu: 0,
      memory: 0,
      network: 0
    }
  });

  const [userHistory, setUserHistory] = useState<number[]>([]);
  const [sessionHistory, setSessionHistory] = useState<number[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:3001', {
      withCredentials: true,
      transports: ['polling', 'websocket']
    });

    socket.on('connect_error', (error) => {
      console.log('Error de conexión:', error);
      setStats(prev => ({...prev, serverStatus: 'Error de conexión'}));
    });

    socket.on('connect', () => {
      console.log('Conectado al servidor');
      setStats(prev => ({...prev, serverStatus: 'Conectado'}));
    });

    socket.on('statsUpdate', (data) => {
      setStats(data);
      setUserHistory(prev => [...prev, data.activeUsers].slice(-10));
      setSessionHistory(prev => [...prev, data.totalSessions].slice(-10));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Add these new states at the top with other states
  // Remove or comment out this line
  // const [mainPanel, setMainPanel] = useState(0);
  
  // Keep only these states
  const [panel1, setPanel1] = useState(1);
  const [panel2, setPanel2] = useState(2);
  const [panel3, setPanel3] = useState(3);

  // Create an array of available charts
  // Add this function before the charts array
  // Primero, ajustamos el tamaño del contenedor principal
  const createChartComponent = (ChartComponent: React.ComponentType<any>, props: any, panelType: 'main' | 'small' | 'wide') => {
    const defaultOptions = {
      maintainAspectRatio: false,
      responsive: true,
      layout: {
        padding: panelType === 'main' ? {
          top: 20,
          right: 40,
          bottom: 20,
          left: 20
        } : 10
      },
      plugins: {
        legend: {
          position: panelType === 'main' ? 'right' : 'top',
          labels: {
            boxWidth: panelType === 'main' ? 20 : 12,
            padding: panelType === 'main' ? 20 : 10,
            font: {
              size: panelType === 'main' ? 14 : 11
            }
          }
        }
      }
    };
  
    // Ajustes específicos para el panel principal
    if (panelType === 'main') {
      defaultOptions.plugins = {
        ...defaultOptions.plugins,
        title: {
          display: true,
          font: {
            size: 18,
            weight: 'bold'
          },
          padding: 20
        },
        tooltip: {
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          },
          padding: 12
        }
      };
    }
  
    const chartProps = {
      ...props,
      options: {
        ...defaultOptions,
        ...props.options,
        plugins: {
          ...defaultOptions.plugins,
          ...props.options?.plugins
        }
      }
    };
  
    return <ChartComponent {...chartProps} />;
  };
  
  // Modify the charts array to use functions instead of direct components
  const charts = [
    {
      title: "Tendencia de Usuarios Activos",
      getComponent: (panelType: 'main' | 'small' | 'wide') => createChartComponent(LineChart, {
        data: userHistory,
        label: "Usuarios Activos",
        color: "#2563eb"
      }, panelType)
    },
    {
      title: "Sesiones por Minuto",
      getComponent: (panelType: 'main' | 'small' | 'wide') => createChartComponent(BarChart, {
        data: sessionHistory,
        label: "Sesiones",
        color: "#16a34a"
      }, panelType)
    },
    {
      title: "Distribución de Usuarios",
      getComponent: (panelType: 'main' | 'small' | 'wide') => createChartComponent(DoughnutChart, {
        data: [stats.activeUsers, stats.totalSessions - stats.activeUsers],
        labels: ['Activos', 'Inactivos'],
        colors: ['#2563eb', '#94a3b8']
      }, panelType)
    },
    {
      title: "Dispersión de Actividad",
      getComponent: (panelType: 'main' | 'small' | 'wide') => createChartComponent(ScatterChart, {
        data: userHistory.map((value, index) => ({ x: index, y: value })),
        label: "Actividad",
        color: "#8b5cf6",
        options: {
          aspectRatio: 1,
          scales: { x: { beginAtZero: true }, y: { beginAtZero: true } }
        }
      }, panelType)
    },
    {
      title: "Distribución de Sesiones",
      getComponent: (panelType: 'main' | 'small' | 'wide') => createChartComponent(BoxPlotChart, {
        data: {
          min: Math.min(...sessionHistory),
          q1: stats.totalSessions - 20,
          median: stats.totalSessions,
          q3: stats.totalSessions + 20,
          max: Math.max(...sessionHistory)
        },
        label: "Sesiones",
        color: "#eab308"
      }, panelType)
    },
    {
      title: "Análisis de Pareto",
      getComponent: (panelType: 'main' | 'small' | 'wide') => createChartComponent(ParetoChart, {
        data: [stats.activeUsers, stats.totalSessions - stats.activeUsers, stats.newUsers, stats.recurringUsers, stats.otherUsers],
        labels: ['Activos', 'Inactivos', 'Nuevos', 'Recurrentes', 'Otros'],
        color: "#0891b2"
      }, panelType)
    },
    // En el array de charts, actualiza las opciones de PolarChart y RadarChart
    {
      title: "Distribución de Recursos",
      getComponent: (panelType: 'main' | 'small' | 'wide') => createChartComponent(PolarChart, {
        data: [
          stats.activeUsers,
          stats.totalSessions,
          stats.systemMetrics?.cpu ?? 75,
          stats.systemMetrics?.memory ?? 60,
          stats.systemMetrics?.network ?? 45
        ],
        labels: ['Usuarios', 'Sesiones', 'CPU', 'Memoria', 'Red'],
        colors: ['#2563eb', '#16a34a', '#eab308', '#dc2626', '#8b5cf6'],
        options: {
          maintainAspectRatio: false,
          responsive: true,
          layout: {
            padding: {
              top: 20,
              right: 100,  // Aumentado para dar más espacio a las leyendas
              bottom: 20,
              left: 20
            }
          },
          plugins: {
            legend: {
              position: 'right',
              align: 'center',
              labels: {
                padding: 20,  // Espacio entre las etiquetas
                font: {
                  size: panelType === 'main' ? 14 : 12
                },
                boxWidth: 15  // Ancho del cuadro de color
              }
            }
          }
        }
      }, panelType)
    },
    {
      title: "Métricas del Sistema",
      getComponent: (panelType: 'main' | 'small' | 'wide') => createChartComponent(SystemMetricsBarChart, {
        data: stats.systemMetrics
      }, panelType)
    },
    {
      title: "Actividad de Usuarios",
      getComponent: (panelType: 'main' | 'small' | 'wide') => createChartComponent(BubbleChart, {
        data: [
          { x: stats.activeUsers, y: stats.totalSessions, r: 10 },
          { x: stats.activeUsers - 5, y: stats.totalSessions - 50, r: 15 },
          { x: stats.activeUsers + 5, y: stats.totalSessions + 50, r: 8 }
        ],
        label: "Actividad",
        color: "#dc2626"
      }, panelType)
    }
  ];

  // Replace the existing grid layouts with this new layout
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Panel de Control en Tiempo Real</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Usuarios Activos</h2>
              <div className="bg-blue-50 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <p className="text-4xl font-bold text-blue-600">{stats.activeUsers}</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Sesiones Totales</h2>
              <div className="bg-green-50 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <p className="text-4xl font-bold text-green-600">{stats.totalSessions}</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Estado del Servidor</h2>
              <div className="bg-gray-50 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
                </svg>
              </div>
              <p className="text-4xl font-bold text-gray-600">{stats.serverStatus}</p>
            </div>
          </div>
        </div>

        {/* Chart Selection Controls */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
          <select 
            className="p-2 rounded-lg border border-gray-200"
            value={mainPanel}
            onChange={(e) => setMainPanel(Number(e.target.value))}
          >
            {charts.map((chart, index) => (
              <option key={index} value={index}>{chart.title}</option>
            ))}
          </select>
          <select 
            className="p-2 rounded-lg border border-gray-200"
            value={panel1}
            onChange={(e) => setPanel1(Number(e.target.value))}
          >
            {charts.map((chart, index) => (
              <option key={index} value={index}>{chart.title}</option>
            ))}
          </select>
          <select 
            className="p-2 rounded-lg border border-gray-200"
            value={panel2}
            onChange={(e) => setPanel2(Number(e.target.value))}
          >
            {charts.map((chart, index) => (
              <option key={index} value={index}>{chart.title}</option>
            ))}
          </select>
          <select 
            className="p-2 rounded-lg border border-gray-200"
            value={panel3}
            onChange={(e) => setPanel3(Number(e.target.value))}
          >
            {charts.map((chart, index) => (
              <option key={index} value={index}>{chart.title}</option>
            ))}
          </select>
        </div> */}

        {/* Chart Controls and Layout */}
        <div className="space-y-4">
          {/* Main Chart */}
          <div className="w-full">
            <MainChartPanel title="Vista General del Sistema">
              <div className="w-full h-[500px] pb-8">
                <MainDashboardChart 
                  data={{
                    userHistory,
                    sessionHistory,
                    activeUsers: stats.activeUsers,
                    totalSessions: stats.totalSessions,
                    systemMetrics: stats.systemMetrics
                  }}
                />
              </div>
            </MainChartPanel>
          </div>

          {/* Sub Charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <select 
                className="w-full p-2 rounded-lg border border-gray-200 mb-4"
                value={panel1}
                onChange={(e) => setPanel1(Number(e.target.value))}
              >
                {charts.map((chart, index) => (
                  <option key={index} value={index}>{chart.title}</option>
                ))}
              </select>
              <SubChartPanel title={charts[panel1].title}>
                {charts[panel1].getComponent('small')}
              </SubChartPanel>
            </div>
          
            <div>
              <select 
                className="w-full p-2 rounded-lg border border-gray-200 mb-4"
                value={panel2}
                onChange={(e) => setPanel2(Number(e.target.value))}
              >
                {charts.map((chart, index) => (
                  <option key={index} value={index}>{chart.title}</option>
                ))}
              </select>
              <SubChartPanel title={charts[panel2].title}>
                {charts[panel2].getComponent('small')}
              </SubChartPanel>
            </div>
          
            <div>
              <select 
                className="w-full p-2 rounded-lg border border-gray-200 mb-4"
                value={panel3}
                onChange={(e) => setPanel3(Number(e.target.value))}
              >
                {charts.map((chart, index) => (
                  <option key={index} value={index}>{chart.title}</option>
                ))}
              </select>
              <SubChartPanel title={charts[panel3].title}>
                {charts[panel3].getComponent('small')}
              </SubChartPanel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
