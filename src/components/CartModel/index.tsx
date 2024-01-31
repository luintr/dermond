'use client';

import React, { useEffect, useState } from 'react';
import s from './style.module.scss';
import { useModelStore } from '@/store/zustandStore';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { ICartItem } from '@/types/global';
import { removeFromCart } from '@/store/slices/cartSlice';
import Link from 'next/link';

const CartModel = () => {
  const [cartList, setCartList] = useState<ICartItem[]>([]);

  const { modelState, setModelToggle } = useModelStore();
  const router = useRouter();
  const dispatch = useDispatch();

  // @ts-ignore:next-line
  const { cartItems } = useSelector(
    (state: { cart: { cartItems: ICartItem[] } }) => state.cart
  );

  useEffect(() => {
    setCartList(cartItems);
  }, [cartItems]);

  const removeFromCartHandler = async (id: string) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    setModelToggle();
    router.push('/cart');
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
                  <div key={item._id} className={s.cartItem}>
                    <div className={s.cartItem_img}>
                      <img src={item.image} alt="image" />
                    </div>
                    <div className={s.cartItem_content}>
                      <div className={s.wrapContent}>
                        <Link
                          href={`/product/${item._id}`}
                          className={s.cartItem_title}
                          onClick={setModelToggle}
                        >
                          {item.name}
                        </Link>
                        <div className={s.wrapSelect}>
                          <div className={s.cartItem_qty}>
                            <p>
                              Quantity: <span>{item.qty}</span>
                            </p>
                          </div>

                          <div className={s.cartItem_size}>
                            <p>
                              Size: <span>{item.size}</span>
                            </p>
                          </div>
                        </div>

                        <div className={s.cartItem_color}>
                          <p>
                            Color: <span>{item.color}</span>
                          </p>
                        </div>

                        <p className={s.cartItem_price}>
                          {item.qty} x ${item.price * item.qty}
                        </p>
                      </div>
                      <div
                        className={s.cartItem_delete}
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        Delete
                      </div>
                    </div>
                  </div>
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
