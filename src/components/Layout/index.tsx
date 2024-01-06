'use client';
import React, { ReactNode } from 'react';
import Header from './Header';
import { Provider } from 'react-redux';
import store from '@/store/store';
import {
  PayPalScriptProvider,
  ScriptProviderProps,
} from '@paypal/react-paypal-js';
type ILayout = {
  children: ReactNode;
  className: string;
};

const Layout = ({ children, className }: ILayout) => {
  const paypalOptions: ScriptProviderProps['options'] = {
    clientId: process.env.PAYPAL_CLIENT_ID || '',
    currency: 'VND',
  };

  return (
    <Provider store={store}>
      <PayPalScriptProvider options={paypalOptions} deferLoading={true}>
        <body className={className}>
          <Header />
          {children}
        </body>
      </PayPalScriptProvider>
    </Provider>
  );
};

export default Layout;
