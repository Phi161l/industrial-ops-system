import './globals.css';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import styles from '../styles/Layout.module.css';

export const metadata = {
  title: 'Industrial Ops Dashboard',
  description: 'System Engineering Industrial Operations Dashboard'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.layoutContainer}>
        <Sidebar />
        <div className={styles.mainContent}>
          <DashboardHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
