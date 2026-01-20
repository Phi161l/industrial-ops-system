import styles from '../styles/DashboardHeader.module.css';
import { User } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>Industrial Operations</h2>
      <div className={styles.userInfo}>
        <div className={styles.userIcon}>
          <User size={18} />
        </div>
        <span>Supervisor</span>
      </div>
    </header>
  );
}
