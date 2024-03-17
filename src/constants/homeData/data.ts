import { ROUTE_PATH } from '../route';
import image1 from '@Images/homeCol1.jpeg';
import image2 from '@Images/homeCol2.jpeg';
import image3 from '@Images/homeCol3.jpeg';
import example from '@Images/bestSellerImg.jpeg';

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
    image: '/images/src/homeCol1.jpeg',
    width: 940,
    height: 1800,
    offset: 0.2,
  },
  {
    image: '/images/src/homeCol2.jpeg',
    width: 1568,
    height: 1800,
    offset: 0.23,
  },
  {
    image: '/images/src/homeCol3.jpeg',
    width: 1174,
    height: 1800,
    offset: 0.15,
  },
];

export const HOME_BESTSELLER_DATA = [
  {
    id: 1,
    image: '/images/src/bestSellerImg.jpeg',
    name: 'SUEDE LEATHER BLAZER',
    desc: ' Customization Beyond Boundaries: Design is personal, and so is our approach.We don& apos;t just design dresses; we craft experiences. From fabric selection to silhouette, we tailor every detail to match the individuality of our clients, ensuring a truly bespoke creation.',
  },
  {
    id: 2,
    image: '/images/src/homeCol2.jpeg',
    name: 'SUEDE LEATHER BLAZER',
    desc: ' Customization Beyond Boundaries: Design is personal, and so is our approach.We don& apos;t just design dresses; we craft experiences. From fabric selection to silhouette, we tailor every detail to match the individuality of our clients, ensuring a truly bespoke creation.',
  },
  {
    id: 3,
    image: '/images/src/homeCol3.jpeg',
    name: 'SUEDE LEATHER BLAZER',
    desc: ' Customization Beyond Boundaries: Design is personal, and so is our approach.We don& apos;t just design dresses; we craft experiences. From fabric selection to silhouette, we tailor every detail to match the individuality of our clients, ensuring a truly bespoke creation.',
  },
];
