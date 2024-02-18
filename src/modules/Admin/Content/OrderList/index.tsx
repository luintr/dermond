import React, { useEffect, useState } from 'react';
import s from './style.module.scss';
import { getOrders } from '@/api/orderAPI';
import Link from 'next/link';
import { Table, Tag } from 'antd';
import { IOrderItem } from '@/types/global';

type IUser = {
  _id: string;
  name: string;
};

const AdminOrderList = () => {
  const [orders, setOrders] = useState<IOrderItem[]>([]);

  useEffect(() => {
    getOrders().then((res: any) => {
      setOrders(res);
    });
  }, []);

  console.log(orders);

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (text: string) => {
        const shortenedString = text.substring(0, 15);
        return (
          <Link href={`/order/${text}`} className={s.link}>
            {shortenedString}...
          </Link>
        );
      },
      width: '30%',
    },
    // {
    //   title: 'Name',
    //   dataIndex: 'user',
    //   key: 'user',
    //   render: (text: IUser) => {
    //     const { name } = text;
    //     return text;
    //   },
    //   width: '20%',
    // },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => {
        const dateObject = new Date(text);
        return `${dateObject.getFullYear()}-${
          dateObject.getMonth() + 1
        }-${dateObject.getDate()}`;
      },
      width: '30%',
    },
    {
      title: 'Total',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text: string) => `$${text}`,
      width: '30%',
    },
    {
      title: 'Paid',
      dataIndex: 'isPaid',
      key: 'isPaid',
      render: (isPaid: boolean) => {
        if (isPaid) {
          return <Tag color={'green'}>Paid</Tag>;
        } else {
          return <Tag color={'volcano'}>Unpaid</Tag>;
        }
      },
      width: '30%',
    },
    {
      title: 'Delivered',
      dataIndex: 'isDelivered',
      key: 'isDelivered',
      render: (isDelivered: boolean) => {
        if (isDelivered) {
          return <Tag color={'green'}>Delivered</Tag>;
        } else {
          return <Tag color={'volcano'}>Not Delivered</Tag>;
        }
      },
      width: '30%',
    },
  ];

  return (
    <div className={s.admin_orderList}>
      <Table
        columns={columns}
        dataSource={[...orders].reverse()}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default AdminOrderList;
