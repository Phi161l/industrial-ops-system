'use client';
import { useEffect, useState } from 'react';
import AlertBanner from '../../components/AlertBanner';
import styles from '../../styles/Alerts.module.css';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);

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

  return (
    <div className={styles.alertsContainer}>
      <h1 className={styles.alertsTitle}>⚠️ System Alerts & Notifications</h1>

      {alerts.length === 0 ? (
        <p>No active alerts</p>
      ) : (
        <div className={styles.alertList}>
          {alerts.map(alert => (
            <AlertBanner key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </div>
  );
}
