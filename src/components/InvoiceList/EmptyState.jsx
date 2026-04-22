import emptyImage from '../../assets/empty-invoice.png'
import './EmptyState.css'

export default function EmptyState({ filtered = false }) {
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <img
        src={emptyImage}
        alt="No invoices illustration"
        className="empty-state__illustration"
      />
      <div className="empty-state__text">
        <h2>There is nothing here</h2>
        <p>
          {filtered ? (
            'No invoices match the selected filter.'
          ) : (
            <>
              Create a new invoice by clicking the{' '}
              <strong>New Invoice</strong> button and get started
            </>
          )}
        </p>
      </div>
    </div>
  )
}