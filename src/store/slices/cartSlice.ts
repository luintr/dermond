import { ICartItem } from '@/types/global';
import { updateCart } from '@/utils/mathUtils';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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
      item.uuid = uuidv4();
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
        return x.uuid === item.uuid;
      });

      if (existItem) {
        state.cartItems = state.cartItems.map((x: ICartItem) =>
          x.uuid === existItem.uuid ? item : x
        );
      }

      return updateCart(state);
    },

    modifyAtributesCartItem: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x: ICartItem) => x.uuid === item.uuid
      );

      const duplicatedItem = state.cartItems.find((x: ICartItem) => {
        return (
          x._id === item._id && x.color === item.color && x.size === item.size
        );
      });

      if (duplicatedItem) {
        return state;
      } else if (existItem) {
        state.cartItems = state.cartItems.map((x: ICartItem) =>
          x.uuid === existItem.uuid ? item : x
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
  modifyAtributesCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
