'use client';
import { useEffect, useState } from 'react';
import AlertBanner from '../../components/AlertBanner';
import AlertDetailModal from '../../components/AlertDetailModal';
import styles from '../../styles/Alerts.module.css';
import { AlertCircle, Filter } from 'lucide-react';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchAlerts = async () => {
      const res = await fetch('/api/alerts');
      const data = await res.json();
      setAlerts(data);
    };
    fetchAlerts();

    const interval = setInterval(fetchAlerts, 10000); 
    return () => clearInterval(interval);
  }, []);

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.level === filter);

  const alertCounts = {
    all: alerts.length,
    critical: alerts.filter(a => a.level === 'critical').length,
    error: alerts.filter(a => a.level === 'error').length,
    warning: alerts.filter(a => a.level === 'warning').length,
    info: alerts.filter(a => a.level === 'info').length,
    unacknowledged: alerts.filter(a => !a.acknowledged).length
  };

  return (
    <div className={styles.alertsContainer}>
      <div className={styles.alertsHeader}>
        <div>
          <h1 className={styles.alertsTitle}>
            <AlertCircle size={32} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} />
            System Alerts & Notifications
          </h1>
          <p className={styles.alertsSubtitle}>
            Monitor and manage system alerts in real-time. Click on any alert to view detailed information.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterTabs}>
        <button 
          className={`${styles.filterTab} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({alertCounts.all})
        </button>
        <button 
          className={`${styles.filterTab} ${filter === 'critical' ? styles.active : ''}`}
          onClick={() => setFilter('critical')}
        >
          Critical ({alertCounts.critical})
        </button>
        <button 
          className={`${styles.filterTab} ${filter === 'error' ? styles.active : ''}`}
          onClick={() => setFilter('error')}
        >
          Error ({alertCounts.error})
        </button>
        <button 
          className={`${styles.filterTab} ${filter === 'warning' ? styles.active : ''}`}
          onClick={() => setFilter('warning')}
        >
          Warning ({alertCounts.warning})
        </button>
        <button 
          className={`${styles.filterTab} ${filter === 'info' ? styles.active : ''}`}
          onClick={() => setFilter('info')}
        >
          Info ({alertCounts.info})
        </button>
        <button 
          className={`${styles.filterTab} ${filter === 'unacknowledged' ? styles.active : ''}`}
          onClick={() => setFilter('unacknowledged')}
        >
          Unacknowledged ({alertCounts.unacknowledged})
        </button>
      </div>

      {filteredAlerts.length === 0 ? (
        <div className={styles.emptyState}>
          <AlertCircle size={64} style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <h3>No Alerts Found</h3>
          <p>No alerts match the current filter criteria.</p>
        </div>
      ) : (
        <div className={styles.alertList}>
          {filteredAlerts.map(alert => (
            <AlertBanner 
              key={alert.id} 
              alert={alert}
              onClick={() => setSelectedAlert(alert)}
            />
          ))}
        </div>
      )}

      {selectedAlert && (
        <AlertDetailModal 
          alert={selectedAlert} 
          onClose={() => setSelectedAlert(null)} 
        />
      )}
    </div>
  );
}
