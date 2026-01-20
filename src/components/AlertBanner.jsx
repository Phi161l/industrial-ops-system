'use client';

import styles from '../styles/Alerts.module.css';
import { formatTime } from '../utils/helpers';
import { CircleAlert, CircleX, Info, ChevronRight } from 'lucide-react'; 

export default function AlertBanner({ alert, onClick }) {
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
    <div 
      className={styles.alertCard} 
      style={{ borderLeft: `6px solid ${levelColor}` }}
      onClick={onClick}
    >
      <div className={styles.alertHeader}>
        <div className={styles.alertHeaderLeft}>
          {iconMap[level]} 
          <h3>{level.toUpperCase()}</h3>
        </div>
        <ChevronRight size={20} className={styles.chevron} />
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
