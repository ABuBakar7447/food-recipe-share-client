import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import img1 from "../../Resources/banner.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="w-full max-h-screen object-cover">
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper relative"
      >
        <SwiperSlide>
          <img
            src={img1}
            alt="banner img"
            className="w-full max-h-screen object-cover brightness-75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white brightness-100">
            <h1
              className="text-[90px] font-sans text-white font-bold"
              data-aos="zoom-in-right"
              data-aos-duration="1500"
            >
              Fresh Ingredient, Tasty <br /> Meals and True Flavour
            </h1>
            <div
              className="mt-4 space-x-4"
              data-aos="zoom-in-left"
              data-aos-duration="1500"
            >
              <Link to="/allrecipes">
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
                  All Recipe
                </button>
              </Link>
              <Link to="/addrecipe">
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
                  Add Recipe
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={img1}
            alt="banner img"
            className="w-full max-h-screen object-cover brightness-75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white brightness-100">
            <h1
              className="text-[90px] font-sans text-white font-bold"
              data-aos="zoom-in-right"
              data-aos-duration="1500"
            >
              Fresh Ingredient, Tasty <br /> Meals and True Flavour
            </h1>
            <div
              className="mt-4 space-x-4"
              data-aos="zoom-in-left"
              data-aos-duration="1500"
            >
              <Link to="/allrecipes">
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
                  All Recipe
                </button>
              </Link>
              <Link to="/addrecipe">
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
                  Add Recipe
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
