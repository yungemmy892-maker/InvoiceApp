import { useState, useEffect, useCallback, useMemo } from 'react'
import InvoiceActions from './InvoiceActions'
import InvoiceInfo from './InvoiceInfo'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import { useInvoiceContext } from '../../context/InvoiceContext'
import './InvoiceDetail.css'

export default function InvoiceDetail({ invoiceId, onBack, onEdit }) {
  const { invoices, deleteInvoice, markPaid } = useInvoiceContext()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const invoice = useMemo(
    () => invoices.find((inv) => inv.id === invoiceId),
    [invoices, invoiceId]
  )

  const handleDelete = useCallback(() => {
    deleteInvoice(invoiceId)
    onBack()
  }, [deleteInvoice, invoiceId, onBack])

  const handleMarkPaid = useCallback(
    () => markPaid(invoiceId),
    [markPaid, invoiceId]
  )

  // Close on ESC (when modal isn't open)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && !showDeleteModal) onBack()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onBack, showDeleteModal])

  if (!invoice) {
    return (
      <div className="detail-not-found">
        <p>Invoice not found.</p>
        <Button variant="secondary" onClick={onBack}>Go back</Button>
      </div>
    )
  }

  return (
    <div className="detail-page">

      {/* Go back */}
      <button className="back-link" onClick={onBack} aria-label="Go back to invoices list">
        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" aria-hidden="true">
          <path d="M6 1L2 5l4 4" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Go back
      </button>

      {/* Status + action bar */}
      <InvoiceActions
        invoice={invoice}
        onEdit={() => onEdit(invoice)}
        onDelete={() => setShowDeleteModal(true)}
        onMarkPaid={handleMarkPaid}
      />

      {/* Invoice body */}
      <InvoiceInfo invoice={invoice} />

      {/* Mobile-only footer actions */}
      <footer className="detail-footer" role="toolbar" aria-label="Invoice actions">
        {invoice.status !== 'paid' && (
          <Button variant="edit" onClick={() => onEdit(invoice)}>Edit</Button>
        )}
        <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete</Button>
        {invoice.status === 'pending' && (
          <Button variant="mark-paid" onClick={handleMarkPaid}>Mark as Paid</Button>
        )}
      </footer>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <Modal
          title="Confirm Deletion"
          message={`Are you sure you want to delete invoice #${invoiceId}? This action cannot be undone.`}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  )
}