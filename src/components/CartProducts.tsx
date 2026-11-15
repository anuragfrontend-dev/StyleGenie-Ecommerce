import CartItem from "./CartItem";
import { useDispatch,  useSelector } from "react-redux";
import { useCallback } from "react";
import './CartProducts.css'
import { removeFromCart, updateCartQuantity } from "../stores/cartSlice";
import { RootState } from '../stores/store';

export function CartProducts() {
  const dispatch=useDispatch();
  const { cart } =useSelector((state:RootState)=>state.cart);

  const updateQuantity = useCallback((id: number, newQuantity: number) => {
    dispatch(updateCartQuantity({id,qty:newQuantity}))
  }, [dispatch]);

  const removeItem = useCallback((id: number) => {
    dispatch(removeFromCart(id));
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