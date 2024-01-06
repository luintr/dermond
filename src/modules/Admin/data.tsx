import AdminOrderList from './Content/OrderList';
import AdminProductList from './Content/ProductList';
import AdminUserList from './Content/UserList';

export const tabData = [
  {
    id: 0,
    name: 'Orders List',
    key: 'orderlist',
    content: <AdminOrderList />,
  },
  {
    id: 1,
    name: 'Users List',
    key: 'userList',
    content: <AdminUserList />,
  },
  {
    id: 2,
    name: 'Product List',
    key: 'productList',
    content: <AdminProductList />,
  },
];
