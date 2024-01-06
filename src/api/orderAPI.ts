import { ORDERS_URL, PAYPAL_URL } from "@/constants/route"
import { get, post, put } from "./requestMethod"

export const createOrder = async (data: any) => {
  const res = await post(ORDERS_URL, data)
  return res
}

export const getOrderDetail = async (orderID: string) => {
  const res = await get(`${ORDERS_URL}/${orderID}`)
  return res
}

export const payOrder = async (orderID: string, details?: any) => {
  const res = await put(`${ORDERS_URL}/${orderID}/pay`, details)
  return res
}

export const getMyOrders = async () => {
  const res = await get(`${ORDERS_URL}/mine`)
  return res
}

export const getPaypalId = async () => {
  const res = await get(`${PAYPAL_URL}`)
  return res
}

export const getOrders = async () => {
  const res = await get(`${ORDERS_URL}`)
  return res
}

export const deliverOrder = async (orderID: string, details?: any) => {
  const res = await put(`${ORDERS_URL}/${orderID}/deliver`, details)
  return res
}