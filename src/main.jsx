import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

// index.html carries a plain-HTML explanation for anyone whose browser never
// runs this file — a tablet showing it in a preview, most often. Reaching this
// line means it did run, so the explanation goes away.
document.getElementById('heartwood-no-js')?.remove()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
