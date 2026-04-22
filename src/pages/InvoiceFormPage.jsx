import { useParams, useNavigate } from 'react-router-dom';
import { useInvoiceContext } from '../context/InvoiceContext';
import { InvoiceForm } from '../components/InvoiceForm/InvoiceForm';
import { useEffect } from 'react';

export const InvoiceFormPage = ({ mode }) => {
  const { id } = useParams();
  const { state } = useInvoiceContext();
  const navigate = useNavigate();

  const invoice = id ? state.invoices.find(inv => inv.id === id) : null;

  useEffect(() => {
    if (mode === 'edit' && !invoice) {
      navigate('/');
    }
  }, [mode, invoice, navigate]);

  return (
    <div>
      <h2 className="page-title">
        {mode === 'create' ? 'New Invoice' : `Edit #${id}`}
      </h2>
      <InvoiceForm initialData={invoice} mode={mode} />
    </div>
  );
};