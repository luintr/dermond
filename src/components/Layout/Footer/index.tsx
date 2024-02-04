import React from 'react';
import s from '../style.module.scss';
import Container from '@/components/Container';
import { cinzelFont, contentFont } from '@/utils/fonts';
import { FOOTER_NAVIGATE } from '@/constants/homeData/data';
import { Input } from 'antd';
import { ArrowIcon } from '@/components/Icons';
import LinkEffect from '@/components/LinkEffect';

const Footer = () => {
  return (
    <div className={s.footer}>
      <Container className={`${s.footer_container} grid grid-cols-12`}>
        <div
          className={`${s.footer_navigate} col-span-8 col-start-1 grid grid-cols-8`}
        >
          {FOOTER_NAVIGATE.map((item, index) => (
            <div
              key={index}
              className={`${s.navItem} col-span-2 col-start-${(index + 1) * 2}`}
            >
              <p className={`${s.navItem_headline} ${cinzelFont.className}`}>
                {item.title}
              </p>
              <ul className={s.navItem_list}>
                {item.links.map((link, index) => (
                  <li key={index}>
                    <LinkEffect href={link.link}>{link.title}</LinkEffect>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <form className={`${s.footer_form} col-span-4 col-start-9`}>
          <p className={cinzelFont.className}>KEEP UP TO DATE NEWSLETTER</p>
          <div className={s.wrapInput}>
            <Input
              className={contentFont.className}
              placeholder="Email"
              type="text"
            />
            <div className={s.button}>
              <ArrowIcon />
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Footer;
