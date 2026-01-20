'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../styles/Sidebar.module.css";
import { Activity, AlertCircle, HardDrive, Wrench } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className={styles.sidebar}>
      <div className={styles.logoSection}>
        <h2>
          <Activity className={styles.logoIcon} size={24} />
          Industrial Ops
        </h2>
      </div>
      <nav>
        <ul>
          <li>
            <Link 
              href="/"
              className={pathname === '/' ? styles.active : ''}
            >
              <Activity size={18} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              href="/machine"
              className={pathname === '/machine' ? styles.active : ''}
            >
              <HardDrive size={18} />
              Machines
            </Link>
          </li>
          <li>
            <Link 
              href="/alerts"
              className={pathname === '/alerts' ? styles.active : ''}
            >
              <AlertCircle size={18} />
              Alerts
            </Link>
          </li>
          <li>
            <Link 
              href="/Maintenance"
              className={pathname === '/Maintenance' ? styles.active : ''}
            >
              <Wrench size={18} />
              Maintenance
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.footer}>
        <div>© 2024 Industrial Ops</div>
      </div>
    </div>
  );
}
