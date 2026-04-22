import { createContext, useContext } from 'react'
import { useInvoices } from '../hooks/useInvoices'

const InvoiceContext = createContext(null)

export function InvoiceProvider({ children }) {
  const ops = useInvoices()
  return <InvoiceContext.Provider value={ops}>{children}</InvoiceContext.Provider>
}

export function useInvoiceContext() {
  const ctx = useContext(InvoiceContext)
  if (!ctx) throw new Error('useInvoiceContext must be used within InvoiceProvider')
  return ctx
}