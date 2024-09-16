import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './home/login.css'
import Login from './home/login.jsx'; 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
  </StrictMode>,
);
