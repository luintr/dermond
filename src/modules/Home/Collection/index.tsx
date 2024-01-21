import React from 'react';
import s from './style.module.scss';
import Container from '@Components/Container';
import { cinzelFont, playfairFont } from '@/utils/fonts';
import Image from 'next/image';
import { HOME_COLLECTION_DATA } from '@/constants/homeData/data';
import MarqueeText from '@/modules/Home/Collection/MarqueeText';

const CollectionSecion = () => {
  return (
    <section className={s.collectionSection}>
      <Container className={s.container}>
        <div className={`${s.introduce} grid grid-cols-12`}>
          <h2
            className={`${s.introduce_title} ${cinzelFont.className} col-span-6 col-start-2`}
          >
            MINIMALIST STRONG FOR <span>COLLECTION</span>
          </h2>
          <div
            className={`${s.introduce_desc} col-span-4 col-start-8 grid grid-cols-4`}
          >
            <div className={`${s.line} col-span-4`}></div>
            <p className={`col-span-3 col-start-2`}>
              Emphasize <span className={playfairFont.className}>DER MOND</span>
              &apos;s specialization in creating unique, one-of-a-kind prom
              dresses tailored to each client&apos;s individual style and
              preferences.
            </p>
          </div>
        </div>

        <div className={s.collection}>
          {HOME_COLLECTION_DATA.map((item, index) => (
            <div key={index} className={s.wrapImage}>
              <Image
                className={`${s.collection_img}`}
                src={item.image}
                width={item.width}
                height={item.height}
                alt="image"
              />
            </div>
          ))}
        </div>
      </Container>
      <MarqueeText />
    </section>
  );
};

export default CollectionSecion;
