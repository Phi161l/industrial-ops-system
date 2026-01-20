import './globals.css';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';

export const metadata = {
  title: 'Industrial Ops Dashboard',
  description: 'System Engineering Industrial Operations Dashboard'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '1rem', background: '#f5f5f5' }}>
          <DashboardHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
