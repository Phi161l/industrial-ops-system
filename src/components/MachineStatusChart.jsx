'use client';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MachineStatusChart({ machines }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sort machines by efficiency for better visualization
  const sortedMachines = [...machines].sort((a, b) => b.efficiency - a.efficiency);
  
  const data = {
    labels: sortedMachines.map(m => {
      if (isMobile && m.name.length > 12) {
        return m.name.substring(0, 12) + '...';
      }
      return m.name.length > 15 ? m.name.substring(0, 15) + '...' : m.name;
    }),
    datasets: [
      {
        label: 'Efficiency (%)',
        data: sortedMachines.map(m => m.efficiency),
        backgroundColor: sortedMachines.map(m => {
          if (m.efficiency >= 80) return 'rgba(76, 175, 80, 0.8)';
          if (m.efficiency >= 60) return 'rgba(255, 193, 7, 0.8)';
          return 'rgba(244, 67, 54, 0.8)';
        }),
        borderColor: sortedMachines.map(m => {
          if (m.efficiency >= 80) return 'rgba(76, 175, 80, 1)';
          if (m.efficiency >= 60) return 'rgba(255, 193, 7, 1)';
          return 'rgba(244, 67, 54, 1)';
        }),
        borderWidth: 2,
        borderRadius: 6
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: isMobile ? 8 : 12,
        titleFont: {
          size: isMobile ? 12 : 14
        },
        bodyFont: {
          size: isMobile ? 11 : 13
        },
        callbacks: {
          label: function(context) {
            return `Efficiency: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          },
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxRotation: isMobile ? 90 : 45,
          minRotation: isMobile ? 90 : 45,
          font: {
            size: isMobile ? 9 : 11
          }
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
}
