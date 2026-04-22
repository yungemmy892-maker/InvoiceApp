import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

// Apply saved theme immediately to <html> before first paint
// so there's no flash of the wrong theme
const savedTheme = localStorage.getItem('invoiceapp_theme_v2')
document.documentElement.setAttribute(
  'data-theme',
  savedTheme ? JSON.parse(savedTheme) : 'light'
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)