import { Search,Heart } from 'lucide-react';
import { Link,NavLink} from 'react-router-dom';
import './Header.css'
import logo from '../assets/icon/logo.png'
import order from '../assets/icon/order.png'
import cartIcon from '../assets/icon/cart-icon.png'
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';
import { useEffect, useState } from 'react';



export default function Header({ search,setSearch }){
  
  const { cart }=useCart();
  const { like }=useFavourites();
  const[loggedInUser,setLoggedInUser]=useState();

  let totalLikeProducts=like.length;

  let totalQuantity=cart?.reduce((sum,item)=>sum+item.productQuantity,0)

  useEffect(()=>{
    const loadUser = () => {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      setLoggedInUser(user);
    }

    loadUser(); 

    window.addEventListener('userUpdated', loadUser);
    window.addEventListener('storage', loadUser);


    return () => {
      window.removeEventListener('userUpdated', loadUser);
      window.removeEventListener('storage', loadUser);
    }
  },[])

  
  const handleSearch=(event)=>{
    setSearch(event.target.value);
  }

  return(
    <header className='header'>
      <nav className="left-section">
        <Link to="/" className='nav-links'>
          <img src={logo} className='logo' />
          <div className='title-text'>StyleGenie</div>
        </Link>
      </nav>
      <div className="middle-section">
        <span className='search-icon'><Search height={22} width={22} color='#9ca3af' /></span>
        <input 
          type="search" 
          placeholder='Search' 
          className='search-bar'
          value={search}
          onChange={handleSearch}
        />
      </div>
      <nav className="right-section">
        <NavLink to='/Orders' className={({isActive})=> isActive? 'nav-links active':'nav-links'}>
          <img src={order} className='order-icon' />
          <div className='order-text'>Orders</div>
        </NavLink>
        <NavLink  to='/Favourites' className={({isActive})=> isActive? 'nav-links counter active':'nav-links counter'} >
          <Heart height={20} />
          <div className='fav-text'>Favourites</div>
          {totalLikeProducts >0 && 
          (<div className="likes-count">{totalLikeProducts}</div>)}
        </NavLink>
        <Link to="/Cart" className='nav-links counter'>
          <div>
            <img src={cartIcon} className='cart-icon' />
            {totalQuantity>0 && 
            (<div className="cart-count">{totalQuantity}</div>)}
          </div>
           <div className='cart-text'>Cart</div>
        </Link>
        <Link to={'/Profile'}>
          {loggedInUser?.profilePic?(
            <img src={loggedInUser.profilePic} style={{objectFit:'cover', objectPosition:'top'}} 
            className='profile-pic' />
          ):(
            <img src='/user.png' className='profile-pic' />
          )}
        </Link>
      </nav>
    </header>
  )
}