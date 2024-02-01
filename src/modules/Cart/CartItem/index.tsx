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

interface CartItemProps {
  item: ICartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  console.log(item);
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
    <div key={_id} className={s.cartItem}>
      <div className={s.cartItem_img}>
        <img src={image} alt="image" />
      </div>
      <div>
        <div>
          <LinkEffect href={`/product/${_id}`} className={s.cartItem_title}>
            {name}
          </LinkEffect>
        </div>

        <QtyInput qty={qty} setQty={value => addtoCartHandler(item, value)} />

        <RadioSize
          sizeModel={size}
          addtoCartHandler={e => {
            addtoCartHandler({ ...item, size: e.target.value }, qty);
          }}
        />

        <RadioColor
          colorModel={color}
          addtoCartHandler={e => {
            addtoCartHandler({ ...item, color: e.target.value }, qty);
          }}
        />

        <p className={s.cartItem_price}>${price}</p>
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
