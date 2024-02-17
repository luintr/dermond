import React, { useEffect, useState } from 'react';
import s from './style.module.scss';
import { deliverOrder, getOrderDetail, payOrder } from '@/api/orderAPI';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { OrderData } from '@/types/global';
import { cinzelFont } from '@/utils/fonts';
import { colorPicker, daysOfWeek, monthsOfYear } from '@/constants/utils';

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
        <div className={s.loader}></div>
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
  const paidDay = new Date(orderData.paidAt);
  const deliveryDay = new Date(orderData.deliveredAt);

  return (
    <div className={`${s.orderDetail} container grid grid-cols-12`}>
      {contextHolder}
      <div className={`col-span-10 col-start-2`}>
        <h2 className={`${s.orderDetail_title} ${cinzelFont.className}`}>
          Order Details
        </h2>
      </div>

      <div className={` ${s.orderDetail_wrap} col-span-9 col-start-2`}>
        <p className={s.orderDetail_wrap_id}>
          Order ID: {`#${orderData._id.substring(0, 10)}`}
        </p>
        <p className={s.orderDetail_wrap_date}>
          {`${daysOfWeek[originalDate.getUTCDay()]}, ${monthsOfYear[originalDate.getUTCMonth()]} ${originalDate.getUTCDate()}, ${originalDate.getUTCFullYear()}`}
        </p>
        <div className={s.orderDetail_box}>
          <div className={`${s.delivery} ${s.orderDetail_box_item}`}>
            <h4>Deliver To</h4>
            <h5>{orderData.user.name}</h5>
            <p>
              Email: <span>{orderData.user.email}</span>
            </p>
            <p>
              Phone: <span>{orderData.number}</span>
            </p>
          </div>
          <div className={`${s.payment} ${s.orderDetail_box_item}`}>
            <h4>Payment Method</h4>
            <h5>{orderData.paymentMethod}</h5>
            {orderData.isPaid ? (
              <p>
                Paid on:{' '}
                <span>
                  {`${daysOfWeek[paidDay.getUTCDay()]}, ${monthsOfYear[paidDay.getUTCMonth()]} ${paidDay.getUTCDate()}, ${paidDay.getUTCFullYear()} -- ${paidDay.getHours()}: ${paidDay.getMinutes()}`}
                </span>
              </p>
            ) : (
              <p>Not Paid</p>
            )}
          </div>
          <div className={`${s.delivery} ${s.orderDetail_box_item}`}>
            <h4>Delivery</h4>
            <h5>Address</h5>
            <p>
              <span>
                {orderData.shippingAddress.address},{' '}
                {orderData.shippingAddress.city},{' '}
                {orderData.shippingAddress.country}
              </span>
            </p>
            {orderData.isDelivered ? (
              <p>
                Delivered on:{' '}
                <span>{`${daysOfWeek[deliveryDay.getUTCDay()]}, ${monthsOfYear[deliveryDay.getUTCMonth()]} ${deliveryDay.getUTCDate()}, ${deliveryDay.getUTCFullYear()} -- ${deliveryDay.getHours()}: ${deliveryDay.getMinutes()}`}</span>
              </p>
            ) : (
              <p>Not Delivered</p>
            )}
          </div>
        </div>
        <div className={s.orderDetail_box2}>
          <div className={s.orderDetail_items}>
            <h4>Order Items</h4>
            <div className={s.orderList}>
              {orderData.orderItems.map(item => (
                <div key={item._id} className={s.orderItem}>
                  <div className={s.left}>
                    <img src={item.image} alt="image" />
                    <div className={s.orderItem_content}>
                      <p className={s.title}>{item.name}</p>
                      <div className={`${s.flex}`}>
                        <div className={s.flex_item}>
                          <p>Qty</p> <p>{item.qty}</p>
                        </div>
                        <div className={s.flex_item}>
                          <p>Color</p>
                          <p
                            style={{
                              backgroundColor: colorPicker.find(
                                color => color.name === item.color
                              )?.color,
                            }}
                            className={s.color}
                          ></p>
                        </div>
                        <div className={s.flex_item}>
                          <p>Size</p> <p>{item.size}</p>
                        </div>
                      </div>
                      <div className={s.price}>
                        <p>Price:</p> <span>${item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={s.summary}>
            <h4>Summary</h4>

            <div className={s.summary_wrap}>
              <p>
                <span>Items Price</span> ${orderData.itemsPrice}
              </p>
              <p>
                <span>Shipping</span>{' '}
                {orderData.shippingPrice == 0
                  ? 'Free Ship'
                  : `$${orderData.shippingPrice}`}
              </p>
              <p>
                <span>Tax</span> ${orderData.taxPrice}
              </p>
              <p>
                <span>Total Price</span> ${orderData.totalPrice}
              </p>

              <button
                onClick={payHandler}
                disabled={userInfo && userInfo.isAdmin && !orderData.isPaid}
                className={
                  userInfo && userInfo.isAdmin && !orderData.isPaid
                    ? s.disable
                    : ''
                }
              >
                Mark as Paid
              </button>

              <button
                onClick={deliverHandler}
                disabled={
                  userInfo && userInfo.isAdmin && !orderData.isDelivered
                }
                className={
                  userInfo && userInfo.isAdmin && !orderData.isDelivered
                    ? s.disable
                    : ''
                }
              >
                Mark as Delivered
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModule;
