import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  cart: [],
  count: 0,
  // showCounter: true,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      if (state.cart.count !== 0) {
        state.cart.push(action.payload);
      } else {
        let boolean = state.cart.every((item) => item.id !== action.payload.id);
        if (boolean) {
          state.cart.push(action.payload);
        }
      }
    },
    updateCart: (state, action) => {
      Object.assign(action.payload);
      let index = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      state.products.splice(index, 1, action.payload);
    },
    deleteCart: (state, action) => {
      let index = state.cart.findIndex((item) => item.id === action.payload);
      state.cart.splice(index, 1);
    },
    increment(state, action) {
      let index = state.cart.findIndex(
        (item) => item._id.$oid === action.payload.id
      );
      if (index) {
        state.count++;
      }
    },
    decrement(state, action) {
      let index = state.cart.findIndex((item) => item.id === action.payload.id);
      if (index && state.count > 0) {
        state.count--;
      }
    },
  },
});

export const counterActions = cartSlice.actions;

export default cartSlice.reducer;
