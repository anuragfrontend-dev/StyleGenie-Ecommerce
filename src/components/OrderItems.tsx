import { RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getDeliveryProgress } from '../utils/delivery';
import dayjs from "dayjs"
import { useCart } from '../context/CartContext';
import './OrderItems.css'
import { Order, CartItem as CartItemType } from '../types';

interface OrderItemsProp {
  orderItems: Order;
  onCancelOrder: (id: number) => void;
}



export function OrderItems({ orderItems, onCancelOrder }: OrderItemsProp) {
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const { percent, deliveryDate } = getDeliveryProgress(orderItems.date);

  let deliveryStatus;

  if (percent >= 100) {
    deliveryStatus = <div className='status'>Delivered on: <span>{deliveryDate.format('MMM D')}</span></div>
  }
  else if (dayjs().isSame(deliveryDate, 'day')) {
    deliveryStatus = <div className='status order-arriving-today-status'>Arriving today</div>
  }
  else {
    deliveryStatus = <div className='status'>Arriving on: <span>{deliveryDate.format('MMM D')}</span></div>
  }

  return (
    <>
      {orderItems.items.map((cartItem: CartItemType) => (
        <div className="order-item" key={cartItem.productId}>
          <div className='order-image-container'>
            <img src={cartItem.productImg} className="product-img" />
          </div>
          <div className="orderItem-details">
            <div className="order-item-name">{cartItem.productName}</div>

            {deliveryStatus}

            <div className="order-quantity">Quantity:
              <span>{cartItem.productQuantity}</span></div>
            <button className="buy-it-again" onClick={() => {
              dispatch({
                type: 'ADD_TO_CART',
                payload: {
                  id: cartItem.productId,
                  thumbnail: cartItem.productImg,
                  title: cartItem.productName,
                  price: cartItem.productPrice,
                  qty: 1
                }
              })
            }}>
              <RefreshCcw color='#FFF' height={20} />
              Buy it again
            </button>
          </div>
          <div className="tracking-cancel-items-button">
            <button className='tracking-btn' onClick={() => {
              navigate(`/orders/${orderItems.orderId}/track/${cartItem.productId}`)
            }}>Track package</button>
            {percent < 100 && (
              <button className='order-btn' onClick={() => onCancelOrder(cartItem.productId)}>Cancel order</button>
            )}
          </div>
        </div>
      ))}
    </>
  )
}