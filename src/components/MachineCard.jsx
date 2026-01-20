import styles from '../styles/MachineCard.module.css';
import Link from 'next/link';

export default function MachineCard({ machine }) {
  const statusColor = {
    running: '#4CAF50',
    idle: '#FFC107',
    maintenance: '#F44336'
  }[machine.status];

  return (
    <Link href={`/machine/${machine.id}`} className={styles.card}>
      <div style={{ borderLeft: `6px solid ${statusColor}` }}>
        <h3>{machine.name}</h3>
        <p>Status: <b style={{ color: statusColor }}>{machine.status}</b></p>
        <p>Efficiency: {machine.efficiency}%</p>
        <p>Production Count: {machine.productionCount}</p>
        <p className={styles.timestamp}>Last Updated: {new Date(machine.lastUpdated).toLocaleTimeString()}</p>
      </div>
    </Link>
  );
}
