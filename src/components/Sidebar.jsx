'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../styles/Sidebar.module.css";
import { Activity, AlertCircle, HardDrive, Wrench, Menu, X } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className={styles.mobileMenuButton}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className={styles.mobileOverlay}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
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
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Activity size={18} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                href="/machine"
                className={pathname === '/machine' ? styles.active : ''}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <HardDrive size={18} />
                Machines
              </Link>
            </li>
            <li>
              <Link 
                href="/alerts"
                className={pathname === '/alerts' ? styles.active : ''}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <AlertCircle size={18} />
                Alerts
              </Link>
            </li>
            <li>
              <Link 
                href="/Maintenance"
                className={pathname === '/Maintenance' ? styles.active : ''}
                onClick={() => setIsMobileMenuOpen(false)}
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
    </>
  );
}
