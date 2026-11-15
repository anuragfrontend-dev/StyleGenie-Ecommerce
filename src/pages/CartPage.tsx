import { Link } from 'react-router-dom';
import { CartHeader } from '../cartHeader/CartHeader';
import { CartProducts } from '../components/CartProducts';
import { PaymentSummary } from '../components/PaymentSummary';
import { useSelector } from "react-redux";
import './CartPage.css';
import { Dispatch, SetStateAction } from 'react';
import { Order } from '../types';
import { RootState } from "../stores/store";

interface CartPageProp {
  setOrders: Dispatch<SetStateAction<Order[]>>
}

export function CartPage({ setOrders }: CartPageProp) {
  const { cart } = useSelector((state:RootState)=>state.cart)

  return (
    <main className='cart-page-container'>
      <CartHeader />

      <section className="cart-page">
        {cart?.length === 0 ? (
          <div>
            <div className='empty-text'>Your cart is empty.</div>
            <Link to="/">
              <button className='view-product'>View Products</button>
            </Link>
          </div>
        ) : (
          <>
            <div className='review-text'>Review your order</div>
            <section className="cart-items-container">
              <CartProducts />
              <PaymentSummary setOrders={setOrders} />
            </section>
          </>
        )}
      </section>
    </main>
  )
}

