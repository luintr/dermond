'use client';

import React, { useEffect, useState } from 'react';
import s from './styles.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ROUTE_PATH } from '@/constants/route';
import { Select as AntdSelect } from 'antd';
import { ICartItem } from '@/types/global';
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';

const CartModule = () => {
  const { Option } = AntdSelect;

  const [cartList, setCartList] = useState<ICartItem[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();

  // @ts-ignore:next-line
  const { cartItems } = useSelector(
    (state: { cart: { cartItems: ICartItem[] } }) => state.cart
  );

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
    router.push('/login?redirect=/payment');
  };

  return (
    <div className={`${s.cartModule} container grid-cols-12`}>
      {cartList.length === 0 ? (
        <div className={s.emptyCart}>
          <p>Your cart is empty</p>
          <Link href={ROUTE_PATH.HOME}>Back top shop</Link>
        </div>
      ) : (
        <div className={`${s.cart} container grid grid-cols-12`}>
          <div className={`${s.cartList} col-span-8`}>
            {cartList.map(item => (
              <div key={item._id} className={s.cartItem}>
                <div className={s.cartItem_img}>
                  <img src={item.image} alt="image" />
                </div>
                <div>
                  <Link
                    href={`/product/${item._id}`}
                    className={s.cartItem_title}
                  >
                    {item.name}
                  </Link>
                  <p className={s.cartItem_price}>{item.price}</p>
                </div>
                <div className={s.cartItem_qty}>
                  <AntdSelect
                    value={item.qty.toString()}
                    onChange={value => addtoCartHandler(item, Number(value))}
                  >
                    {Array.from({ length: item.countInStock }, (_, index) => (
                      <Option key={index} value={(index + 1).toString()}>
                        {index + 1}
                      </Option>
                    ))}
                  </AntdSelect>
                </div>
                <div
                  className={s.cartItem_delete}
                  onClick={() => removeFromCartHandler(item._id)}
                >
                  Delete
                </div>
              </div>
            ))}
          </div>
          <div className={`${s.cartInfo} col-span-4 col-start-9`}>
            <div>
              Subtotal
              <p>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</p>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModule;
