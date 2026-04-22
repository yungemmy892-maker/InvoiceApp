import StatusBadge from '../StatusBadge/StatusBadge'
import { useInvoiceContext } from '../../context/InvoiceContext'
import { formatCurrency, formatDate } from '../../utils/formatters'
import './InvoiceListItem.css'

export default function InvoiceListItem({ invoice, onClick }) {
  const { calcTotal } = useInvoiceContext()
  const total = calcTotal(invoice.items)

  return (
    <button
      className="invoice-list-item"
      onClick={() => onClick(invoice.id)}
      aria-label={`Invoice ${invoice.id}, status ${invoice.status}, due ${formatDate(invoice.paymentDue)}, total ${formatCurrency(total)}`}
    >
      <span className="invoice-list-item__id">
        <span>#</span>{invoice.id}
      </span>
      <span className="invoice-list-item__due">
        Due {formatDate(invoice.paymentDue)}
      </span>
      <span className="invoice-list-item__client">
        {invoice.billTo.name || '—'}
      </span>
      <span className="invoice-list-item__amount">
        {formatCurrency(total)}
      </span>
      <span className="invoice-list-item__status">
        <StatusBadge status={invoice.status} />
      </span>
      <span className="invoice-list-item__arrow" aria-hidden="true">
        <svg
          width="7"
          height="10"
          viewBox="0 0 7 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L5 5L1 9"
            stroke="#7C5DFA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  )
}