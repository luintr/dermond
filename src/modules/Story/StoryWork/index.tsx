'use client';

import React, { useEffect, useRef } from 'react';
import s from './style.module.scss';
import Container from '@/components/Container';
import { cinzelFont } from '@/utils/fonts';
import { storyWorkData } from '@/constants/story/storyWorks';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const StoryWork = () => {
  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!tabRefs.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: tabRefs.current[0],
        start: 'top top+=100',
        end: 'bottom bottom',
        pin: true,
        markers: true,
        scrub: false,
        onEnter: () => {
          console.log('enter');
        },
      });
    }, [tabRefs.current[0]]);

    return () => {
      ctx.kill();
    };
  }, [tabRefs]);

  return (
    <section className={s.storyWork}>
      <Container className={s.container}>
        <p className={`${s.storyWork_title} ${cinzelFont.className}`}>
          <span>H</span>ow we work
        </p>

        <div className={s.workList}>
          {storyWorkData.map((item, index) => (
            <div
              key={item.id}
              className={`${s.workItem} grid grid-cols-12`}
              ref={el => (tabRefs.current[index] = el)}
            >
              <div className={`${s.workItem_top} col-span-12 col-start-1`}>
                <span className={s.workItem_number}>{`0${item.id}.`}</span>
                <p className={`${s.workItem_title} ${cinzelFont.className}`}>
                  {item.title}
                </p>
              </div>
              <p className={`${s.workItem_content} col-span-5 col-start-1`}>
                {item.content}
              </p>
              <p className={`${s.workItem_content} col-span-5 col-start-7`}>
                {item.sub_content}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StoryWork;
