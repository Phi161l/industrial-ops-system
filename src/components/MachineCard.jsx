import styles from "../styles/MachineCard.module.css";
import Link from "next/link";
import { Gauge, Activity, Calendar } from "lucide-react";

export default function MachineCard({ machine }) {
  const statusColor = {
    running: "#4CAF50",
    idle: "#FFC107",
    maintenance: "#F44336",
  }[machine.status];

  return (
    <Link href={`/machine/${machine.id}`} className={styles.card} style={{ borderLeftColor: statusColor }}>
      <h3>{machine.name}</h3>
      <p>
        Status: <b style={{ color: statusColor }}>{machine.status.toUpperCase()}</b>
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
        <Gauge size={16} color="#667eea" />
        <p style={{ margin: 0 }}>Efficiency: <b>{machine.efficiency}%</b></p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
        <Activity size={16} color="#2196F3" />
        <p style={{ margin: 0 }}>Production: <b>{machine.productionCount}</b></p>
      </div>
      <p className={styles.timestamp}>
        <Calendar size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.25rem' }} />
        {new Date(machine.lastUpdated).toLocaleTimeString()}
      </p>
    </Link>
  );
}
