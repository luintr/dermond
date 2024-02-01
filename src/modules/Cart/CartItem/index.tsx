import React, { useEffect, useState } from 'react';
import s from './style.module.scss';
import { ICartItem } from '@/types/global';
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import LinkEffect from '@/components/LinkEffect';
import { Radio } from 'antd';
import RadioSize from '@/components/CustomAntd/RadioSize';
import RadioColor from '@/components/CustomAntd/RadioColor';
import QtyInput from '@/components/CustomAntd/QtyInput';
import { cinzelFont } from '@/utils/fonts';

interface CartItemProps {
  item: ICartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { _id, image, qty, countInStock, size, color, price, name } = item;
  const [qtyS, setQtyS] = useState<number | null>(null);

  useEffect(() => {
    setQtyS(qty);
  }, [qty]);

  const dispatch = useDispatch();

  const addtoCartHandler = async (product: ICartItem, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };
  const removeFromCartHandler = async (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div key={_id} className={`${s.cartItem} grid grid-cols-7`}>
      <div className={`${s.cartItem_img} col-span-3`}>
        <img src={image} alt="image" />
      </div>
      <div className={`${s.cartItem_content} col-span-4`}>
        <LinkEffect
          href={`/product/${_id}`}
          className={`${s.cartItem_content_title} ${cinzelFont.className}`}
        >
          {name}
        </LinkEffect>

        <div className={s.wrapContent}>
          <div className={s.wrapContent_left}>
            <QtyInput
              qty={qty}
              setQty={value => addtoCartHandler(item, value)}
              className={s.cartItem_content_qty}
            />

            <RadioSize
              sizeModel={size}
              addtoCartHandler={e => {
                addtoCartHandler({ ...item, size: e.target.value }, qty);
              }}
              className={s.cartItem_content_size}
            />

            <RadioColor
              colorModel={color}
              addtoCartHandler={e => {
                addtoCartHandler({ ...item, color: e.target.value }, qty);
              }}
              className={s.cartItem_content_color}
            />
          </div>

          <div className={s.wrapContent_right}>
            <p className={s.cartItem_content_price}>${price}</p>
            <p className={s.cartItem_content_total}>${price * qty}</p>
          </div>
        </div>

        <div
          className={s.cartItem_delete}
          onClick={() => removeFromCartHandler(_id)}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default CartItem;
