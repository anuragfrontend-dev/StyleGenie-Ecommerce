
export interface Product {
  id: number;
  thumbnail: string;
  rating: number;
  price: number;
  title: string;
  category?: string;
}


export interface CartItem {
  productId: number;
  productImg: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
}

export interface CartState {
  cart: CartItem[];
}


export interface Order {
  orderId: string;
  totalAmount: number;
  totalQuantity: number;
  items: CartItem[];
  date: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  profilePic: string;
}


export type Users =User[];