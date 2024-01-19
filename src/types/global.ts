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
