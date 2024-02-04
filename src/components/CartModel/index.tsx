'use client';

import React, { useEffect, useState } from 'react';
import s from './style.module.scss';
import { useModelStore } from '@/store/zustandStore';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { ICartItem } from '@/types/global';
import CartModelItem from './CartModelItem';

const CartModel = () => {
  const [cartList, setCartList] = useState<ICartItem[]>([]);

  const { modelState, setModelToggle } = useModelStore();
  // @ts-ignore:next-line
  const { userInfo } = useSelector(state => state.auth);
  const router = useRouter();

  // @ts-ignore:next-line
  const { cartItems } = useSelector(
    (state: { cart: { cartItems: ICartItem[] } }) => state.cart
  );

  useEffect(() => {
    setCartList(cartItems);
  }, [cartItems]);

  const checkoutHandler = () => {
    setModelToggle();
    if (userInfo) {
      router.push('/payment');
    } else {
      router.push('/login?redirect=/payment');
    }
  };

  return (
    <div className={`${s.cartModel} ${modelState ? s.active : null}`}>
      <div className={`${s.backdrop}`} onClick={() => setModelToggle()}></div>
      <div className={`${s.model}`}>
        <div className={s.cartModel_close} onClick={() => setModelToggle()}>
          Close
        </div>
        <h3 className={s.cartModel_title}>Overview Your Cart</h3>
        <div className={s.cartModel_list}>
          {cartList.length === 0 ? (
            <div className={s.emptyCart}>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className={`${s.cartList}`} data-lenis-prevent>
                {cartList.map(item => (
                  <CartModelItem key={item._id} item={item} />
                ))}
              </div>
              <div className={`${s.cartInfo}`}>
                <div className={s.cartInfo_subTotal}>
                  <p className={s.title}>Subtotal</p>
                  {/* <p>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</p> */}
                  <p className={s.content}>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </p>
                </div>

                <div className={s.cartInfo_btn}>
                  <button
                    type="button"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModel;
