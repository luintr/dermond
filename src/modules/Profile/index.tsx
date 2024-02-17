'use client';
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import s from './styles.module.scss';
import { message } from 'antd';
import { getMyOrders } from '@/api/orderAPI';
import ProfileEdit from './ProfileEdit';
import ProfileTable from './ProfileTable';
import { IOrderItem } from '@/types/global';
const ProfileModule = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [orders, setOrders] = useState<IOrderItem[]>([]);

  useEffect(() => {
    getMyOrders().then((res: any) => {
      setOrders(res);
    });
  }, []);

  return (
    <div className={`${s.profile} container grid grid-cols-12`}>
      {contextHolder}

      <ProfileEdit messageApi={messageApi} />
      <ProfileTable orders={orders} />
    </div>
  );
};

export default ProfileModule;
