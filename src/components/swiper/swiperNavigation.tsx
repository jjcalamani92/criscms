import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper";
import Image from "next/image";

import { FC } from "react";
import { ImageProduct } from "../../../interfaces";

interface SwiperNavigation {
  image: ImageProduct[]
}

export const SwiperNavigation: FC<SwiperNavigation> = ({ image }) => {
  return (
    <>
    {
      image.length !== 0 ?
      
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {
          image.map((data, i) => (
            <SwiperSlide key={i}>
              <Image src={data.src} layout="responsive" objectFit="cover" width={300} height={300} alt={data.alt} />
            </SwiperSlide>
          ))
        }
      </Swiper>
      :
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            <SwiperSlide >
              <Image src={'https://res.cloudinary.com/dqsbh2kn0/image/upload/v1663014890/zawkgpyjvvxrfwp9j7w1.jpg'} layout="responsive" objectFit="cover" width={300} height={300} alt={'image not found'} />
            </SwiperSlide>
        
      </Swiper>
        
    }
    </>
  );
}
