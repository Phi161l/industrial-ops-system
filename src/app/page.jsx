'use client';

import { useEffect, useState } from 'react';
import MachineStatusChart from '../components/MachineStatusChart';
import { Activity, Box, Zap } from 'lucide-react'; // icons
import styles from '../styles/Dashboard.module.css';
import Loader from '../components/Loader';

export default function DashboardPage() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMachines = async () => {
    try {
      const res = await fetch('/api/machines');
      const data = await res.json();
      setMachines(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
    const interval = setInterval(fetchMachines, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loader />;

  const averageEfficiency =
    machines.reduce((sum, m) => sum + m.efficiency, 0) / (machines.length || 1);
  const totalProduction = machines.reduce((sum, m) => sum + m.productionCount, 0);
  const statusCounts = machines.reduce(
    (acc, m) => {
      acc[m.status] = (acc[m.status] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <div className={styles.dashboard}>
      <h1>Industrial Operations Dashboard</h1>

      {/* Machine Efficiency Overview Chart */}
      {machines.length > 0 && (
        <div className={styles.chartContainer}>
          <h2 className={styles.sectionTitle}>Machine Efficiency Overview</h2>
          <MachineStatusChart machines={machines} />
        </div>
      )}

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Activity size={24} color="#4CAF50" />
            <h3>Average Efficiency</h3>
          </div>
          <p className={styles.cardValue}>{averageEfficiency.toFixed(1)}%</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Box size={24} color="#2196F3" />
            <h3>Total Production</h3>
          </div>
          <p className={styles.cardValue}>{totalProduction}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Zap size={24} color="#FFC107" />
            <h3>Status Breakdown</h3>
          </div>
          <ul className={styles.statusList}>
            {Object.entries(statusCounts).map(([status, count]) => (
              <li key={status}>
                <span className={styles.statusDot} data-status={status}></span>
                {status}: {count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
