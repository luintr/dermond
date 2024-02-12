export type ICartItem = {
  _id: string;
  user: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  size: 'S' | 'M' | 'L';
  color: 'be' | 'brown' | 'black' | 'white';
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  createdAt: string;
  updatedAt: string;
  qty: number;
};
export type IProduct = {
  _id: string;
  name: string;
  image: string;
  description: string;
  size: 'S' | 'M' | 'L';
  color: 'be' | 'brown' | 'black' | 'white';
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}[];

export type IOrderItem = {
  image: string;
  name: string;
  price: number;
  product: string;
  qty: number;
  _id: string;
};

export type IShippingAddress = {
  address: string;
  city: string;
  country: string;
  postalCode: string;
};

export type IUser = {
  _id: string;
  email: string;
  name: string;
};

export type OrderData = {
  _id: string;
  createdAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  itemsPrice: number;
  orderItems: IOrderItem[];
  paymentMethod: string;
  shippingAddress: IShippingAddress;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  updatedAt: string;
  user: IUser;
  deliveredAt: string;
  paidAt: string;
};
