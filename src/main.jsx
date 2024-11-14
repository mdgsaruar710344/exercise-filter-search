import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './Router/Routes.jsx'
import ShopProvider from './context/ShopProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ShopProvider>
   <RouterProvider router={router} />
   </ShopProvider>
  </StrictMode>,
)
