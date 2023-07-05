import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    favorate: false,
    wishList: 0,
  },

  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },

    deleteProduct: (state, action) => {
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload.id),
        1
      );
      state.quantity -= action.payload.quantity;
      state.total -= action.payload.price * action.payload.quantity;
    },
    addFavorate: (state, action) => {
      state.favorate = true;
      state.wishList += 1;
    },
  },
});

export const { addProduct, deleteProduct, addFavorate } = cartSlice.actions;
export default cartSlice.reducer;
