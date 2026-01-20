'use client';
import { useEffect, useState } from 'react';
import MachineCard from '../components/MachineCard';
import styles from '../styles/Dashboard.module.css';

export default function DashboardPage() {
  const [machines, setMachines] = useState([]);

  const fetchMachines = async () => {
    const res = await fetch('/api/machines');
    const data = await res.json();
    setMachines(data);
  };

  useEffect(() => {
    fetchMachines();
    const interval = setInterval(fetchMachines, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.dashboard}>
      <h1>Industrial Operations Dashboard</h1>
      <div className={styles.grid}>
        {machines.map(machine => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>
    </div>
  );
}
