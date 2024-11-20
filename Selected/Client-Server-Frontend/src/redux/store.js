// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";  // Import the cart slice

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,  // Add the cart reducer here
  },
});

export default store;
