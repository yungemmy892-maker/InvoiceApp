import Button from '../components/ui/Button'
import './NotFound.css'

export default function NotFound({ onBack }) {
  return (
    <div className="not-found">
      <h2>404 — Not Found</h2>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      {onBack && (
        <Button variant="primary" onClick={onBack} style={{ marginTop: 8 }}>
          <span className="btn__icon" aria-hidden="true">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M9 5H1M4 1L0 5l4 4"
                stroke="#7C5DFA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Go back
        </Button>
      )}
    </div>
  )
}