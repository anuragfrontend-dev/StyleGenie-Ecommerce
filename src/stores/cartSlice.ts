import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {Product,CartState } from "../types";

const initialState:CartState={
  cart:JSON.parse(localStorage.getItem('cart')||'[]')
}

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
      addToCart:(state,action:PayloadAction<Product>)=>{
        
        const existing=state.cart.find((cartItem)=>cartItem.productId===action.payload.id);
        if(existing){
          existing.productQuantity+=1;
        }
        else{
          const newItem={
            productId:action.payload.id,
            productImg:action.payload.thumbnail,
            productPrice:action.payload.price,
            productName:action.payload.title,
            productQuantity:action.payload.qty || 1
          }
          state.cart.push(newItem);
        }
      },
      removeFromCart:(state,action:PayloadAction<number>)=>{
        state.cart=state.cart.filter((cartItem)=>cartItem.productId!==action.payload);
      },
      updateCartQuantity:(state,action:PayloadAction<{id:number,qty:number}>)=>{
        state.cart=state.cart.map((cartItem)=>(
          cartItem.productId===action.payload.id?
          {...cartItem, productQuantity:action.payload.qty}:cartItem
        ));
      },
      clearCart:(state)=>{
        state.cart=[];
      }
    }
})

export const { addToCart, removeFromCart, updateCartQuantity, clearCart}=cartSlice.actions;

export default cartSlice.reducer;