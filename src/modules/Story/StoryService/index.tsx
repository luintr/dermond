import React from 'react';
import s from './style.module.scss';
import Container from '@/components/Container';
import { cinzelFont, pinyonFont, playfairFont } from '@/utils/fonts';
import image from '@Images/serviceImg1.jpg';
import Image from 'next/image';
import { storyEngageData, storyService } from '@/constants/story/storyService';
import BoxParallax from '@/components/BoxParallax';
import Fade from '@/components/Fade';

const StoryService = () => {
  return (
    <section className={s.storyService}>
      <Container className={`${s.container} grid grid-cols-12`}>
        <Fade direction={'left'} from={'30px'} delayTrigger={0.5}>
          <div
            className={`${s.wrapContent} col-span-12 col-start-1 lg:col-span-6 lg:col-start-1`}
          >
            <h2 className={`${s.storyService_title} ${cinzelFont.className} `}>
              Tailored <span className={pinyonFont.className}>Perfection</span>{' '}
              and Unveiling Exquisite Services
            </h2>
            <p className={`${s.storyService_subTitle}`}>
              Step into our vintage atelier, a haven where classic designs meet
              contemporary allure. Our ethos, &quot;A place that brings you to
              the beauty of <span>KNOWLEDGE</span> and <span>SEXY</span> through{' '}
              <span>CLASSIC</span> designs,&quot;
            </p>
          </div>
        </Fade>
        <Fade direction={'right'} from={'30px'} delayTrigger={0.5}>
          <div
            className={`${s.storyService_image} col-span-12 col-start-1 lg:col-span-6 lg:col-start-7`}
          >
            <BoxParallax offset={0.1}>
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={'image'}
              />
            </BoxParallax>
          </div>
        </Fade>
      </Container>

      <Container className={`${s.container_2} grid grid-cols-12`}>
        <div
          className={`${s.engageList} col-span-12 col-start-1 lg:col-span-6 lg:col-start-1 grid grid-cols-6`}
        >
          {storyEngageData.map((item, index) => (
            <Fade
              key={index}
              direction={'bottom'}
              from={'30px'}
              delayTrigger={0.35}
            >
              <div
                key={item.id}
                className={`${s.engageItem} col-span-3`}
                style={{ background: item.bg }}
              >
                <p
                  className={`${s.engageItem_title} ${playfairFont.className}`}
                >
                  {item.title}
                </p>
                <p className={`${s.engageItem_content}`}>{item.content}</p>
              </div>
            </Fade>
          ))}
        </div>
        <div
          className={`${s.serviceList} col-span-12 col-start-1 lg:col-span-6 lg:col-start-7 grid grid-cols-6`}
        >
          {storyService.map((item, index) => (
            <Fade
              key={index}
              direction={'bottom'}
              from={'30px'}
              delayTrigger={0.35}
            >
              <div key={item.id} className={`${s.serviceItem} col-span-2`}>
                <p className={s.serviceItem_desc}>{item.desc}</p>
                <div className={s.serviceItem_wrap}>
                  <p className={s.serviceItem_title}>{item.title}</p>
                  <p className={s.serviceItem_content}>{item.content}</p>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StoryService;
