'use client';

import { useState } from 'react';
import { Plus, X, Loader2 } from 'lucide-react';
import styles from '../styles/MachineRegistration.module.css';

export default function MachineRegistrationForm({ onMachineAdded, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    status: 'idle',
    efficiency: 0,
    productionCount: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/machines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register machine');
      }

      // Reset form
      setFormData({
        id: '',
        name: '',
        status: 'idle',
        efficiency: 0,
        productionCount: 0
      });
      
      setIsOpen(false);
      if (onMachineAdded) {
        onMachineAdded(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'efficiency' || name === 'productionCount' 
        ? parseInt(value) || 0 
        : value
    }));
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)} 
        className={styles.addButton}
      >
        <Plus size={20} />
        Register New Machine
      </button>
    );
  }

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Register New Machine</h2>
          <button 
            onClick={() => {
              setIsOpen(false);
              setError('');
            }} 
            className={styles.closeButton}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.formGroup}>
            <label htmlFor="id">Machine ID *</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
              placeholder="e.g., M201"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name">Machine Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., CNC Router"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status">Initial Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="idle">Idle</option>
              <option value="running">Running</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="efficiency">Initial Efficiency (%)</label>
              <input
                type="number"
                id="efficiency"
                name="efficiency"
                value={formData.efficiency}
                onChange={handleChange}
                min="0"
                max="100"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="productionCount">Initial Production Count</label>
              <input
                type="number"
                id="productionCount"
                name="productionCount"
                value={formData.productionCount}
                onChange={handleChange}
                min="0"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setError('');
              }}
              className={styles.cancelButton}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className={styles.spinner} />
                  Registering...
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Register Machine
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

