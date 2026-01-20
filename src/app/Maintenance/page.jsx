'use client';

import { useEffect, useState } from 'react';
import styles from '../../styles/Dashboard.module.css';
import { Calendar, CheckCircle, AlertTriangle } from 'lucide-react';
import Loader from '../../components/Loader';

export default function ScheduledPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/scheduled');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <Loader />;

  const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

  const statusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FFC107'; // yellow
      case 'completed':
        return '#4CAF50'; // green
      case 'overdue':
        return '#F44336'; // red
      default:
        return '#999';
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '1.5rem' }}>
        Scheduled Maintenance Tasks
      </h1>

      <div className={styles.grid}>
        {tasks.map((task) => (
          <div
            key={task.id}
            className={styles.card}
            style={{ borderLeft: `5px solid ${statusColor(task.status)}` }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {task.status === 'completed' && <CheckCircle color="#4CAF50" />}
              {task.status === 'pending' && <Calendar color="#FFC107" />}
              {task.status === 'overdue' && <AlertTriangle color="#F44336" />}
              <h3>{task.task}</h3>
            </div>
            <p>
              <strong>Machine:</strong> {task.machineName}
            </p>
            <p>
              <strong>Scheduled:</strong> {formatDate(task.scheduledDate)}
            </p>
            <p>
              <strong>Status:</strong> {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
