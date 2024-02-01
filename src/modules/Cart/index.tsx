'use client';

import React, { useEffect, useState } from 'react';
import s from './styles.module.scss';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ROUTE_PATH } from '@/constants/route';
import { ICartItem } from '@/types/global';
import LinkEffect from '@/components/LinkEffect';
import { cinzelFont } from '@/utils/fonts';
import CartItem from './CartItem';

const CartModule = () => {
  const [cartList, setCartList] = useState<ICartItem[]>([]);
  const router = useRouter();
  // @ts-ignore:next-line
  const { userInfo } = useSelector(state => state.auth);

  // @ts-ignore:next-line
  const { cartItems } = useSelector(
    (state: { cart: { cartItems: ICartItem[] } }) => state.cart
  );

  useEffect(() => {
    setCartList(cartItems);
  }, [cartItems]);

  const checkoutHandler = () => {
    if (userInfo) {
      router.push('/payment');
    } else {
      router.push('/login?redirect=/payment');
    }
  };

  return (
    <div className={`${s.cartModule} container grid-cols-12`}>
      {cartList.length === 0 ? (
        <div className={s.emptyCart}>
          <div className={s.notification}>
            <p className={cinzelFont.className}>Your cart is empty</p>
            <LinkEffect href={ROUTE_PATH.SHOP}>Back top shop</LinkEffect>
          </div>
        </div>
      ) : (
        <div className={`${s.cart} grid grid-cols-12`}>
          <div className={`${s.cartList} col-span-7 col-start-2`}>
            {cartList.map(item => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
          <div className={`${s.cartInfo} col-span-4 col-start-9`}>
            <div className={s.cartInfo_top}>
              <p
                className={s.cartInfo_title}
              >{`${cartList.length} item${cartList.length > 0 && 's'}`}</p>

              <p>
                Total products:{' '}
                <span>
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              </p>
              <p>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </p>
            </div>

            <div>
              <button
                type="button"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </button>

              <LinkEffect href={ROUTE_PATH.SHOP}>Back To Shop</LinkEffect>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModule;
