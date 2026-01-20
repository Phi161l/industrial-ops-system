'use client';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function MachineDetailChart({ machine }) {
  // For demo, let's simulate data over time
  const data = {
    labels: machine.history.map(h => new Date(h.timestamp).toLocaleTimeString()), // timestamps
    datasets: [
      {
        label: 'Efficiency (%)',
        data: machine.history.map(h => h.efficiency),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.3)',
        tension: 0.3
      },
      {
        label: 'Production Count',
        data: machine.history.map(h => h.productionCount),
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.3)',
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `${machine.name} Performance Over Time` }
    }
  };

  return <Line data={data} options={options} />;
}
