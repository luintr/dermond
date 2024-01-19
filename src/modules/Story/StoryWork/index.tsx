import React from 'react';
import s from './style.module.scss';
import Container from '@/components/Container';
import { cinzelFont } from '@/utils/fonts';
import { storyWorkData } from '@/constants/story/storyWorks';

const StoryWork = () => {
  return (
    <section className={s.storyWork}>
      <Container className={s.container}>
        <p className={`${s.storyWork_title} ${cinzelFont.className}`}>
          <span>H</span>ow we work
        </p>

        <div className={s.workList}>
          {storyWorkData.map((item, index) => (
            <div key={item.id} className={`${s.workItem} grid grid-cols-12`}>
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
