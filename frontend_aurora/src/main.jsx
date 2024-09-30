// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import { AuthProvider } from './auth/authContext.jsx'; // Importa AuthProvider
import './css/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> 
      <App />
    </AuthProvider>
  </React.StrictMode>,
)

