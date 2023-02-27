import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import productApi from "src/apis/product.api";
import InputNumber from "src/components/InputNumber";
import ProductRating from "src/components/ProductRating";
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import { formatCurrency, formatNumberToSocialStyle, calculateSalePercent } from "src/utils/formatNumber";
import { FreeMode, Navigation, Thumbs } from "swiper";
import React, { useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { Swiper as SwiperType } from "swiper/types";

const ProductDetails = () => {
  const [thumbSwiper, setThumbSwiper] = useState<SwiperType | null>(null);
  const [currentHovered, setCurrentHovered] = useState<string>("");
  const { id } = useParams();
  const { data: productDetailData } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.getProductById(id as string),
  });
  const product = productDetailData?.data.data;
  if (!product) return null;
  return (
    <div className="bg-gray-200 py-6">
      <div className="bg-white p-4 shadow">
        <div className="container">
          <div className="grid grid-cols-12 gap-9">
            <div className="col-span-5">
              <Swiper
                thumbs={{ swiper: thumbSwiper && !thumbSwiper.destroyed ? thumbSwiper : null }}
                spaceBetween={10}
                grabCursor={true}
                modules={[Thumbs]}
              >
                {product.images.map((image) => (
                  <SwiperSlide key={image}>
                    <div className="relative w-full pt-[100%] shadow">
                      <img
                        src={image}
                        alt={product.name}
                        className="absolute top-0 left-0 h-full w-full bg-white object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbSwiper}
                className="mt-4"
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={5}
                navigation={true}
                modules={[Navigation, Thumbs]}
              >
                {product.images.map((image) => {
                  return (
                    <SwiperSlide key={image}>
                      <div className="relative w-full pt-[100%] ">
                        <img
                          src={image}
                          alt={product.name}
                          className="absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="col-span-7">
              <h1 className="text-xl font-medium uppercase">{product.name}</h1>
              <div className="mt-8 flex items-center">
                <div className="flex items-center">
                  <span className="mr-1 border-b border-b-primary text-primary">{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassName="fill-primary text-primary h-4 w-4"
                    nonActiveClassName="fill-gray-300 text-gray-300 h-4 w-4"
                  />
                </div>
                <div className="mx-4 h-4 w-[1px] bg-gray-300"></div>
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className="ml-1 text-gray-500">Đã bán</span>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-x-4 bg-gray-50 px-5 py-4">
                <div className="text-gray-500 line-through">₫{formatCurrency(product.price_before_discount)}</div>
                <div className="text-3xl font-medium text-primary">₫{formatCurrency(product.price)}</div>
                <div className="rounded-sm bg-primary px-1 py-[2px] text-xs font-semibold uppercase text-white">
                  {calculateSalePercent(product.price_before_discount, product.price)} giảm
                </div>
              </div>
              <div className="mt-8 flex items-center">
                <div className="capitalize text-gray-500">Số lượng</div>
                <div className="ml-10 flex items-center">
                  <button className="flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 12h-15"
                      />
                    </svg>
                  </button>
                  <InputNumber
                    type="text"
                    value={1}
                    errorClassName="hidden"
                    className="h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none"
                  />
                  <button className="flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                </div>
                <div className="ml-6 text-sm text-gray-500">{product.quantity} sản phẩm có sẵn</div>
              </div>
              <div className="mt-8 flex items-center gap-x-4">
                <button className="flex h-12 items-center justify-center rounded-sm border border-primary bg-primary/10 px-5 capitalize text-primary shadow-sm hover:bg-primary/5">
                  <svg
                    enableBackground="new 0 0 15 15"
                    viewBox="0 0 15 15"
                    x={0}
                    y={0}
                    className="mr-[10px] h-5 w-5 fill-current stroke-primary text-primary"
                  >
                    <g>
                      <g>
                        <polyline
                          fill="none"
                          points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit={10}
                        />
                        <circle
                          cx={6}
                          cy="13.5"
                          r={1}
                          stroke="none"
                        />
                        <circle
                          cx="11.5"
                          cy="13.5"
                          r={1}
                          stroke="none"
                        />
                      </g>
                      <line
                        fill="none"
                        strokeLinecap="round"
                        strokeMiterlimit={10}
                        x1="7.5"
                        x2="10.5"
                        y1={7}
                        y2={7}
                      />
                      <line
                        fill="none"
                        strokeLinecap="round"
                        strokeMiterlimit={10}
                        x1={9}
                        x2={9}
                        y1="8.5"
                        y2="5.5"
                      />
                    </g>
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button className="flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-primary px-5 capitalize text-white shadow-sm outline-none hover:bg-primary/90">
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white p-4 shadow">
        <div className="container">
          <div className="rounded bg-gray-50 p-4 text-lg capitalize text-slate-700">Mô tả sản phẩm</div>
          <div className="mx-4 mt-12 mb-4 text-sm leading-loose">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
