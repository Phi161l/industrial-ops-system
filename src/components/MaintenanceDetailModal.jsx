'use client';

import { X, Calendar, CheckCircle2, Clock, AlertTriangle, Wrench, HardDrive } from 'lucide-react';
import styles from '../styles/MaintenanceDetail.module.css';
import Link from 'next/link';

export default function MaintenanceDetailModal({ task, onClose }) {
  if (!task) return null;

  const statusConfig = {
    pending: {
      color: '#FFC107',
      icon: <Clock size={24} />,
      bgColor: 'rgba(255, 193, 7, 0.1)',
      label: 'Pending'
    },
    completed: {
      color: '#4CAF50',
      icon: <CheckCircle2 size={24} />,
      bgColor: 'rgba(76, 175, 80, 0.1)',
      label: 'Completed'
    },
    overdue: {
      color: '#F44336',
      icon: <AlertTriangle size={24} />,
      bgColor: 'rgba(244, 67, 54, 0.1)',
      label: 'Overdue'
    }
  };

  const config = statusConfig[task.status] || statusConfig.pending;
  const scheduledDate = new Date(task.scheduledDate);
  const isOverdue = task.status === 'pending' && scheduledDate < new Date();

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.taskStatus} style={{ 
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
          <div className={styles.taskTitle}>
            <Wrench size={24} className={styles.taskIcon} />
            <h2>{task.task}</h2>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <HardDrive size={18} className={styles.detailIcon} />
              <div>
                <label>Machine Name</label>
                <p>{task.machineName}</p>
              </div>
            </div>

            <div className={styles.detailItem}>
              <Calendar size={18} className={styles.detailIcon} />
              <div>
                <label>Scheduled Date</label>
                <p>{scheduledDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
                <p className={styles.timeText}>
                  {scheduledDate.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>

            <div className={styles.detailItem}>
              <CheckCircle2 size={18} className={styles.detailIcon} />
              <div>
                <label>Status</label>
                <p className={styles[task.status]}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </p>
                {isOverdue && (
                  <p className={styles.overdueWarning}>
                    ⚠️ This task is overdue
                  </p>
                )}
              </div>
            </div>

            <div className={styles.detailItem}>
              <div>
                <label>Task ID</label>
                <p>{task.id}</p>
              </div>
            </div>

            {task.machineId && (
              <div className={styles.detailItem}>
                <Link href={`/machine/${task.machineId}`} className={styles.machineLink}>
                  <div>
                    <label>Machine ID</label>
                    <p>{task.machineId} → View Machine Details</p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <button onClick={onClose} className={styles.closeBtn}>
              Close
            </button>
            {task.machineId && (
              <Link href={`/machine/${task.machineId}`} className={styles.viewMachineBtn}>
                View Machine Details
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

