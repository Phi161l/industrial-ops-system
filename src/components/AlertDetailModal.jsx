'use client';

import { X, Clock, AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import styles from '../styles/AlertDetail.module.css';
import { formatTime } from '../utils/helpers';
import Link from 'next/link';

export default function AlertDetailModal({ alert, onClose }) {
  if (!alert) return null;

  const levelConfig = {
    info: {
      color: '#2196F3',
      icon: <Info size={24} />,
      bgColor: 'rgba(33, 150, 243, 0.1)',
      label: 'Information'
    },
    warning: {
      color: '#FFC107',
      icon: <AlertTriangle size={24} />,
      bgColor: 'rgba(255, 193, 7, 0.1)',
      label: 'Warning'
    },
    error: {
      color: '#F44336',
      icon: <AlertCircle size={24} />,
      bgColor: 'rgba(244, 67, 54, 0.1)',
      label: 'Error'
    },
    critical: {
      color: '#E53935',
      icon: <AlertCircle size={24} />,
      bgColor: 'rgba(229, 57, 53, 0.1)',
      label: 'Critical'
    }
  };

  const config = levelConfig[alert.level] || levelConfig.info;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.alertType} style={{ 
            color: config.color, 
            backgroundColor: config.bgColor 
          }}>
            {config.icon}
            <span>{config.label}</span>
          </div>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.alertMessage}>
            <h2>{alert.message}</h2>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <Clock size={18} className={styles.detailIcon} />
              <div>
                <label>Timestamp</label>
                <p>{formatTime(alert.timestamp)}</p>
              </div>
            </div>

            <div className={styles.detailItem}>
              <AlertCircle size={18} className={styles.detailIcon} />
              <div>
                <label>Alert ID</label>
                <p>{alert.id}</p>
              </div>
            </div>

            <div className={styles.detailItem}>
              <CheckCircle2 size={18} className={styles.detailIcon} />
              <div>
                <label>Status</label>
                <p className={alert.acknowledged ? styles.acknowledged : styles.unacknowledged}>
                  {alert.acknowledged ? 'Acknowledged' : 'Unacknowledged'}
                </p>
              </div>
            </div>

            {alert.machineId && (
              <div className={styles.detailItem}>
                <Link href={`/machine/${alert.machineId}`} className={styles.machineLink}>
                  <div>
                    <label>Machine ID</label>
                    <p>{alert.machineId} → View Details</p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <button onClick={onClose} className={styles.closeBtn}>
              Close
            </button>
            {alert.machineId && (
              <Link href={`/machine/${alert.machineId}`} className={styles.viewMachineBtn}>
                View Machine Details
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

