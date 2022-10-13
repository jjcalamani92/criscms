import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from 'swiper';

import { FC } from "react";
import { ImageProduct } from "../../../interfaces";
import { Image } from "../utils";

interface SwiperNavigationHome {
  image: ImageProduct[]
}

export const SwiperNavigationHome: FC<SwiperNavigationHome> = ({ image }) => {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation, Pagination]} className="mySwiper" pagination={{
          clickable: true,
        }}>
        {
          image.map((data, i) => (
            <SwiperSlide key={i}>
              <Image img={data} className=" object-cover object-center w-auto h-full" />
            </SwiperSlide>
          ))
        }
      </Swiper>
    {/* {
      image.length !== 0 ?
      
      :
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            <SwiperSlide >
              
              <Image img={data} className="object-cover"/>
            </SwiperSlide>
        
      </Swiper>
        
    } */}
    </>
  );
}
