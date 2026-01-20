'use client';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MachineStatusChart({ machines }) {
  // Sort machines by efficiency for better visualization
  const sortedMachines = [...machines].sort((a, b) => b.efficiency - a.efficiency);
  
  const data = {
    labels: sortedMachines.map(m => m.name.length > 15 ? m.name.substring(0, 15) + '...' : m.name),
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
        padding: 12,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
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
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
}
