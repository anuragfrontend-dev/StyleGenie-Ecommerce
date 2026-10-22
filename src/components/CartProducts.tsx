import CartItem from "./CartItem";
import { useCart } from "../context/CartContext"
import { useCallback } from "react";
import './CartProducts.css'

export function CartProducts() {
  const { cart, dispatch } = useCart();

  const updateQuantity = useCallback((id: number, newQuantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: {
        id: id,
        qty: newQuantity
      }
    })
  }, [dispatch]);

  const removeItem = useCallback((id: number) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { id }
    })
  }, [dispatch]);

  return (
    <div className="cart-items">
      {cart.map((cartItem) => (
        <CartItem
          key={cartItem.productId}
          cartItem={cartItem}
          onQuantityChange={updateQuantity}
          onRemove={removeItem}
        />
      ))}
    </div>
  )
}