import InvoiceList from '../components/InvoiceList/InvoiceList'

export default function Home({ onSelect, onNew }) {
  return <InvoiceList onSelect={onSelect} onNew={onNew} />
}