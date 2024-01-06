'use client';

import OrderModule from '@/modules/Order';
import React from 'react';

const OrderPage = ({ params }: any) => {
  const [orderId] = params.id;

  return <OrderModule orderID={orderId} />;
};

export default OrderPage;
