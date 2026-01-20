'use client';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MachineStatusChart({ machines }) {
  const data = {
    labels: machines.map(m => m.name),
    datasets: [
      {
        label: 'Efficiency (%)',
        data: machines.map(m => m.efficiency),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }
    ]
  };
  const options = { responsive: true, plugins: { legend: { position: 'top' } } };

  return <Bar data={data} options={options} />;
}
