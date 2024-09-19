import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import '@/index.css'
import 'react-toastify/dist/ReactToastify.css'
import AuthProvider from './context/AuthProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
  </StrictMode>
)
