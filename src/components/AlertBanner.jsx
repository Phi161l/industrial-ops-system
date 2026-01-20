import styles from '../styles/Alerts.module.css';
import { formatTime } from '../utils/helpers';
import { CircleAlert, CircleX, Info } from 'lucide-react'; 

export default function AlertBanner({ alert }) {
  const { message, level, timestamp, acknowledged } = alert;

  const levelColor = {
    info: '#2196F3',
    warning: '#FFC107',
    error: '#F44336',
    critical: '#E53935'
  }[level] || '#999';

  const iconMap = {
    info: <Info size={20} color={levelColor} />,
    warning: <CircleAlert size={20} color={levelColor} />,
    error: <CircleX size={20} color={levelColor} />,
    critical: <CircleX size={20} color={levelColor} />
  };

  return (
    <div className={styles.alertCard} style={{ borderLeft: `6px solid ${levelColor}` }}>
      <div className={styles.alertHeader}>
        {iconMap[level]} 
        <h3>{level.toUpperCase()}</h3>
      </div>

      <p className={styles.alertMessage}>{message}</p>
      <div className={styles.alertFooter}>
        <span>⏱ {formatTime(timestamp)}</span>
        <span className={acknowledged ? styles.ackYes : styles.ackNo}>
          {acknowledged ? '✅ Acknowledged' : '⚠️ Unacknowledged'}
        </span>
      </div>
    </div>
  );
}
