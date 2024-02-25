import React, { useEffect, useRef, useState } from 'react';
import s from './style.module.scss';
import { ICartItem } from '@/types/global';
import {
  modifyQtyCartItem,
  modifyAtributesCartItem,
  removeFromCart,
} from '@/store/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import LinkEffect from '@/components/LinkEffect';
import RadioSize from '@/components/CustomAntd/RadioSize';
import RadioColor from '@/components/CustomAntd/RadioColor';
import { cinzelFont } from '@/utils/fonts';
import Image from 'next/image';
import IncrementAndDecrementButton from '@/components/IncrementAndDecrementButton';
import { Flex, Space } from 'antd';
import { TypographyBody } from '@/components/Typography';
import SvgInsert from '@/components/SvgInsert';
import useClickOutside from '@/hooks/useClickOutside';
import { capitalize } from '@/utils/capitalize';

interface CartModelItemProps {
  item: ICartItem;
}

const CartModelItem: React.FC<CartModelItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const [optionState, setOptionState] = useState<boolean>(false);
  const [colorState, setColorState] = useState<boolean>(false);
  const sizeRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);
  const { cartItems } = useSelector(
    (state: { cart: { cartItems: ICartItem[] } }) => state.cart
  );

  // console.log(
  //   cartItems
  //     .filter(cartItem => cartItem._id === item._id)
  //     .map(ct => ({ size: ct.size, color: ct.color }))
  // );

  const toggleOptionBox = () => {
    setOptionState(!optionState);
  };

  const hideOptions = () => {
    setOptionState(false);
  };

  const toggleColorBox = () => {
    setColorState(!colorState);
  };

  const hideColors = () => {
    setColorState(false);
  };

  useClickOutside(sizeRef, hideOptions);
  useClickOutside(colorRef, hideColors);

  useEffect(() => {
    if (item.qty === 0) {
      removeFromCartHandler(item);
    }
  }, [item.qty]);

  const modifyCartHandler = async (
    product: ICartItem,
    qty: number,
    type: 'size' | 'color' | 'qty' = 'qty'
  ) => {
    switch (type) {
      case 'size':
        dispatch(modifyAtributesCartItem({ ...product }));
        break;

      case 'color':
        dispatch(modifyAtributesCartItem({ ...product }));
        break;

      case 'qty':
        dispatch(modifyQtyCartItem({ ...product, qty }));
        break;

      default:
        dispatch(modifyQtyCartItem({ ...product, qty }));
        break;
    }
  };

  // const modifySizeHandler = async(product: ICartItem,)

  const removeFromCartHandler = async (item: ICartItem) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div key={item._id} className={s.cartItem}>
      <div className={s.cartItem_img}>
        <LinkEffect href={`/product/${item._id}`}>
          <Image src={item.image} alt="image" fill />
        </LinkEffect>
      </div>

      <div className={s.cartItem_contentWrapper}>
        <LinkEffect href={`/product/${item._id}`}>
          <Space className={`${s.cartItem_title} ${cinzelFont.className}`}>
            {item.name}
          </Space>
        </LinkEffect>
        <Flex className={s.cartItem_wrapper}>
          <Space direction="vertical" className={`${s.cartItem_stats} w-full`}>
            <Flex w-full={'true'} justify="space-between" align="baseline">
              <TypographyBody>${item.price}</TypographyBody>
              <IncrementAndDecrementButton
                size="small"
                amount={item.qty}
                setAmount={value => modifyCartHandler(item, value)}
              />
              {/* <TypographyBody>{`× 1`}</TypographyBody> */}
            </Flex>

            <div ref={sizeRef} className="mb-2 relative">
              <Flex w-full={'true'} justify="space-between">
                <TypographyBody>Size</TypographyBody>
                <Flex
                  onClick={toggleOptionBox}
                  align="center"
                  className="cursor-pointer"
                  gap={8}
                >
                  <TypographyBody>
                    <b>{item.size}</b>
                  </TypographyBody>
                  <SvgInsert
                    src="/icons/chevron.svg"
                    className={s.dropdownIcon}
                  />
                </Flex>
              </Flex>

              <div className={`${s.sizeOptions} ${optionState ? s.open : ''}`}>
                <RadioSize
                  sizeModel={item.size}
                  addtoCartHandler={e => {
                    modifyCartHandler(
                      { ...item, size: e.target.value },
                      item.qty,
                      'size'
                    );
                  }}
                  className={s.cartItem_size}
                />
              </div>
            </div>

            <div ref={colorRef} className="relative">
              <Flex w-full={'true'} justify="space-between">
                <TypographyBody>Color</TypographyBody>

                <Flex
                  onClick={toggleColorBox}
                  align="center"
                  className="cursor-pointer"
                  gap={8}
                >
                  <TypographyBody>
                    <b>{capitalize(item.color)}</b>
                  </TypographyBody>
                  <SvgInsert
                    src="/icons/chevron.svg"
                    className={s.dropdownIcon}
                  />
                </Flex>

                <div
                  className={`${s.colorOptions} ${colorState ? s.open : ''}`}
                >
                  <RadioColor
                    colorModel={item.color}
                    addtoCartHandler={e => {
                      modifyCartHandler(
                        { ...item, color: e.target.value },
                        item.qty,
                        'color'
                      );
                    }}
                    className={s.cartItem_color}
                  />
                </div>
              </Flex>
            </div>

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
          <div className={'w-full relative flex-1'}>
            <div
              className={s.cartItem_delete}
              onClick={() => removeFromCartHandler(item)}
            >
              <SvgInsert src="/icons/trash.svg" className={s.trashBtn} />
            </div>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default CartModelItem;
