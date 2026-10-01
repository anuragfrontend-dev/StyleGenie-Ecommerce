import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { HomePage } from './pages/HomePage'
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { OrderPage } from './pages/OrderPage';
import { TrackingPage } from './pages/TrackingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ProfilePage } from './pages/ProfilePage';

import './App.css'

export default function App() {
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [addedMessageId, setAddedMessageId] = useState(null);
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders')) || []);
  const [search, setSearch] = useState('')

  async function getData() {
    try {
      const response = await axios.get(`https://dummyjson.com/products?limit=200`);
      await setProducts(response.data.products)
      await setDisplayProducts(response.data.products);

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders])


  return (
    <Routes>
      <Route path='/Login' element={<LoginPage />} />
      <Route path='/Signup' element={<SignupPage />} />
      <Route path='/' element={
        <ProtectedRoute>
          <HomePage
            products={products}
            setProducts={setProducts}
            displayProducts={displayProducts}
            setDisplayProducts={setDisplayProducts}
            setQuantity={setQuantity}
            quantity={quantity}
            addedMessageId={addedMessageId}
            setAddedMessageId={setAddedMessageId}
            setSearch={setSearch}
            search={search}
          />
        </ProtectedRoute>
      } />
      <Route path='/Favourites' element={
        <ProtectedRoute>
          <FavouritesPage
            products={products}
            quantity={quantity}
            setQuantity={setQuantity}
            setAddedMessageId={setAddedMessageId}
            addedMessageId={addedMessageId}
            setSearch={setSearch}
            search={search}
          />
        </ProtectedRoute>
      } />

      <Route path='/Cart' element={
        <ProtectedRoute>
          <CartPage
            orders={orders}
            setOrders={setOrders}
          />
        </ProtectedRoute>
      } />
      <Route path='/Orders' element={
        <ProtectedRoute>
          <OrderPage
            orders={orders}
            setOrders={setOrders}
          />
        </ProtectedRoute>
      } />
      <Route path='/Orders/:orderId/track/:productId' element={
        <ProtectedRoute>
          <TrackingPage
            orders={orders}
          />
        </ProtectedRoute>
      } />

      <Route path='/Profile' element={
        <ProtectedRoute >
          <ProfilePage />
        </ProtectedRoute>
      } />

    </Routes>
  )
}