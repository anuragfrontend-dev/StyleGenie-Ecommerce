import { memo } from "react";
import { money } from "../utils/money";
import { CartItem as CartItemType } from "../types";


interface CartItemProp {
  cartItem: CartItemType;
  onQuantityChange: (productId: number, productQuantity: number) => void;
  onRemove: (productId: number) => void;
}

function CartItem({ cartItem, onQuantityChange, onRemove }: CartItemProp) {

  return (
    <div className="cart-item" >
      <img src={cartItem.productImg} className='cart-item-img' />
      <div className="cart-item-details">
        <div className='cart-item-name'>{cartItem.productName}</div>
        <div className='cartItem-price'>₹{money(cartItem.productPrice).toLocaleString()}</div>
        <div className='details'>
          <div>Quantity:{cartItem.productQuantity}
            <select value={cartItem.productQuantity} onChange={(e) => {
              onQuantityChange(cartItem.productId, +e.target.value)
            }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <button className='remove-buttom'
            onClick={() => {
              onRemove(cartItem.productId)
            }}>remove</button>
        </div>
      </div>
    </div>
  )
}


export default memo(CartItem);