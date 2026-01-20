import Link from "next/link";
import styles from "../styles/Sidebar.module.css";
import { Activity, BarChart, AlertCircle, HardDrive } from "lucide-react";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Industrial Ops</h2>
      <nav>
        <ul>
          <li>
            <Link href="/">
              {/* Dashboard icon */}
              <Activity size={16} style={{ marginRight: "0.5rem" }} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/machine">
              {/* Machines icon */}
              <HardDrive size={16} style={{ marginRight: "0.5rem" }} />
              Machines
            </Link>
          </li>
          <li>
            <Link href="/alerts">
              {/* Alerts icon */}
              <AlertCircle size={16} style={{ marginRight: "0.5rem" }} />
              Alerts
            </Link>
          </li>
          <li>
            <Link href="/Maintenance">
              {/* Maintenance icon */}
              <HardDrive size={16} style={{ marginRight: "0.5rem" }} />
              Maintenance
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
