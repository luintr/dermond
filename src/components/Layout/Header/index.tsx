'use client';

import Container from '@/components/Container';
import React, { useEffect, useState } from 'react';
import s from '../style.module.scss';
import Link from 'next/link';
import { ROUTE_PATH } from '@/constants/route';
import { useSelector } from 'react-redux';
import ProfileHeader from './Profile';
import { playfairFont } from '@/utils/fonts';
import { CartIcon, Logo } from '@/components/Icons';
import { useModelStore } from '@/store/zustandStore';

const Header = (): React.ReactElement => {
  const [qtyItems, setQtyItems] = useState<[]>([]);
  const [user, setUser] = useState({});
  const { setModelToggle } = useModelStore();
  // @ts-ignore:next-line
  const { cartItems } = useSelector(state => state.cart);
  // @ts-ignore:next-line
  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  useEffect(() => {
    setQtyItems(cartItems);
  }, [cartItems]);

  return (
    <header className={s.header}>
      <Container className={s.header_container}>
        <div className={s.header_container_left}>
          <div className={s.logoAnim}>
            <Logo />
          </div>
          <Link
            href={ROUTE_PATH.HOME}
            className={`${s.headline} ${playfairFont.className}`}
          >
            DER MOND
          </Link>
        </div>

        <div className={s.navigate}>
          <Link href={ROUTE_PATH.STORY} className={s.navigate_item}>
            OUR STORY
          </Link>
          {/* <Link href={ROUTE_PATH.GALLERY} className={s.navigate_item}>
            GALLERY
          </Link> */}
          <Link href={ROUTE_PATH.SHOP} className={s.navigate_item}>
            Shop
          </Link>
          {user ? (
            <ProfileHeader data={user} />
          ) : (
            <Link href={ROUTE_PATH.LOGIN} className={s.navigate_item}>
              Sign In
            </Link>
          )}
          <div className={s.navigate_item} onClick={() => setModelToggle()}>
            <CartIcon />
            {qtyItems.length > 0 && (
              <span className={s.navigate_item_cartQtr}>{qtyItems.length}</span>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
