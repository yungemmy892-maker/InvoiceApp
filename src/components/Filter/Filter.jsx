import { useState, useRef, useEffect } from 'react'
import Checkbox from '../ui/Checkbox'
import { STATUSES } from '../../utils/constants'
import './Filter.css'

export default function Filter({ filters, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef()
  const activeCount = STATUSES.filter((s) => filters[s]).length

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="filter-wrap" ref={ref}>
      <button
        className="filter-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Filter invoices by status"
      >
        Filter{activeCount > 0 ? ` (${activeCount})` : ''} by status
        <svg
          className={`filter-toggle__chevron${open ? ' filter-toggle__chevron--open' : ''}`}
          width="11"
          height="7"
          viewBox="0 0 11 7"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 1l4.228 4.228L9.456 1"
            stroke="#7C5DFA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="filter-dropdown" role="listbox">
          {STATUSES.map((s) => (
            <div key={s} className="filter-dropdown__item">
              <Checkbox
                id={`filter-${s}`}
                label={s.charAt(0).toUpperCase() + s.slice(1)}
                checked={!!filters[s]}
                onChange={() => onChange(s)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}