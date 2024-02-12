import React, { useEffect, useState } from 'react';
import s from './style.module.scss';
import { deliverOrder, getOrderDetail, payOrder } from '@/api/orderAPI';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { OrderData } from '@/types/global';
import { cinzelFont } from '@/utils/fonts';
import { daysOfWeek, monthsOfYear } from '@/constants/utils';

const OrderModule = ({ orderID }: { orderID: string }) => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [paid, setPaid] = useState<boolean>(false);
  const [deli, setDeli] = useState<boolean>(false);

  // @ts-ignore:next-line
  const { userInfo } = useSelector(state => state.auth);
  useEffect(() => {
    getOrderDetail(orderID).then((res: any) => {
      setOrderData(res);
    });
  }, [paid, deli]);

  if (!orderData) {
    return (
      <div className={s.loading}>
        <h2>Loading...</h2>
      </div>
    );
  }

  const payHandler = async () => {
    try {
      await payOrder(orderID);
      setPaid(true);
      messageApi.open({
        type: 'success',
        content: 'Order Paid',
        duration: 4,
      });
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: 'Something went wrong',
        duration: 4,
      });
    }
  };

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderID);
      setDeli(true);
      messageApi.open({
        type: 'success',
        content: 'Order Delivered',
        duration: 4,
      });
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: 'Something went wrong',
        duration: 4,
      });
    }
  };

  const originalDate = new Date(orderData.createdAt);

  return (
    <div className={`${s.orderDetail} container grid grid-cols-12`}>
      {contextHolder}
      <div className={`col-span-6 col-start-1`}>
        <h2 className={`${s.orderDetail_title} ${cinzelFont.className}`}>
          Order Details
        </h2>
      </div>

      <div className={` ${s.orderDetail_box} col-span-12 col-start-1`}>
        <p className={s.orderDetail_box_id}>
          Order ID: {`#${orderData._id.substring(0, 10)}`}
        </p>
        <p className={s.orderDetail_box_date}>
          {`${daysOfWeek[originalDate.getUTCDay()]}, ${monthsOfYear[originalDate.getUTCMonth()]} ${originalDate.getUTCDate()}, ${originalDate.getUTCFullYear()}`}
        </p>
        <div className={s.orderDetail_box_wrap}></div>
        <div>
          <p>Shipping</p>
          <p>Name: {orderData.user.name}</p>
          <p>Email: {orderData.user.email}</p>
          <p>
            Address: {orderData.shippingAddress.address},{' '}
            {orderData.shippingAddress.city},{' '}
            {orderData.shippingAddress.postalCode},{' '}
            {orderData.shippingAddress.country}
          </p>
          <div>
            {orderData.isDelivered ? (
              <p>Delivered on:{orderData.deliveredAt}</p>
            ) : (
              <p>Not Delivered</p>
            )}
          </div>
          <div>
            <p>
              <strong>Method:</strong> {orderData.paymentMethod}
            </p>
            {orderData.isPaid ? (
              <p>Paid on: {orderData.paidAt}</p>
            ) : (
              <p>Not Paid</p>
            )}
          </div>
        </div>
        <div>
          <p>
            <strong>Order Items</strong>
          </p>
          <div>
            {orderData.orderItems.map(item => (
              <div key={item._id} className={s.orderItem}>
                <img src={item.image} alt="image" />
                <p>{item.name}</p>
                <p>Qty: {item.qty}</p>
                <p>Price: ${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`col-span-12`}>
        <p>Order Summary</p>
        <p>
          <strong>Items Price:</strong> ${orderData.itemsPrice}
        </p>
        <p>
          <strong>Shipping:</strong>{' '}
          {orderData.shippingPrice == 0
            ? 'Free Ship'
            : `$${orderData.shippingPrice}`}
        </p>
        <p>
          <strong>Tax:</strong> ${orderData.taxPrice}
        </p>
        <p>
          <strong>Total Price:</strong> ${orderData.totalPrice}
        </p>
        {userInfo && userInfo.isAdmin && !orderData.isPaid && (
          <div>
            <button onClick={payHandler}>Mark as Paid</button>
          </div>
        )}
        {userInfo && userInfo.isAdmin && !orderData.isDelivered && (
          <div>
            <button onClick={deliverHandler}>Mark as Delivered</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderModule;
