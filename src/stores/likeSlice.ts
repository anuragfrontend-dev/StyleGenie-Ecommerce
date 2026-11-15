import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Like{
  like:number[];
}

const initialState:Like={
  like:JSON.parse(localStorage.getItem('like')||'[]')
}
const likeSlice=createSlice({
  name:'like',
  initialState,
  reducers:{
    addToFav:(state,action:PayloadAction<number>)=>{
      if(state.like.includes(action.payload)){
        state.like = state.like.filter(id=>id!==action.payload);
      }
      else{
        state.like.push(action.payload);
      }
    }
  }
})

export const { addToFav }=likeSlice.actions;

export default likeSlice.reducer;