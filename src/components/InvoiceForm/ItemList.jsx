import Button from '../ui/Button'
import Input from '../ui/Input'
import { formatCurrency } from '../../utils/formatters'
import { mkItem } from '../../utils/helpers'
import './ItemList.css'

export default function ItemList({ items, onChange }) {
  const updateItem = (id, field, value) =>
    onChange(items.map((it) => (it._id === id ? { ...it, [field]: value } : it)))

  const removeItem = (id) => onChange(items.filter((it) => it._id !== id))

  const addItem = () => onChange([...items, mkItem()])

  return (
    <section className="item-list-section" aria-label="Invoice items">
      <h2 className="items-list-title">Item List</h2>

      {items.length > 0 && (
        <div className="items-list-head" aria-hidden="true">
          <span>Item Name</span>
          <span>Qty.</span>
          <span className="col-right">Price</span>
          <span className="col-right">Total</span>
          <span />
        </div>
      )}

      {items.map((it) => (
        <div
          key={it._id}
          className="item-row"
          role="group"
          aria-label={`Item: ${it.name || 'unnamed'}`}
        >
          <Input
            id={`item-name-${it._id}`}
            label={null}
            placeholder="Item name"
            value={it.name}
            onChange={(e) => updateItem(it._id, 'name', e.target.value)}
            aria-label="Item name"
          />
          <Input
            id={`item-qty-${it._id}`}
            label={null}
            type="number"
            min="1"
            value={it.qty}
            onChange={(e) => updateItem(it._id, 'qty', e.target.value)}
            aria-label="Quantity"
          />
          <Input
            id={`item-price-${it._id}`}
            label={null}
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={it.price}
            onChange={(e) => updateItem(it._id, 'price', e.target.value)}
            aria-label="Price"
          />
          <span className="item-row__total" aria-label="Item total">
            {formatCurrency((Number(it.qty) || 0) * (Number(it.price) || 0))}
          </span>
          <button
            type="button"
            className="item-row__delete"
            onClick={() => removeItem(it._id)}
            aria-label={`Delete item ${it.name || ''}`}
          >
            <svg width="13" height="16" viewBox="0 0 13 16" fill="none" aria-hidden="true">
              <path
                d="M11.583 3.556l-.91 10.111A1 1 0 0110 14.5H3a1 1 0 01-.673-.833l-.91-10.111M.5 3.556h12M4.5 3.556V2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v1.056"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      ))}

      <Button variant="add-item" onClick={addItem} type="button">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
          <path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        + Add New Item
      </Button>
    </section>
  )
}