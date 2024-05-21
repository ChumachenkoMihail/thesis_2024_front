import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Mousewheel } from "swiper";
import "./index.scss";
import "swiper/css";
import { v4 as uuid } from "uuid";
import Button from "components/app/use/Button";
import { ReactComponent as Trash } from "assets/images/trash.svg";

const ModalSlider = ({
  isDarkTheme,
  allPhotos,
  isEdit = false,
  funcEdit = null,
}) => {
  const [imagesNavSlider, setImagesNavSlider] = useState(null);

  return (
    <div className="">
      <section className={`slider ${isDarkTheme ? "" : "slider_light"}`}>
        <div className="slider__flex">
          <div className="slider__col">
            <div>
              <Button
                mode="primary"
                type="button"
                text="Prev"
                className="slider__prev"
              />
            </div>
            <div>
              <Button
                mode="primary"
                type="button"
                text="Next"
                className="slider__next"
              />
            </div>
          </div>

          <div className="slider__images">
            <Swiper
              thumbs={{ swiper: imagesNavSlider }}
              direction="horizontal"
              slidesPerView={1}
              spaceBetween={32}
              mousewheel={true}
              navigation={{
                nextEl: ".slider__next",
                prevEl: ".slider__prev",
              }}
              breakpoints={{
                0: {
                  direction: "horizontal",
                },
                768: {
                  direction: "horizontal",
                },
              }}
              className="swiper-container2"
              modules={[Navigation, Thumbs, Mousewheel]}
            >
              {allPhotos?.map((slide, index) => {
                return (
                  <SwiperSlide key={uuid()}>
                    <div className="slider__image">
                      {isEdit && (
                        <Button
                          className="edit_avatar"
                          Icon={Trash}
                          mode="primary"
                          func={() => funcEdit(index)}
                        />
                      )}
                      {isEdit && slide === " " ? (
                        <h3 className="removed_title">Удалено</h3>
                      ) : (
                        <>
                          {slide?.startsWith("https") ? (
                            <>
                              <img src={slide} alt="" />
                            </>
                          ) : (
                            <img
                              src={`data:image/png;base64, ${slide}`}
                              alt=""
                            />
                          )}
                        </>
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModalSlider;
