'use client';
import React, { ReactNode } from 'react';
import Header from './Header';
import { Provider } from 'react-redux';
import store from '@/store/store';
import s from './style.module.scss';
import Footer from './Footer';
import { GridDebug } from './GridDebug';
import CartModel from '../CartModel';
import LenisScroller from '../Lenis';
import { UiProvider } from '@/context/uiContext';
import PageEffect from './PageEffect';

type ILayout = {
  children: ReactNode;
  className: string;
};

const Layout = ({ children, className }: ILayout) => {
  return (
    <Provider store={store}>
      <body className={`${className} ${s.mainLayout}`}>
        <UiProvider>
          <LenisScroller>
            <Header />
            {children}
            <Footer />
            <CartModel />
          </LenisScroller>
          <PageEffect />
        </UiProvider>
        {process.env.NODE_ENV === 'development' && <GridDebug />}
      </body>
    </Provider>
  );
};

export default Layout;
