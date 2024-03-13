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
    image: image1.src,
    width: image1.width,
    height: image1.height,
    offset: 0.2,
  },
  {
    image: image2.src,
    width: image2.width,
    height: image2.height,
    offset: 0.23,
  },
  {
    image: image3.src,
    width: image3.width,
    height: image3.height,
    offset: 0.15,
  },
];

export const HOME_BESTSELLER_DATA = [
  {
    id: 1,
    image: example,
    name: 'SUEDE LEATHER BLAZER',
    desc: `Customization Beyond Boundaries: Design is personal, and so is our approach. We don't just design dresses; we craft experiences. From fabric selection to silhouette, we tailor every detail to match the individuality of our clients, ensuring a truly bespoke creation.`,
  },
  {
    id: 2,
    image: image2,
    name: 'SUEDE LEATHER BLAZER',
    desc: `Customization Beyond Boundaries: Design is personal, and so is our approach. We don't just design dresses; we craft experiences. From fabric selection to silhouette, we tailor every detail to match the individuality of our clients, ensuring a truly bespoke creation.`,
  },
  {
    id: 3,
    image: image1,
    name: 'SUEDE LEATHER BLAZER',
    desc: `Customization Beyond Boundaries: Design is personal, and so is our approach. We don't just design dresses; we craft experiences. From fabric selection to silhouette, we tailor every detail to match the individuality of our clients, ensuring a truly bespoke creation.`,
  },
];
