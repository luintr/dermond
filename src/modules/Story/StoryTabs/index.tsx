'use client';
import React, { useEffect, useRef, useState } from 'react';
import s from './style.module.scss';
import Container from '@/components/Container';
import { cinzelFont } from '@/utils/fonts';
import RoundedText from '@/components/RoundedText';
import { storyTabData } from '@/constants/story/storyTabs';
import gsap from 'gsap';

const StoryTabs = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);
  const enhanceRefs = useRef<Array<HTMLDivElement | null>>([]);
  const initialRefs = useRef<Array<HTMLDivElement | null>>([]);
  const serviceRefs = useRef<Array<HTMLDivElement | null>>([]);
  const roundedTextRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      tabRefs.current.forEach((tabRef, index) => {
        const enhanceRef = enhanceRefs.current[index];
        const initialRef = initialRefs.current[index];
        const serviceRef = serviceRefs.current[index];
        const roundedText = roundedTextRefs.current[index];

        if (index + 1 === activeTab) {
          gsap.to(tabRef, { ease: 'power4.out', duration: 1, width: '60%' });
          gsap.to(initialRef, {
            ease: 'power4.out',
            duration: 0.5,
            opacity: 0,
          });
          gsap.to(enhanceRef, {
            ease: 'power4.out',
            pointerEvents: 'initial',
            duration: 1,
            opacity: 1,
          });
          gsap.to(serviceRef, {
            ease: 'power4.out',
            pointerEvents: 'initial',
            duration: 1,
            opacity: 1,
          });
          gsap.to(roundedText, { ease: 'power4.out', duration: 1, opacity: 1 });
        } else {
          gsap.to(tabRef, { ease: 'power4.out', duration: 1, width: '20%' });
          gsap.to(initialRef, {
            ease: 'power4.out',
            duration: 0.5,
            pointerEvents: 'none',
            opacity: 1,
          });
          gsap.to(enhanceRef, {
            ease: 'power4.out',
            pointerEvents: 'none',
            duration: 0.5,
            opacity: 0,
          });
          gsap.to(serviceRef, {
            ease: 'power4.out',
            duration: 0.5,
            opacity: 0,
          });
          gsap.to(roundedText, {
            ease: 'power4.out',
            duration: 0.5,
            opacity: 0,
          });
        }
      });
    });

    return () => {
      ctx.kill();
    };
  }, [activeTab]);

  return (
    <section className={s.storyTabs}>
      <Container className={s.container}>
        <div className={s.tabList}>
          {storyTabData.map((item, index) => (
            <div
              key={item.id}
              className={`${s.tabItem}`}
              onClick={() => setActiveTab(item.id)}
              style={{ background: item.bg, color: item.text }}
              ref={el => (tabRefs.current[index] = el)}
            >
              <div
                className={s.tabItem_initial}
                ref={el => (initialRefs.current[index] = el)}
              >
                <p
                  className={`${s.number} ${cinzelFont.className}`}
                >{`/0${item.id}`}</p>
                <h3 className={`${s.title} ${cinzelFont.className}`}>
                  {item.title}
                </h3>
              </div>

              <p
                className={s.tabItem_service}
                ref={el => (serviceRefs.current[index] = el)}
              >
                OUR SERVICE
              </p>

              <div
                className={s.tabItem_enhance}
                ref={el => (enhanceRefs.current[index] = el)}
              >
                <p
                  className={`${s.number} ${cinzelFont.className}`}
                >{`/0${item.id}`}</p>
                <h3 className={`${s.title} ${cinzelFont.className}`}>
                  {item.title}
                </h3>
                <p className={s.content}>{item.content}</p>
              </div>

              <div
                className={s.wrap_roundedText}
                ref={el => (roundedTextRefs.current[index] = el)}
              >
                <RoundedText className={s.roundedText} textColor={item.text} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StoryTabs;
