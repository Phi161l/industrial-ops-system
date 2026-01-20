"use client";

import { useEffect, useState } from "react";
import MachineCard from "../../components/MachineCard";
import MachineRegistrationForm from "../../components/MachineRegistrationForm";
import styles from "../../styles/Machines.module.css";
import Loader from "../../components/Loader";
import { HardDrive } from "lucide-react";

export default function MachinesPage() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMachines = async () => {
    try {
      const res = await fetch("/api/machines");
      const data = await res.json();
      setMachines(data);
    } catch (err) {
      console.error("Failed to fetch machines:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
    const interval = setInterval(fetchMachines, 500);
    return () => clearInterval(interval);
  }, []);

  const handleMachineAdded = (newMachine) => {
    // Refresh the machines list
    fetchMachines();
  };

  if (loading) return <Loader />;

  // Calculate statistics
  const statusCounts = machines.reduce(
    (acc, m) => {
      acc[m.status] = (acc[m.status] || 0) + 1;
      return acc;
    },
    { running: 0, idle: 0, maintenance: 0 }
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          <HardDrive size={32} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} />
          Machines Management
        </h1>
        <MachineRegistrationForm onMachineAdded={handleMachineAdded} />
      </div>

      {/* Statistics Bar */}
      {machines.length > 0 && (
        <div className={styles.statsBar}>
          <div className={`${styles.statCard} ${styles.running}`}>
            <div className={styles.statLabel}>Running</div>
            <div className={styles.statValue}>{statusCounts.running || 0}</div>
          </div>
          <div className={`${styles.statCard} ${styles.idle}`}>
            <div className={styles.statLabel}>Idle</div>
            <div className={styles.statValue}>{statusCounts.idle || 0}</div>
          </div>
          <div className={`${styles.statCard} ${styles.maintenance}`}>
            <div className={styles.statLabel}>Maintenance</div>
            <div className={styles.statValue}>{statusCounts.maintenance || 0}</div>
          </div>
          <div className={styles.statCard} style={{ borderLeftColor: '#667eea' }}>
            <div className={styles.statLabel}>Total Machines</div>
            <div className={styles.statValue}>{machines.length}</div>
          </div>
        </div>
      )}

      {machines.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>🏭</div>
          <h3>No Machines Registered</h3>
          <p>Get started by registering your first machine</p>
          <MachineRegistrationForm onMachineAdded={handleMachineAdded} />
        </div>
      ) : (
        <div className={styles.machinesGrid}>
          {machines.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>
      )}
    </div>
  );
}
