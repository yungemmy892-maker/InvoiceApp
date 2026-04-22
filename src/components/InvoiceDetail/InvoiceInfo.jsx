import { useInvoiceContext } from '../../context/InvoiceContext'
import { formatCurrency, formatDate } from '../../utils/formatters'
import './InvoiceInfo.css'

export default function InvoiceInfo({ invoice }) {
  const { calcTotal } = useInvoiceContext()
  const total = calcTotal(invoice.items)

  return (
    <article className="invoice-info" aria-label={`Invoice ${invoice.id} details`}>

      {/* ── Header ──────────────────────────────────── */}
      <div className="invoice-info__header">
        <div>
          <div className="invoice-info__id">
            <span>#</span>{invoice.id}
          </div>
          <div className="invoice-info__desc">{invoice.description}</div>
        </div>
        <address className="invoice-info__sender-addr" aria-label="Sender address">
          {invoice.billFrom.street}<br />
          {invoice.billFrom.city}<br />
          {invoice.billFrom.postCode}<br />
          {invoice.billFrom.country}
        </address>
      </div>

      {/* ── Meta grid ───────────────────────────────── */}
      <div className="invoice-info__meta">
        {/* Dates */}
        <div className="meta-col">
          <div className="meta-group">
            <label>Invoice Date</label>
            <div className="meta-value">{formatDate(invoice.createdAt)}</div>
          </div>
          <div className="meta-group meta-group--mt">
            <label>Payment Due</label>
            <div className="meta-value">{formatDate(invoice.paymentDue)}</div>
          </div>
        </div>

        {/* Bill To */}
        <div className="meta-col">
          <label>Bill To</label>
          <div className="meta-value">{invoice.billTo.name || '—'}</div>
          <address className="meta-addr" aria-label="Client address">
            {invoice.billTo.street}<br />
            {invoice.billTo.city}<br />
            {invoice.billTo.postCode}<br />
            {invoice.billTo.country}
          </address>
        </div>

        {/* Sent To */}
        <div className="meta-col">
          <label>Sent to</label>
          <div className="meta-email">{invoice.billTo.email || '—'}</div>
        </div>
      </div>

      {/* ── Items table ─────────────────────────────── */}
      <div className="items-table">
        <div className="items-table__head" aria-hidden="true">
          <span>Item Name</span>
          <span className="col-right">QTY.</span>
          <span className="col-right">Price</span>
          <span className="col-right">Total</span>
        </div>

        <div className="items-table__body">
          {invoice.items.map((item, i) => (
            <div className="items-table__row" key={i} role="row">
              <div className="row-item-info">
                <span className="row-name">{item.name}</span>
                {/* Mobile only: shows "1 x £156.00" below the name */}
                <span className="row-mobile-meta">
                  {item.qty} x {formatCurrency(item.price)}
                </span>
              </div>
              <span className="row-qty" aria-label={`Qty ${item.qty}`}>{item.qty}</span>
              <span className="row-price">{formatCurrency(item.price)}</span>
              <span className="row-total">{formatCurrency(item.qty * item.price)}</span>
            </div>
          ))}
        </div>

        <div className="items-table__total">
          <span className="total-label">Amount Due</span>
          <span className="total-amount">{formatCurrency(total)}</span>
        </div>
      </div>

    </article>
  )
}