import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavouritesProvider } from './context/FavouritesContext';
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <FavouritesProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FavouritesProvider>
    </BrowserRouter>
  </StrictMode>,
)
