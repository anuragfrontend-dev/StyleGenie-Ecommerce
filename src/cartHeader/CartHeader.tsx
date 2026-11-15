import { Link } from 'react-router-dom';
import { Heart, Lock } from 'lucide-react';
import logo from '../assets/icon/logo.png';
import { useSelector } from 'react-redux';
import './CartHeader.css'
import { RootState } from '../stores/store';


export function CartHeader() {

  const { cart } = useSelector((state:RootState)=>state.cart);
  const { like } = useSelector((state:RootState)=>state.like);

  const totalLikeProducts = like.length;

  const totalQuantity = cart.reduce((sum, cartItems) => (sum + cartItems.productQuantity), 0)

  return (
    <header className="cart-header">
      <nav className="left-cart-section">
        <Link to="/" className='cart-nav-link'>
          <img src={logo} className='cart-logo' />
          <div className='cart-title'>StyleGenie</div>
        </Link>
      </nav>
      <nav className="middle-cart-section">
        <Link to="/">
          <div className='checkout'>Checkout(<span>{totalQuantity} items</span>)</div>
        </Link>
      </nav>
      <nav className="right-cart-section">
        <Link to='/Favourites' className='cart-nav-link cart-likes' >
          <Heart height={20} />
          <div className='cart-fav-text'>Favourites</div>
          {totalLikeProducts > 0 &&
            (<div className="cart-likes-count">{totalLikeProducts}</div>)}
        </Link>
        <Lock height={20} className='lock-icon' />
      </nav>
    </header>
  )
}

