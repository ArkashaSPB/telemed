'use client';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';



// CSS один раз где-то в проекте
import 'swiper/css';
import 'swiper/css/navigation';

const logos = [
    '/partner1.svg','/partner2.png','/partner1.png',
    '/partner2.png','/partner1.png','/partner2.png','/partner1.png','/partner2.png'
];

export default function LogoSwiper() {



    return (
        <div className="logos-wrap">
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                    nextEl: ".logos-next",
                    prevEl: ".logos-prev",
                }}
                loop
                speed={600}
                autoplay={{ delay: 7500, disableOnInteraction: false }}
                spaceBetween={24}
                slidesPerView={2}
                breakpoints={{
                    100: { slidesPerView: 1.3, spaceBetween: 16 },

                    768: { slidesPerView: 4, spaceBetween: 32 },
                    992: { slidesPerView: 5, spaceBetween: 36 },
                    1280:{ slidesPerView: 5, spaceBetween: 21},

                }}
            >
                {logos.map((src, i) => (
                    <SwiperSlide key={i}>
                        <div className="logo-card">
                            <Image src={src} alt={`Логотип ${i+1}`} width={240} height={120}
                                   style={{ width: '100%', height: 'auto' }} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="logos-prev circle-btn left"></div>
            <div className="logos-next circle-btn"></div>
        </div>
    );
}
