'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MachineDetailCard from '../../../components/MachineDetailCard';
import Loader from '../../../components/Loader';

export default function MachineDetailPage() {
  const { id } = useParams();
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMachine = async () => {
      try {
        const res = await fetch(`/api/machines/${id}`);
        const data = await res.json();
        setMachine(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMachine();
  }, [id]);

  if (loading) return <Loader />;
  if (!machine) return <p style={{ textAlign: 'center' }}>Machine not found</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Machine Details</h1>
      <MachineDetailCard machine={machine} />
    </div>
  );
}
