import { useNavigate } from "react-router-dom";
import { money } from "../utils/money";
import dayjs from 'dayjs'
import { useCart } from "../context/CartContext";
import './PaymentSummary.css'
import { Dispatch, SetStateAction } from "react";
import { Order } from "../types";

interface PaymentSummaryProp {
  setOrders: Dispatch<SetStateAction<Order[]>>
}

export function PaymentSummary({ setOrders }: PaymentSummaryProp) {
  const navigate = useNavigate();
  const { cart, dispatch } = useCart();

  const onOrder = (totalAmount: number, totalQuantity: number) => {
    const newOrder: Order = {
      orderId: crypto.randomUUID(),
      totalAmount,
      totalQuantity,
      items: cart,
      date: dayjs().toISOString()
    }

    setOrders(prev => ([newOrder, ...prev]));
    dispatch({ type: 'CLEAR_CART' })
  }

  const totalQuantity = cart.reduce((sum, cartItem) => sum + cartItem.productQuantity, 0);

  const totalPrice = cart.reduce((sum, cartItem) => sum + (cartItem.productQuantity * cartItem.productPrice), 0);


  const totalDeliveryCharge = cart.reduce((sum, cartItem) => {
    let delivery = 0
    let price = money(cartItem.productPrice);
    if (price <= 200) {
      delivery = 20;
    }
    else if (price > 200 && price <= 1000) {
      delivery = 40
    }
    else {
      delivery = 0
    }
    return sum + (delivery * cartItem.productQuantity)
  }, 0)

  const beforeTax = totalDeliveryCharge + money(totalPrice);

  const estimatedTax = (beforeTax / 100) * 10;

  const totalAmount = beforeTax + estimatedTax;


  return (
    <div className="price-summary">
      <h3>Price Details</h3>
      <div className="row">
        <span>Items ({totalQuantity}):</span>
        <span>₹{money(totalPrice).toLocaleString()}</span>
      </div>
      <div className="row">
        <span>Delivery charge:</span>
        <span className="delivery-charge">{totalDeliveryCharge === 0 ?
          <span className="free">FREE</span> : `₹${totalDeliveryCharge}`}</span>
      </div>
      <div className='row'>
        <span>Total before tax:</span>
        <span>₹{beforeTax.toLocaleString()}</span>
      </div>
      <div className='row'>
        <span>Estimated tax (10%):</span>
        <span>₹{Math.round(estimatedTax).toLocaleString()}</span>
      </div>
      <hr />
      <div className="row total">
        <span>Total Amount</span>
        <span className='total-amount'>₹{Math.round(totalAmount).toLocaleString()}</span>
      </div>

      <button
        className="buy-btn"
        disabled={cart.length === 0}
        onClick={() => {
          onOrder(totalAmount, totalQuantity)
          navigate('/Orders')
        }}
      >Place Order</button>
    </div>
  )
}