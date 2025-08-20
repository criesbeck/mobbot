import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <AppRouter />
  </StrictMode>,
)
import { AppRouter } from './components/AppRouter';
