import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import img1 from "../../Resources/choose1.png";
import img2 from "../../Resources/choose6.png";
import img3 from "../../Resources/choose3.png";
import img4 from "../../Resources/choose4.png";
import img5 from "../../Resources/choose5.png";
import CountUp from "react-countup";

const RecognizeTrack = () => {
  const data = [
    {
      img: img1,
    },
    {
      img: img2,
    },
    {
      img: img3,
    },
    {
      img: img4,
    },
    {
      img: img5,
    },
    {
      img: img1,
    },
    {
      img: img2,
    },
    {
      img: img3,
    },
  ];

  return (
    <div className="w-1/2 mx-auto mb-24">
      <p className="text-center text-[28px] font-sens font-bold my-5">
        A Recognized Track-Record Of Excellence
      </p>
      <Swiper
        slidesPerView={5}
        spaceBetween={5}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={item.img}
              alt="banner img"
              className="w-[150px] h-[150px] rounded-xl text-black"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="w-3/4 mx-auto my-24 flex justify-between items-center">
        <div className="flex justify-center items-center my-16">
          <p className="text-yellow-600 text-4xl font-bold mr-2">
            Total Recipe:
          </p>
          <CountUp
            start={0}
            end={10}
            duration={2.25}
            className="text-5xl font-bold "
          ></CountUp>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-yellow-600 text-4xl font-bold mr-2">
            Total Users:
          </p>
          <CountUp
            start={0}
            end={1000}
            duration={10.25}
            className="text-5xl font-bold "
          ></CountUp>
        </div>

        
      </div>
    </div>
  );
};

export default RecognizeTrack;
