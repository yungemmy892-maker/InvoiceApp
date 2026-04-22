import { useState, useMemo } from 'react'
import Button from '../ui/Button'
import Filter from '../Filter/Filter'
import InvoiceListItem from './InvoiceListItem'
import EmptyState from './EmptyState'
import { useInvoiceContext } from '../../context/InvoiceContext'
import { STATUSES } from '../../utils/constants'
import './InvoiceList.css'

export default function InvoiceList({ onSelect, onNew }) {
  const { invoices } = useInvoiceContext()
  const [filters, setFilters] = useState({ draft: false, pending: false, paid: false })

  const activeFilters = useMemo(
    () => STATUSES.filter((s) => filters[s]),
    [filters]
  )

  const visible = useMemo(
    () =>
      activeFilters.length
        ? invoices.filter((inv) => activeFilters.includes(inv.status))
        : invoices,
    [invoices, activeFilters]
  )

  const toggleFilter = (status) =>
    setFilters((f) => ({ ...f, [status]: !f[status] }))

  const count = visible.length
  const countLabel =
    count === 0
      ? 'No invoices'
      : `There are ${count} total invoice${count !== 1 ? 's' : ''}`

  return (
    <div>
      <header className="page-header">
        <div className="page-header__left">
          <h1>Invoices</h1>
          <p>{countLabel}</p>
        </div>
        <div className="page-header__right">
          <Filter filters={filters} onChange={toggleFilter} />
          <Button variant="primary" onClick={onNew}>
            <span className="btn__icon" aria-hidden="true">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M5 1v8M1 5h8"
                  stroke="#7C5DFA"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            New Invoice
          </Button>
        </div>
      </header>

      {visible.length === 0 ? (
        <EmptyState filtered={activeFilters.length > 0} />
      ) : (
        <ul className="invoice-list" role="list">
          {visible.map((inv) => (
            <li key={inv.id} style={{ listStyle: 'none' }}>
              <InvoiceListItem invoice={inv} onClick={onSelect} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}