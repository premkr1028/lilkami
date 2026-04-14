import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
 import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = "pk_test_c3VpdGFibGUtZ2VsZGluZy02MC5jbGVyay5hY2NvdW50cy5kZXYk"
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
      </ClerkProvider>
  </BrowserRouter>,
)
