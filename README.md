# Invoice App

A fully responsive Invoice Management Application built with React, matching the provided Figma design system.

## Stack

- **React 18** (no external UI libraries)
- **Vite** — development server & bundler
- **CSS Modules** per component (no Tailwind, no styled-components)
- **localStorage** for data + theme persistence

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Project Structure

```
src/
├── assets/
│   └── Illustration.jsx        # SVG empty-state illustration
├── components/
│   ├── ui/
│   │   ├── Button.jsx + .css
│   │   ├── Input.jsx  + .css
│   │   ├── Select.jsx + .css
│   │   ├── Checkbox.jsx + .css
│   │   └── Modal.jsx  + .css
│   ├── Filter/
│   │   └── Filter.jsx + .css
│   ├── StatusBadge/
│   │   └── StatusBadge.jsx + .css
│   ├── ThemeToggle/
│   │   └── ThemeToggle.jsx + .css
│   ├── InvoiceList/
│   │   ├── InvoiceList.jsx + .css
│   │   ├── InvoiceListItem.jsx + .css
│   │   └── EmptyState.jsx + .css
│   ├── InvoiceDetail/
│   │   ├── InvoiceDetail.jsx + .css
│   │   ├── InvoiceActions.jsx + .css
│   │   └── InvoiceInfo.jsx + .css
│   └── InvoiceForm/
│       ├── InvoiceForm.jsx + .css
│       ├── AddressFields.jsx
│       └── ItemList.jsx + .css
├── context/
│   ├── ThemeContext.jsx
│   └── InvoiceContext.jsx
├── hooks/
│   ├── useLocalStorage.js
│   └── useInvoices.js
├── pages/
│   ├── Home.jsx
│   ├── InvoiceDetailPage.jsx
│   └── NotFound.jsx + .css
├── styles/
│   ├── variables.css
│   ├── themes.css
│   └── global.css
├── utils/
│   ├── constants.js
│   ├── formatters.js
│   ├── helpers.js
│   ├── seedData.js
│   └── validators.js
├── App.jsx
└── main.jsx
```

---

## Features

| Feature | Details |
|---|---|
| **CRUD** | Create, read, update, delete invoices |
| **Draft / Pending / Paid** | Full status lifecycle |
| **Form Validation** | Required fields, email format, positive qty/price |
| **Filter** | Filter by Draft, Pending, Paid |
| **Light / Dark Mode** | Persisted via localStorage |
| **Responsive** | Mobile 320px → Tablet 768px → Desktop 1024px+ |
| **Accessibility** | Semantic HTML, ARIA labels, keyboard nav, focus management, ESC to close modals |
| **Persistence** | All data saved to localStorage |

---

## Architecture Notes

- **Context over prop-drilling**: `InvoiceContext` exposes all CRUD ops; `ThemeContext` exposes theme + toggle.
- **Custom hooks**: `useLocalStorage` handles safe read/write; `useInvoices` encapsulates all invoice operations.
- **No router library**: Simple `view` state (`'list' | 'detail' | '404'`) managed in `App.jsx` keeps the bundle minimal.
- **Co-located CSS**: Each component owns its own `.css` file imported directly — avoids global class collisions.
- **Seed data**: 7 sample invoices pre-loaded on first run via `SEED_INVOICES` in `utils/seedData.js`.

---

## Accessibility Notes

- All interactive elements are `<button>` or `<a>` — no `div` click handlers
- Form fields have associated `<label>` elements via `htmlFor`
- Delete modal traps via `aria-modal="true"`, closes on `ESC`
- Status badges use `role="status"`
- Invoice list uses `<ul role="list">` + `<li>` for proper list semantics
- Color contrast meets WCAG AA in both light and dark themes

---

## Trade-offs

- **No router**: React Router would improve back/forward browser navigation and deep-linking, but adds bundle weight. For this scope the state machine is sufficient.
- **CSS files over CSS-in-JS**: Slightly more files, but zero runtime overhead and easy to inspect/override.
- **No server**: Data lives in localStorage only. A real app would use a REST or GraphQL API with optimistic updates.