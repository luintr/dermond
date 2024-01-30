import React from 'react';
import s from './style.module.scss';
import { ICartItem } from '@/types/global';
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import LinkEffect from '@/components/LinkEffect';
import { Radio } from 'antd';

interface CartItemProps {
  item: ICartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  console.log(item);
  const { _id, image, qty, countInStock, size, color, price, name } = item;

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
        <div className={s.cartItem_qty}>
          {/* <AntdSelect
            value={qty.toString()}
            onChange={value => addtoCartHandler(item, Number(value))}
          >
            {Array.from({ length: countInStock }, (_, index) => (
              <Option key={index} value={(index + 1).toString()}>
                {index + 1}
              </Option>
            ))}
          </AntdSelect> */}
        </div>

        <div>
          <Radio.Group
            value={size}
            onChange={e => {
              addtoCartHandler({ ...item, size: e.target.value }, qty);
            }}
          >
            <Radio.Button value="S">S</Radio.Button>
            <Radio.Button value="M">M</Radio.Button>
            <Radio.Button value="L">L</Radio.Button>
          </Radio.Group>
        </div>

        <div>
          <Radio.Group
            value={color}
            onChange={e => {
              addtoCartHandler({ ...item, color: e.target.value }, qty);
            }}
          >
            <Radio.Button value="be">Be</Radio.Button>
            <Radio.Button value="brown">Brown</Radio.Button>
            <Radio.Button value="black">Black</Radio.Button>
            <Radio.Button value="white">White</Radio.Button>
          </Radio.Group>
        </div>

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
