import Button from '../ui/Button'
import StatusBadge from '../StatusBadge/StatusBadge'
import './InvoiceActions.css'

export default function InvoiceActions({ invoice, onEdit, onDelete, onMarkPaid }) {
  return (
    <div className="invoice-actions" role="toolbar" aria-label="Invoice actions">
      <span className="invoice-actions__label">Status</span>
      <StatusBadge status={invoice.status} />
      <div className="invoice-actions__buttons">
        {invoice.status !== 'paid' && (
          <Button variant="edit" onClick={onEdit}>
            Edit
          </Button>
        )}
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
        {invoice.status === 'pending' && (
          <Button variant="mark-paid" onClick={onMarkPaid}>
            Mark as Paid
          </Button>
        )}
      </div>
    </div>
  )
}