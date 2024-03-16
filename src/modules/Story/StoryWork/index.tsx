import React, { useEffect, useRef } from 'react';
import s from './style.module.scss';
import Container from '@/components/Container';
import { cinzelFont } from '@/utils/fonts';
import { storyWorkData } from '@/constants/story/storyWorks';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const StoryWork = () => {
  gsap.registerPlugin(ScrollTrigger);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const triggerRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLParagraphElement | null>(null);

  let mm = gsap.matchMedia();

  useEffect(() => {
    const ctx = gsap.context(() => {
      mm.add('(min-width: 1200px)', () => {
        itemRefs.current.forEach((item, index) => {
          const itemRef = itemRefs.current[index];
          const itemHeight = itemRef?.clientHeight;
          const startOffset = itemHeight && (itemHeight / 1.6) * index;

          const triggerOptions = {
            trigger: triggerRef.current,
            start: `top+=${startOffset}`,
            end: `bottom ${`88%`}`,
            pin: itemRef,
            pinSpacing: false,
          };

          ScrollTrigger.create(triggerOptions);
        });
      });

      mm.add('(min-width: 1200px)', () => {
        ScrollTrigger.create({
          trigger: triggerRef.current,
          start: 'top top',
          end: 'bottom 88%',
          pin: titleRef.current,
          pinSpacing: false,
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);
  return (
    <section className={s.storyWork} ref={triggerRef}>
      <Container className={s.container}>
        <p
          className={`${s.storyWork_title} ${cinzelFont.className}`}
          ref={titleRef}
        >
          <span>H</span>ow we work
        </p>

        <div className={s.workList}>
          {storyWorkData.map((item, index) => (
            <div
              key={item.id}
              className={`${s.workItem} grid grid-cols-12`}
              ref={el => (itemRefs.current[index] = el)}
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
