import './StatusBadge.css'

export default function StatusBadge({ status }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1)
  return (
    <span className={`status-badge status-badge--${status}`} role="status">
      {label}
    </span>
  )
}