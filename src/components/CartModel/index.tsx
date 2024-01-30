'use client';

import React, { useEffect, useState } from 'react';
import s from './style.module.scss';
import { useModelStore } from '@/store/zustandStore';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { ICartItem } from '@/types/global';
import { Select as AntdSelect, Radio } from 'antd';
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';
import Link from 'next/link';

const CartModel = () => {
  const { Option } = AntdSelect;

  const { modelState, setModelToggle } = useModelStore();

  const [user, setUser] = useState({});
  const [cartList, setCartList] = useState<ICartItem[]>([]);

  const router = useRouter();
  const dispatch = useDispatch();

  // @ts-ignore:next-line
  const { cartItems } = useSelector(
    (state: { cart: { cartItems: ICartItem[] } }) => state.cart
  );
  // @ts-ignore:next-line
  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  useEffect(() => {
    setCartList(cartItems);
  }, [cartItems]);

  const addtoCartHandler = async (product: ICartItem, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };
  const removeFromCartHandler = async (id: string) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    setModelToggle();
    if (user) {
      router.push('/cart');
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
                  <div key={item._id} className={s.cartItem}>
                    <div className={s.cartItem_img}>
                      <img src={item.image} alt="image" />
                    </div>
                    <div className={s.cartItem_content}>
                      <div className={s.wrapContent}>
                        <Link
                          href={`/product/${item._id}`}
                          className={s.cartItem_title}
                        >
                          {item.name}
                        </Link>
                        <div className={s.wrapSelect}>
                          <div className={s.cartItem_qty}>
                            <AntdSelect
                              value={item.qty.toString()}
                              onChange={value =>
                                addtoCartHandler(item, Number(value))
                              }
                            >
                              {Array.from(
                                { length: item.countInStock },
                                (_, index) => (
                                  <Option
                                    key={index}
                                    value={(index + 1).toString()}
                                  >
                                    {index + 1}
                                  </Option>
                                )
                              )}
                            </AntdSelect>
                          </div>

                          <div className={s.cartItem_size}>
                            <Radio.Group
                              value={item.size}
                              onChange={e => {
                                addtoCartHandler(
                                  { ...item, size: e.target.value },
                                  item.qty
                                );
                              }}
                            >
                              <Radio.Button value="S">S</Radio.Button>
                              <Radio.Button value="M">M</Radio.Button>
                              <Radio.Button value="L">L</Radio.Button>
                            </Radio.Group>
                          </div>
                        </div>

                        <div className={s.cartItem_color}>
                          <Radio.Group
                            value={item.color}
                            onChange={e => {
                              addtoCartHandler(
                                { ...item, color: e.target.value },
                                item.qty
                              );
                            }}
                          >
                            <Radio.Button value="be">Be</Radio.Button>
                            <Radio.Button value="brown">Brown</Radio.Button>
                            <Radio.Button value="black">Black</Radio.Button>
                            <Radio.Button value="white">White</Radio.Button>
                          </Radio.Group>
                        </div>

                        <p className={s.cartItem_price}>1 x ${item.price}</p>
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
