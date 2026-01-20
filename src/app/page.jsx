'use client';

import { useEffect, useState } from 'react';
import MachineStatusChart from '../components/MachineStatusChart';
import StatusDistributionChart from '../components/StatusDistributionChart';
import ProductionTrendChart from '../components/ProductionTrendChart';
import { Activity, Box, Zap, TrendingUp, AlertCircle, Clock, BarChart3 } from 'lucide-react';
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
    const interval = setInterval(fetchMachines, 500);
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
  
  const runningMachines = machines.filter(m => m.status === 'running').length;
  const topEfficiency = machines.length > 0 
    ? Math.max(...machines.map(m => m.efficiency))
    : 0;
  const topMachine = machines.find(m => m.efficiency === topEfficiency);

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1>Industrial Operations Dashboard</h1>
        <p className={styles.dashboardDescription}>
          Real-time monitoring and analytics for your industrial operations. Track machine performance, 
          production metrics, and system status at a glance.
        </p>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Activity size={24} color="#4CAF50" />
            <h3>Average Efficiency</h3>
          </div>
          <p className={styles.cardValue}>{averageEfficiency.toFixed(1)}%</p>
          <p className={styles.cardDescription}>Across all machines</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Box size={24} color="#2196F3" />
            <h3>Total Production</h3>
          </div>
          <p className={styles.cardValue}>{totalProduction.toLocaleString()}</p>
          <p className={styles.cardDescription}>Units produced today</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Zap size={24} color="#FFC107" />
            <h3>Active Machines</h3>
          </div>
          <p className={styles.cardValue}>{runningMachines}</p>
          <p className={styles.cardDescription}>Currently running</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <TrendingUp size={24} color="#667eea" />
            <h3>Peak Efficiency</h3>
          </div>
          <p className={styles.cardValue}>{topEfficiency.toFixed(1)}%</p>
          <p className={styles.cardDescription}>{topMachine?.name || 'N/A'}</p>
        </div>
      </div>

      {/* Charts Grid */}
      {machines.length > 0 && (
        <div className={styles.chartsGrid}>
          <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
              <BarChart3 size={20} color="#667eea" />
              <h2 className={styles.sectionTitle}>Machine Efficiency Overview</h2>
            </div>
            <p className={styles.chartDescription}>
              Individual efficiency ratings for all registered machines
            </p>
            <div className={styles.chartWrapper}>
              <MachineStatusChart machines={machines} />
            </div>
          </div>

          <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
              <Activity size={20} color="#4CAF50" />
              <h2 className={styles.sectionTitle}>Status Distribution</h2>
            </div>
            <p className={styles.chartDescription}>
              Current operational status breakdown across the facility
            </p>
            <div className={styles.chartWrapper}>
              <StatusDistributionChart machines={machines} />
            </div>
          </div>

          <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
              <TrendingUp size={20} color="#2196F3" />
              <h2 className={styles.sectionTitle}>Top Production Performers</h2>
            </div>
            <p className={styles.chartDescription}>
              Leading machines by production output
            </p>
            <div className={styles.chartWrapper}>
              <ProductionTrendChart machines={machines} />
            </div>
          </div>
        </div>
      )}

      {/* Status Breakdown Card */}
      <div className={styles.statusCard}>
        <div className={styles.statusCardHeader}>
          <Clock size={20} color="#6b7280" />
          <h2 className={styles.sectionTitle}>Real-time Status Breakdown</h2>
        </div>
        <p className={styles.chartDescription}>
          Current operational status of all machines in the system
        </p>
        <ul className={styles.statusList}>
          {Object.entries(statusCounts).map(([status, count]) => (
            <li key={status} className={styles.statusItem}>
              <span className={styles.statusDot} data-status={status}></span>
              <span className={styles.statusLabel}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
              <span className={styles.statusCount}>{count} machines</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
