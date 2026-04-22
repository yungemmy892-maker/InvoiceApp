import { useState, useEffect, useCallback } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import AddressFields from './AddressFields'
import ItemList from './ItemList'
import { useInvoiceContext } from '../../context/InvoiceContext'
import { PAYMENT_TERMS } from '../../utils/constants'
import { mkItem } from '../../utils/helpers'
import { validateInvoice, getFieldErrors } from '../../utils/validators'
import './InvoiceForm.css'

const defaultFormData = () => ({
  billFrom:     { street: '', city: '', postCode: '', country: '' },
  billTo:       { name: '', email: '', street: '', city: '', postCode: '', country: '' },
  invoiceDate:  new Date().toISOString().split('T')[0],
  paymentTerms: 30,
  description:  '',
  items:        [mkItem()],
})

export default function InvoiceForm({ invoice, onClose }) {
  const { createInvoice, updateInvoice } = useInvoiceContext()
  const isEdit = !!invoice

  const [formData, setFormData] = useState(() => {
    if (!invoice) return defaultFormData()
    return {
      billFrom:     { ...invoice.billFrom },
      billTo:       { ...invoice.billTo },
      invoiceDate:  invoice.createdAt,
      paymentTerms: invoice.paymentTerms,
      description:  invoice.description,
      items:        invoice.items.map((it) => ({ ...it, _id: it.name + Math.random() })),
    }
  })

  const [fieldErrors, setFieldErrors] = useState({})
  const [formErrors,  setFormErrors]  = useState([])

  const setFrom = (field, val) =>
    setFormData((d) => ({ ...d, billFrom: { ...d.billFrom, [field]: val } }))

  const setTo = (field, val) =>
    setFormData((d) => ({ ...d, billTo: { ...d.billTo, [field]: val } }))

  const setRoot = (field, val) =>
    setFormData((d) => ({ ...d, [field]: val }))

  const setItems = (items) =>
    setFormData((d) => ({ ...d, items }))

  const handleSubmit = (asDraft) => {
    const errs = validateInvoice(formData, asDraft)
    if (errs.length) {
      setFormErrors(errs)
      setFieldErrors(getFieldErrors(formData))
      return
    }
    setFormErrors([])
    setFieldErrors({})
    if (isEdit) {
      updateInvoice(invoice.id, formData)
    } else {
      createInvoice(formData, asDraft)
    }
    onClose()
  }

  const handleKey = useCallback(
    (e) => { if (e.key === 'Escape') onClose() },
    [onClose]
  )
  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [handleKey])

  return (
    <div
      className="form-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-title"
    >
      <div className="form-panel">
        <div className="form-panel__inner">
          <h1 className="form-title" id="form-title">
            {isEdit ? (
              <>Edit <span>#</span>{invoice.id}</>
            ) : (
              'New Invoice'
            )}
          </h1>

          {/* ── Bill From ─────────────────────────────── */}
          <fieldset className="form-fieldset">
            <legend className="form-section-title">Bill From</legend>
            <AddressFields
              prefix="billFrom"
              data={formData.billFrom}
              onChange={setFrom}
              errors={fieldErrors}
            />
          </fieldset>

          {/* ── Bill To ───────────────────────────────── */}
          <fieldset className="form-fieldset">
            <legend className="form-section-title form-section-title--mt">Bill To</legend>

            <div className="form-row">
              <Input
                id="to-name"
                label="Client's Name"
                value={formData.billTo.name}
                onChange={(e) => setTo('name', e.target.value)}
                error={fieldErrors['billTo.name']}
              />
            </div>
            <div className="form-row">
              <Input
                id="to-email"
                label="Client's Email"
                type="email"
                placeholder="e.g. email@example.com"
                value={formData.billTo.email}
                onChange={(e) => setTo('email', e.target.value)}
                error={fieldErrors['billTo.email']}
              />
            </div>

            <AddressFields
              prefix="billTo"
              data={formData.billTo}
              onChange={setTo}
              errors={fieldErrors}
            />
          </fieldset>

          {/* ── Invoice Details ───────────────────────── */}
          <fieldset className="form-fieldset">
            <legend className="form-section-title form-section-title--mt">Invoice Details</legend>

            <div className="form-grid-2 form-row">
              {/* Date */}
              <div className="form-field">
                <label htmlFor="inv-date" className="form-field__label">
                  Invoice Date
                </label>
                <div className="date-input-wrap">
                  <input
                    id="inv-date"
                    type="date"
                    className="form-input"
                    value={formData.invoiceDate}
                    onChange={(e) => setRoot('invoiceDate', e.target.value)}
                  />
                  <span className="date-input-wrap__icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="1" y="2" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M1 7h14M5 1v2M11 1v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Payment Terms */}
              <Select
                id="payment-terms"
                label="Payment Terms"
                options={PAYMENT_TERMS}
                value={formData.paymentTerms}
                onChange={(e) => setRoot('paymentTerms', Number(e.target.value))}
              />
            </div>

            <div className="form-row">
              <Input
                id="description"
                label="Project Description"
                placeholder="e.g. Graphic Design Service"
                value={formData.description}
                onChange={(e) => setRoot('description', e.target.value)}
                error={fieldErrors['description']}
              />
            </div>
          </fieldset>

          {/* ── Items ─────────────────────────────────── */}
          <ItemList items={formData.items} onChange={setItems} />

          {/* ── Error summary ─────────────────────────── */}
          {formErrors.length > 0 && (
            <ul className="form-errors" role="alert" aria-live="polite">
              {formErrors.map((err, i) => (
                <li key={i} className="form-errors__item">
                  {err}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Footer ────────────────────────────────── */}
        <footer className="form-footer">
          {isEdit ? (
            <>
              <span className="form-footer__spacer" />
              <Button variant="secondary" onClick={onClose}>Cancel</Button>
              <Button variant="send" type="button" onClick={() => handleSubmit(false)}>
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={onClose}>Discard</Button>
              <span className="form-footer__spacer" />
              <Button variant="draft" type="button" onClick={() => handleSubmit(true)}>
                Save as Draft
              </Button>
              <Button variant="send" type="button" onClick={() => handleSubmit(false)}>
                Save &amp; Send
              </Button>
            </>
          )}
        </footer>
      </div>

      {/* Click-outside backdrop */}
      <div className="form-backdrop" onClick={onClose} aria-hidden="true" />
    </div>
  )
}