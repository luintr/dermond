import { ICartItem } from '@/types/global';
import { updateCart } from '@/utils/mathUtils';
import { createSlice } from '@reduxjs/toolkit';

const isLocalStorageAvailable = typeof localStorage !== 'undefined';

const initialState = isLocalStorageAvailable
  ? JSON.parse(localStorage.getItem('cart') ?? '{"cartItems": []}')
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'Paypal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x: ICartItem) => x._id === item._id
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((x: ICartItem) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x: ICartItem) => x._id !== action.payload
      );

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;

      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;

      return updateCart(state);
    },
    clearCartItems: state => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
