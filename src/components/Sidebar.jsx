import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h2>Industrial Ops</h2>
      <nav>
        <ul>
          <li><Link href="/">Dashboard</Link></li>
          <li><Link href="/alerts">Alerts</Link></li>
        </ul>
      </nav>
    </div>
  );
}
