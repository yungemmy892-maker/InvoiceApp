import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEY } from '../utils/constants'
import { SEED_INVOICES } from '../utils/seedData'
import { generateId, addDays } from '../utils/helpers'

export function useInvoices() {
  const [invoices, setInvoices] = useLocalStorage(STORAGE_KEY, SEED_INVOICES)

  const calcTotal = useCallback(
    (items) =>
      (items || []).reduce(
        (s, it) => s + (Number(it.qty) || 0) * (Number(it.price) || 0),
        0
      ),
    []
  )

  const createInvoice = useCallback(
    (data, asDraft) => {
      const inv = {
        id:           generateId(),
        status:       asDraft ? 'draft' : 'pending',
        createdAt:    data.invoiceDate,
        paymentTerms: Number(data.paymentTerms),
        paymentDue:   addDays(data.invoiceDate, data.paymentTerms),
        description:  data.description,
        billFrom:     { ...data.billFrom },
        billTo:       { ...data.billTo },
        items:        data.items.map((it) => ({
          name:  it.name,
          qty:   Number(it.qty),
          price: Number(it.price),
        })),
      }
      setInvoices((prev) => [inv, ...prev])
      return inv
    },
    [setInvoices]
  )

  const updateInvoice = useCallback(
    (id, data) => {
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id !== id
            ? inv
            : {
                ...inv,
                createdAt:    data.invoiceDate,
                paymentTerms: Number(data.paymentTerms),
                paymentDue:   addDays(data.invoiceDate, data.paymentTerms),
                description:  data.description,
                billFrom:     { ...data.billFrom },
                billTo:       { ...data.billTo },
                items:        data.items.map((it) => ({
                  name:  it.name,
                  qty:   Number(it.qty),
                  price: Number(it.price),
                })),
              }
        )
      )
    },
    [setInvoices]
  )

  const deleteInvoice = useCallback(
    (id) => setInvoices((prev) => prev.filter((inv) => inv.id !== id)),
    [setInvoices]
  )

  const markPaid = useCallback(
    (id) =>
      setInvoices((prev) =>
        prev.map((inv) => (inv.id === id ? { ...inv, status: 'paid' } : inv))
      ),
    [setInvoices]
  )

  return { invoices, calcTotal, createInvoice, updateInvoice, deleteInvoice, markPaid }
}