// Formats a full timestamp (used in alerts)
export function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString([], { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: true 
  });
}

// Returns color code based on machine status
export function statusColor(status) {
  return {
    running: '#4CAF50',     // green
    idle: '#FFC107',        // yellow
    maintenance: '#F44336'  // red
  }[status] || '#999';
}

// Optional: add color for alert severity too
export function alertColor(level) {
  return {
    info: '#2196F3',
    warning: '#FFC107',
    error: '#F44336',
    critical: '#E53935'
  }[level] || '#999';
}
