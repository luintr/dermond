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
      const existItem = state.cartItems.find((x: ICartItem) => {
        return (
          x._id === item._id && x.color === item.color && x.size === item.size
        );
      });

      if (existItem) {
        // state.cartItems = state.cartItems.map((x: ICartItem) =>
        //   x._id === existItem._id ? item : x
        // );
        existItem.qty += item.qty;
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },

    modifyQtyCartItem: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x: ICartItem) => {
        return (
          x._id === item._id && x.color === item.color && x.size === item.size
        );
      });

      if (existItem) {
        state.cartItems = state.cartItems.map((x: ICartItem) =>
          x._id === existItem._id &&
          x.color === existItem.color &&
          x.size === existItem.size
            ? item
            : x
        );
      }

      return updateCart(state);
    },
    modifySizeCartItem: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x: ICartItem) => {
        return (
          x._id === item._id && x.color === item.color && x.qty === item.qty
        );
      });

      if (existItem) {
        state.cartItems = state.cartItems.map((x: ICartItem) =>
          x._id === existItem._id &&
          x.color === existItem.color &&
          x.qty === existItem.qty
            ? item
            : x
        );
      }

      return updateCart(state);
    },

    modifyColorCartItem: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x: ICartItem) => {
        return x._id === item._id && x.size === item.size && x.qty === item.qty;
      });

      if (existItem) {
        state.cartItems = state.cartItems.map((x: ICartItem) =>
          x._id === existItem._id &&
          x.size === existItem.size &&
          x.qty === existItem.qty
            ? item
            : x
        );
      }

      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      const item = action.payload;
      state.cartItems = state.cartItems.filter(
        (x: ICartItem) =>
          !(
            x._id === item._id &&
            x.color === item.color &&
            x.size === item.size
          )
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
  modifyQtyCartItem,
  modifySizeCartItem,
  modifyColorCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
