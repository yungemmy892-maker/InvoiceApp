import InvoiceDetail from '../components/InvoiceDetail/InvoiceDetail'

export default function InvoiceDetailPage({ invoiceId, onBack, onEdit }) {
  return (
    <InvoiceDetail
      invoiceId={invoiceId}
      onBack={onBack}
      onEdit={onEdit}
    />
  )
}