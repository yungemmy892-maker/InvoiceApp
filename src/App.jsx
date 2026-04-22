import { useState, useCallback, useEffect } from 'react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { InvoiceProvider } from './context/InvoiceContext'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import InvoiceForm from './components/InvoiceForm/InvoiceForm'
import Home from './pages/Home'
import InvoiceDetailPage from './pages/InvoiceDetailPage'
import NotFound from './pages/NotFound'
import avatar from './assets/sidebar.png';
import sidebarLogo from './assets/sidebarlogo.png'

/* ── Sidebar logo — exact Figma invoice-app logo ──────────────── */
function SidebarLogo() {
  return (
    <img
      src={sidebarLogo}
      alt="Invoice App Logo"
      className="sidebar__logo-svg"
    />
  )
}
/* ── Avatar — real person picture from online ─────────────────── */
function AvatarSVG() {
  return (
    <img
      src={avatar}
      alt="User avatar"
      width="40"
      height="40"
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        objectFit: 'cover',
        display: 'block',
      }}
      onError={(e) => {
        /* fallback if image fails to load */
        e.target.style.display = 'none'
        e.target.nextSibling && (e.target.nextSibling.style.display = 'flex')
      }}
    />
  )
}

/* ── Inner app — has access to theme context ─────────────────── */
function AppInner() {
  const { theme } = useTheme()

  // Apply data-theme to <html> so ALL CSS vars cascade everywhere
  // (body, portals, everything)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Routing state
  const [view,         setView]         = useState('list')
  const [selectedId,   setSelectedId]   = useState(null)
  const [showForm,     setShowForm]     = useState(false)
  const [editInvoice,  setEditInvoice]  = useState(null)

  const goToList   = useCallback(() => { setView('list');   setSelectedId(null) }, [])
  const goToDetail = useCallback((id) => { setView('detail'); setSelectedId(id)  }, [])
  const openNewForm  = useCallback(() => { setEditInvoice(null);   setShowForm(true) }, [])
  const openEditForm = useCallback((inv) => { setEditInvoice(inv); setShowForm(true) }, [])
  const closeForm    = useCallback(() => { setShowForm(false); setEditInvoice(null) }, [])

  return (
    <div className="app-root">

      {/* ── Sidebar ─────────────────────────────────── */}
      <nav className="sidebar" aria-label="Main navigation">
        <div
          className="sidebar__logo-wrap"
          role="button"
          tabIndex={0}
          aria-label="Go to invoices list"
          onClick={goToList}
          onKeyDown={(e) => e.key === 'Enter' && goToList()}
        >
          <SidebarLogo />
        </div>

        <div className="sidebar__bottom">
          <ThemeToggle />
          <div className="sidebar__divider" aria-hidden="true" />
          <div className="sidebar__avatar" aria-label="User avatar">
            <AvatarSVG />
          </div>
        </div>
      </nav>

      {/* ── Main content ────────────────────────────── */}
      <main className="main-content">
        {view === 'list' && (
          <Home onSelect={goToDetail} onNew={openNewForm} />
        )}

        {view === 'detail' && selectedId && (
          <InvoiceDetailPage
            invoiceId={selectedId}
            onBack={goToList}
            onEdit={openEditForm}
          />
        )}

        {view === '404' && (
          <NotFound onBack={goToList} />
        )}
      </main>

      {/* ── Invoice form overlay ─────────────────────── */}
      {showForm && (
        <InvoiceForm invoice={editInvoice} onClose={closeForm} />
      )}
    </div>
  )
}

/* ── Root export with providers ──────────────────────────────── */
export default function App() {
  return (
    <ThemeProvider>
      <InvoiceProvider>
        <AppInner />
      </InvoiceProvider>
    </ThemeProvider>
  )
}