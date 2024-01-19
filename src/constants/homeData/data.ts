import { ROUTE_PATH } from '../route';
import image1 from '@Images/homeCol1.jpeg';
import image2 from '@Images/homeCol2.jpeg';
import image3 from '@Images/homeCol3.jpeg';

export const FOOTER_NAVIGATE = [
  {
    title: 'Navigate',
    links: [
      {
        title: 'Our Shop',
        link: ROUTE_PATH.SHOP,
      },
      {
        title: 'Gallery',
        link: ROUTE_PATH.GALLERY,
      },
      {
        title: 'Story',
        link: ROUTE_PATH.STORY,
      },
      {
        title: 'Cart',
        link: ROUTE_PATH.CART,
      },
    ],
  },
  {
    title: 'Assistance',
    links: [
      {
        title: 'Shipping & returns',
        link: ROUTE_PATH.SHOP,
      },
      {
        title: 'Contact',
        link: ROUTE_PATH.GALLERY,
      },
      {
        title: 'Privacy Policy',
        link: ROUTE_PATH.STORY,
      },
      {
        title: 'FAQ',
        link: ROUTE_PATH.CART,
      },
    ],
  },
  {
    title: 'Follow Us',
    links: [
      {
        title: 'Instagram',
        link: '#',
      },
    ],
  },
];

export const HOME_COLLECTION_DATA = [
  {
    image: image1.src,
    width: image1.width,
    height: image1.height,
  },
  {
    image: image2.src,
    width: image2.width,
    height: image2.height,
  },
  {
    image: image3.src,
    width: image3.width,
    height: image3.height,
  },
];
