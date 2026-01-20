"use client";

import { useEffect, useState } from "react";
import MachineCard from "../../components/MachineCard";
import styles from "../../styles/Dashboard.module.css"; // you can rename this to Machines.module.css later if needed
import Loader from "../../components/Loader";

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

  if (loading) return <Loader />;

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "1rem" }}>
        Machines Status & Details
      </h1>

      {machines.length === 0 ? (
        <p style={{ textAlign: "center" }}>No machines found</p>
      ) : (
        <div className={styles.grid}>
          {machines.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>
      )}
    </div>
  );
}
