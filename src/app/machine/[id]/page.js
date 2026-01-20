'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function MachineDetailPage() {
  const { id } = useParams();
  const [machine, setMachine] = useState(null);

  useEffect(() => {
    const fetchMachine = async () => {
      const res = await fetch(`/api/machines/${id}`);
      const data = await res.json();
      setMachine(data);
    };
    fetchMachine();
  }, [id]);

  if (!machine) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{machine.name}</h1>
      <p>Status: {machine.status}</p>
      <p>Efficiency: {machine.efficiency}%</p>
      <p>Production Count: {machine.productionCount}</p>
      <p>Last Updated: {new Date(machine.lastUpdated).toLocaleString()}</p>
    </div>
  );
}
