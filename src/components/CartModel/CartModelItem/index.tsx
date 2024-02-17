import React, { useEffect } from 'react';
import s from './style.module.scss';
import { ICartItem } from '@/types/global';
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import LinkEffect from '@/components/LinkEffect';
import QtyInput from '@/components/CustomAntd/QtyInput';
import RadioSize from '@/components/CustomAntd/RadioSize';
import RadioColor from '@/components/CustomAntd/RadioColor';
import { cinzelFont } from '@/utils/fonts';

interface CartModelItemProps {
  item: ICartItem;
}

const CartModelItem: React.FC<CartModelItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (item.qty === 0) {
      removeFromCartHandler(item._id);
    }
  }, [item.qty]);

  const addtoCartHandler = async (product: ICartItem, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div key={item._id} className={s.cartItem}>
      <div className={s.cartItem_img}>
        <img src={item.image} alt="image" />
      </div>
      <div className={s.cartItem_content}>
        <div className={s.wrapContent}>
          <LinkEffect
            href={`/product/${item._id}`}
            className={`${s.cartItem_title} ${cinzelFont.className}`}
          >
            {item.name}
          </LinkEffect>
          <div className={s.wrapSelect}>
            <QtyInput
              qty={item.qty}
              setQty={value => addtoCartHandler(item, value)}
              className={s.cartItem_qty}
              small
            />

            <RadioSize
              sizeModel={item.size}
              addtoCartHandler={e => {
                addtoCartHandler({ ...item, size: e.target.value }, item.qty);
              }}
              className={s.cartItem_size}
              small
            />
          </div>

          <RadioColor
            colorModel={item.color}
            addtoCartHandler={e => {
              addtoCartHandler({ ...item, color: e.target.value }, item.qty);
            }}
            className={s.cartItem_color}
            small
          />
        </div>
        <div
          className={s.cartItem_delete}
          onClick={() => removeFromCartHandler(item._id)}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default CartModelItem;
