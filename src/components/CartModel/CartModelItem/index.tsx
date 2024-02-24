import React, { useEffect } from 'react';
import s from './style.module.scss';
import { ICartItem } from '@/types/global';
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import LinkEffect from '@/components/LinkEffect';
import RadioSize from '@/components/CustomAntd/RadioSize';
import RadioColor from '@/components/CustomAntd/RadioColor';
import { cinzelFont } from '@/utils/fonts';
import Image from 'next/image';
import IncrementAndDecrementButton from '@/components/IncrementAndDecrementButton';
import { Flex, Space } from 'antd';
import { TypographyBody } from '@/components/Typography';
import SvgInsert from '@/components/SvgInsert';

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
    <LinkEffect href={`/product/${item._id}`}>
      <div key={item._id} className={s.cartItem}>
        <div className={s.cartItem_img}>
          <Image src={item.image} alt="image" fill />
        </div>

        <div className={s.cartItem_contentWrapper}>
          <Space className={`${s.cartItem_title} ${cinzelFont.className}`}>
            {item.name}
          </Space>
          <Flex className={s.cartItem_wrapper}>
            <Space
              direction="vertical"
              className={`${s.cartItem_stats} w-full`}
            >
              <Flex w-full justify="space-between">
                <TypographyBody>${item.price}</TypographyBody>
                <TypographyBody>{`× 1`}</TypographyBody>
              </Flex>

              <Flex w-full justify="space-between">
                <TypographyBody>Size</TypographyBody>
                <TypographyBody>{item.size}</TypographyBody>
              </Flex>

              <Flex w-full justify="space-between">
                <TypographyBody>Color</TypographyBody>
                <TypographyBody>{item.color}</TypographyBody>
              </Flex>

              {/* <IncrementAndDecrementButton
              amount={item.qty}
              setAmount={value => addtoCartHandler(item, value)}
            /> 
            
            <RadioSize
              sizeModel={item.size}
              addtoCartHandler={e => {
                addtoCartHandler({ ...item, size: e.target.value }, item.qty);
              }}
              className={s.cartItem_size}
              small
            />

            <RadioColor
              colorModel={item.color}
              addtoCartHandler={e => {
                addtoCartHandler({ ...item, color: e.target.value }, item.qty);
              }}
              className={s.cartItem_color}
              small
            /> */}
            </Space>
            <div className={'w-full relative'}>
              <div
                className={s.cartItem_delete}
                onClick={() => removeFromCartHandler(item._id)}
              >
                <SvgInsert src="/icons/trash.svg" />
              </div>
            </div>
          </Flex>
        </div>
      </div>
    </LinkEffect>
  );
};

export default CartModelItem;
