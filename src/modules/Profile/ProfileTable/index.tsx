import React from 'react';
import { Table, Tag } from 'antd';
import LinkEffect from '@/components/LinkEffect';
import s from '../styles.module.scss';
import { cinzelFont } from '@/utils/fonts';
import { IOrderItem } from '@/types/global';

type IProfileTable = {
  orders: IOrderItem[];
};

const ProfileTable: React.FC<IProfileTable> = ({ orders }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (text: string) => {
        const shortenedString = text.substring(0, 15);
        return (
          <LinkEffect href={`/order/${text}`}>{shortenedString}...</LinkEffect>
        );
      },
      width: '40%',
    },
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
    <div className={` ${s.tableProfile} col-span-7`}>
      <h2 className={`${s.tableProfile_title} ${cinzelFont.className}`}>
        Your Orders
      </h2>
      <Table
        columns={columns}
        dataSource={[...orders].reverse()}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ProfileTable;
