import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button'
import './Modal.css'

export default function Modal({ title, message, onCancel, onConfirm, children }) {
  const handleKey = useCallback(
    (e) => { if (e.key === 'Escape') onCancel() },
    [onCancel]
  )

  useEffect(() => {
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKey)
    }
  }, [handleKey])

  return createPortal(
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onCancel}
    >
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title">{title}</h2>
        {message && <p>{message}</p>}
        {children}
        {(onCancel || onConfirm) && (
          <div className="modal-box__actions">
            {onCancel  && <Button variant="secondary" onClick={onCancel}>Cancel</Button>}
            {onConfirm && <Button variant="danger"    onClick={onConfirm}>Delete</Button>}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}