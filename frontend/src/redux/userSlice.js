// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: localStorage.getItem('token') ? true : false,  // Check if token exists in localStorage
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('token', action.payload.token);  // Save token to localStorage
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');  // Remove token from localStorage
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
