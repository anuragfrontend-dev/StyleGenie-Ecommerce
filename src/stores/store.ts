import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import likeReducer from './likeSlice'

export const store=configureStore({
  reducer:{
    cart:cartReducer,
    like:likeReducer,
  }
})
  
export type RootState = ReturnType<typeof store.getState>;
export type AppDisPatch = typeof store.dispatch;