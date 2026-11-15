import { Star, CircleCheck, Heart } from 'lucide-react';
import { money } from '../utils/money';
import './DisplayProduct.css'
import { Dispatch, SetStateAction } from 'react';
import { Product } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { addToCart } from '../stores/cartSlice';
import { addToFav } from '../stores/likeSlice';

interface DisplayProductProp {
  displayProducts: Product[];
  setQuantity: Dispatch<SetStateAction<Record<number, number>>>;
  quantity: Record<number, number>;
  addedMessageId: number | null;
  setAddedMessageId: Dispatch<SetStateAction<number | null>>;
  search: string;
}

export function DisplayProduct({ displayProducts,
  setQuantity, quantity, addedMessageId, setAddedMessageId, search }: DisplayProductProp) {
  const cartDispatch=useDispatch();
  const likeDispatch=useDispatch();
  const { like }= useSelector((state:RootState)=>state.like)

  const handleAddedMessage = (id: number) => {
    setAddedMessageId(id);
    setTimeout(() => {
      setAddedMessageId(null);
    }, 1000);

  }

  const handleSelector = (e: React.ChangeEvent<HTMLSelectElement>, id: number) => {
    const val = +e.target.value;
    setQuantity(prev => ({ ...prev, [id]: val }));
  }


  const searchData = displayProducts.filter((displayItem) =>
    displayItem?.title?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      {searchData.map((product) => (
        <div className="cart" key={product.id}>
          <div className='product-image-container'>
            <img src={product.thumbnail} className='product-img' />
            <Heart height={24}
              fill={like.includes(product.id) ? '#ef4444' : 'none'}
              color={like.includes(product.id) ? '#ef4444' : '#dcdcdc'}
              className='heart-icon'
              onClick={() => {
                likeDispatch(addToFav(product.id));
              }}
            />
          </div>
          <div className="product-details">
            <div className='product-name'>{product.title}</div>
            <div className="content">
              <div className='product-rating' style={{
                background: (product.rating?? 0) > 4 ? '#10b981'
                  : (product.rating?? 0) > 3 ? '#f59e0b' : '#ef4444'
              }}>
                {(product.rating?? 0).toFixed(1)} <Star color='white' height={18} />
              </div>
              <select className='product-selector'
                value={quantity[product.id] || 1}
                onChange={(e) => handleSelector(e, product.id)}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div className='flex-content'>
              <div className='product-price'>₹{money(product.price).toLocaleString()}</div>
              {product.id === addedMessageId && (
                <div className='product-added'>
                  <CircleCheck height={24} color='#fff' fill='#10b981' />
                  Added
                </div>
              )}
            </div>
            <button className='add-to-cart-button'
              onClick={() => {
                cartDispatch(addToCart({
                  ...product,
                  qty: quantity[product.id] || 1,
                }))
                handleAddedMessage(product.id);
              }}>
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </>
  )
}