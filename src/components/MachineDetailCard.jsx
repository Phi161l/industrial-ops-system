import { Gauge, Activity, Settings, CalendarClock } from 'lucide-react';
import styles from '../styles/MachineDetail.module.css';
import { statusColor, formatTime } from '../utils/helpers';

export default function MachineDetailCard({ machine }) {
  const color = statusColor(machine.status);

  return (
    <div className={styles.detailCard}>
      <div className={styles.header} style={{ borderLeft: `8px solid ${color}` }}>
        <h2>{machine.name}</h2>
        <span className={styles.status} style={{ color }}>
          ● {machine.status.toUpperCase()}
        </span>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metricBox}>
          <Gauge color="#4CAF50" size={22} />
          <div>
            <p>Efficiency</p>
            <h3>{machine.efficiency}%</h3>
          </div>
        </div>

        <div className={styles.metricBox}>
          <Activity color="#2196F3" size={22} />
          <div>
            <p>Production Count</p>
            <h3>{machine.productionCount}</h3>
          </div>
        </div>

        <div className={styles.metricBox}>
          <Settings color="#FFC107" size={22} />
          <div>
            <p>Machine ID</p>
            <h3>{machine.id}</h3>
          </div>
        </div>

        <div className={styles.metricBox}>
          <CalendarClock color="#9E9E9E" size={22} />
          <div>
            <p>Last Updated</p>
            <h3>{formatTime(machine.lastUpdated)}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
