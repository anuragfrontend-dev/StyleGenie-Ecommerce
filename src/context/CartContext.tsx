import { createContext, useContext, useEffect, useReducer } from "react";
import { CartItem, CartState } from "../types";

interface AddToCart {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  qty: number;
}


type CartAction =
  | { type: 'ADD_TO_CART', payload: AddToCart }
  | { type: 'UPDATE_QUANTITY', payload: { id: number, qty: number } }
  | { type: 'REMOVE_FROM_CART', payload: { id: number } }
  | { type: 'CLEAR_CART' }

interface CartContextType {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
}


export const CartContext = createContext<CartContextType | undefined>(undefined);

const initialState: CartState = {
  cart: JSON.parse(localStorage.getItem('cart') || '[]')
}



function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART':
      const qty = action.payload.qty || 1;
      const newCart: CartItem = {
        productId: action.payload.id,
        productImg: action.payload.thumbnail,
        productName: action.payload.title,
        productPrice: action.payload.price,
        productQuantity: qty
      }
      const existing = state.cart.find(cartItem => cartItem.productId === action.payload.id);
      if (existing) {
        return {
          cart: state.cart.map(cartItem =>
            cartItem.productId === action.payload.id ?
              { ...cartItem, productQuantity: cartItem.productQuantity + qty } : cartItem)
        }
      }
      return { cart: [...state.cart, newCart] }

    case 'UPDATE_QUANTITY':
      return {
        cart: state.cart.map(cartItem =>
          cartItem.productId === action.payload.id ?
            { ...cartItem, productQuantity: Number(action.payload.qty) } : cartItem
        )
      }

    case 'REMOVE_FROM_CART':
      return {
        cart: state.cart.filter((cartItem) => cartItem.productId !== action.payload.id)
      }

    case 'CLEAR_CART':
      return { ...state, cart: [] }

    default:
      return state;

  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);


  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('Please write all components inside CartProvider');
  }
  return context;
}