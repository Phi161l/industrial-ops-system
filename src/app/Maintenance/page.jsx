'use client';

import { useEffect, useState } from 'react';
import styles from '../../styles/Maintenance.module.css';
import MaintenanceDetailModal from '../../components/MaintenanceDetailModal';
import { Calendar, CheckCircle, AlertTriangle, Wrench, ChevronRight } from 'lucide-react';
import Loader from '../../components/Loader';

export default function ScheduledPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState('all');

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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredTasks = filter === 'all' 
    ? tasks 
    : filter === 'overdue'
    ? tasks.filter(task => task.status === 'pending' && new Date(task.scheduledDate) < new Date())
    : tasks.filter(task => task.status === filter);

  // Calculate overdue tasks
  const tasksWithOverdue = filteredTasks.map(task => {
    const scheduledDate = new Date(task.scheduledDate);
    const isOverdue = task.status === 'pending' && scheduledDate < new Date();
    return { ...task, isOverdue };
  });

  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: tasks.filter(t => t.status === 'pending' && new Date(t.scheduledDate) < new Date()).length
  };

  return (
    <div className={styles.maintenanceContainer}>
      <div className={styles.maintenanceHeader}>
        <h1 className={styles.maintenanceTitle}>
          <Wrench size={32} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} />
          Scheduled Maintenance Tasks
        </h1>
        <p className={styles.maintenanceSubtitle}>
          Manage and track scheduled maintenance tasks for all machines. Click on any task to view detailed information and schedule.
        </p>
      </div>

      {/* Statistics Bar */}
      <div className={styles.statsBar}>
        <div className={`${styles.statCard} ${styles.pending}`}>
          <div className={styles.statLabel}>Pending</div>
          <div className={styles.statValue}>{taskCounts.pending}</div>
        </div>
        <div className={`${styles.statCard} ${styles.completed}`}>
          <div className={styles.statLabel}>Completed</div>
          <div className={styles.statValue}>{taskCounts.completed}</div>
        </div>
        <div className={`${styles.statCard} ${styles.overdue}`}>
          <div className={styles.statLabel}>Overdue</div>
          <div className={styles.statValue}>{taskCounts.overdue}</div>
        </div>
        <div className={styles.statCard} style={{ borderLeftColor: '#667eea' }}>
          <div className={styles.statLabel}>Total Tasks</div>
          <div className={styles.statValue}>{taskCounts.all}</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterTabs}>
        <button 
          className={`${styles.filterTab} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({taskCounts.all})
        </button>
        <button 
          className={`${styles.filterTab} ${filter === 'pending' ? styles.active : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending ({taskCounts.pending})
        </button>
        <button 
          className={`${styles.filterTab} ${filter === 'completed' ? styles.active : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({taskCounts.completed})
        </button>
        <button 
          className={`${styles.filterTab} ${filter === 'overdue' ? styles.active : ''}`}
          onClick={() => setFilter('overdue')}
        >
          Overdue ({taskCounts.overdue})
        </button>
      </div>

      {tasksWithOverdue.length === 0 ? (
        <div className={styles.emptyState}>
          <Wrench size={64} style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <h3>No Tasks Found</h3>
          <p>No maintenance tasks match the current filter criteria.</p>
        </div>
      ) : (
        <div className={styles.tasksGrid}>
          {tasksWithOverdue.map((task) => {
            const isOverdue = task.status === 'pending' && new Date(task.scheduledDate) < new Date();
            const displayStatus = isOverdue ? 'overdue' : task.status;
            
            return (
              <div
                key={task.id}
                className={`${styles.taskCard} ${styles[displayStatus]}`}
                onClick={() => setSelectedTask(task)}
              >
                <div className={styles.taskHeader}>
                  <div className={styles.taskTitle}>
                    {task.status === 'completed' && <CheckCircle size={20} color="#4CAF50" />}
                    {task.status === 'pending' && !isOverdue && <Calendar size={20} color="#FFC107" />}
                    {(task.status === 'overdue' || isOverdue) && <AlertTriangle size={20} color="#F44336" />}
                    <h3>{task.task}</h3>
                  </div>
                  <span className={`${styles.taskStatus} ${styles[displayStatus]}`}>
                    {displayStatus.toUpperCase()}
                  </span>
                </div>

                <div className={styles.taskInfo}>
                  <div className={styles.taskInfoItem}>
                    <strong>Machine:</strong> {task.machineName}
                  </div>
                  <div className={styles.taskInfoItem}>
                    <strong>Machine ID:</strong> {task.machineId}
                  </div>
                </div>

                <div className={styles.taskFooter}>
                  <div className={styles.taskDate}>
                    <Calendar size={16} />
                    {formatDate(task.scheduledDate)}
                  </div>
                  <ChevronRight size={20} className={styles.chevron} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedTask && (
        <MaintenanceDetailModal 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
        />
      )}
    </div>
  );
}
