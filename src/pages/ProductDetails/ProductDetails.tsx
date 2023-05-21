import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import React, { useState } from "react";
import { convert } from "html-to-text";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import productApi from "src/apis/product.api";
import purchaseAPI from "src/apis/purchase.api";
import ProductRating from "src/components/ProductRating";
import QuantityController from "src/components/QuantityController";
import { path } from "src/constants/path.enum";
import { purchasesStatus } from "src/constants/purchaseStatus.enum";
import { calculateSalePercent, formatCurrency, formatNumberToSocialStyle } from "src/utils/formatNumber";
import { getIdFromSlug } from "src/utils/slugify";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// eslint-disable-next-line import/no-unresolved
import { Swiper as SwiperType } from "swiper/types";
import Product from "../ProductList/components/Product";
import { isAxiosError } from "axios";

const ProductDetails = () => {
  const [thumbSwiper, setThumbSwiper] = useState<SwiperType | null>(null);
  const [currentImageState, setCurrentImageState] = useState<HTMLImageElement | null>(null);
  const [currentQuantity, setCurrentQuantity] = useState<number>(1);
  const navigate = useNavigate();
  const { slug } = useParams();
  const id = getIdFromSlug(slug as string);
  const queryClient = useQueryClient();
  const { data: productDetailData } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.getProductById(id as string),
    staleTime: 3 * 60 * 1000,
  });
  const product = productDetailData?.data.data;
  const { data: relevantProductListData } = useQuery({
    queryKey: ["relevantProducts", product?.category._id],
    queryFn: () =>
      productApi.getProducts({ category: product?.category._id, sort_by: "sold", order: "desc", limit: "12" }),
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(product),
  });

  const addToCartMutation = useMutation({
    mutationFn: () => purchaseAPI.addToCart({ buy_count: currentQuantity, product_id: product?._id as string }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", { status: purchasesStatus.inCart }] });
      toast.dismiss();
      toast.success("Thêm vào giỏ hàng thành công", {
        hideProgressBar: true,
        autoClose: 1000,
        draggable: false,
        position: "top-center",
        className: "add-to-cart-successfully-toast",
        closeOnClick: false,
      });
    },
    onError: () => {
      toast.error("Vui lòng đăng nhập!");
    },
  });
  const handleCurrentQuantity = (value: number) => {
    setCurrentQuantity(value);
  };

  const handleAddToCart = () => {
    addToCartMutation.mutate();
  };

  const handleBuyNow = async () => {
    const res = await addToCartMutation.mutateAsync();
    const purchase = res.data.data;
    navigate(path.cart, {
      state: {
        purchaseId: purchase._id,
      },
    });
  };

  const handleEnterZoomMode = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setCurrentImageState(e.currentTarget);
  };

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (currentImageState) {
      const image = currentImageState as HTMLImageElement;
      const { naturalHeight, naturalWidth } = image;
      const offsetX = event.pageX - (rect.x + window.scrollX);
      const offsetY = event.pageY - (rect.y + window.scrollY);

      const top = offsetY * (1 - naturalHeight / rect.height);
      const left = offsetX * (1 - naturalWidth / rect.width);
      image.style.width = naturalWidth + "px";
      image.style.height = naturalHeight + "px";
      image.style.maxWidth = "unset";
      image.style.top = top + "px";
      image.style.left = left + "px";
    }
  };

  const handleRemoveZoom = () => {
    const image = currentImageState as HTMLImageElement;
    setCurrentImageState(null);
    image.removeAttribute("style");
  };

  if (!product) return null;
  return (
    <div className="bg-gray-200 py-6">
      <Helmet>
        <title>{product.name}</title>
        <meta
          name="description"
          content={`${convert(product.description, {
            limits: { maxInputLength: 170 },
            preserveNewlines: false,
          })}`}
        />
      </Helmet>
      <div className="bg-white p-4 shadow">
        <div className="container">
          <div className="lg:grid lg:grid-cols-12 lg:gap-9">
            <div className="block lg:col-span-5">
              <Swiper
                thumbs={{ swiper: thumbSwiper && !thumbSwiper.destroyed ? thumbSwiper : null }}
                spaceBetween={10}
                grabCursor={true}
                preventInteractionOnTransition={true}
                modules={[Thumbs]}
                className="transition-all duration-200 hover:shadow-bottom-spread active:pointer-events-none"
              >
                {product.images.map((image) => {
                  return (
                    <SwiperSlide key={image}>
                      <div
                        className="relative w-full overflow-hidden pt-[100%]"
                        onMouseMove={handleZoom}
                        onMouseLeave={handleRemoveZoom}
                      >
                        <img
                          src={image}
                          alt={product.name}
                          onMouseEnter={handleEnterZoomMode}
                          aria-hidden={true}
                          className="absolute top-0 left-0 h-full w-full cursor-zoom-in bg-white object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <Swiper
                onSwiper={setThumbSwiper}
                className="mt-4"
                grabCursor={true}
                breakpoints={{
                  320: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                    freeMode: true,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                  },
                }}
                navigation={true}
                modules={[Navigation, Thumbs, FreeMode]}
              >
                {product.images.map((image) => {
                  return (
                    <SwiperSlide key={image}>
                      <div className="relative w-full pt-[100%]">
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
            <div className="mt-5 block lg:col-span-7">
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
                <div className="text-2xl font-medium text-primary sm:text-3xl">₫{formatCurrency(product.price)}</div>
                <div className="rounded-sm bg-primary px-1 py-[2px] text-xs font-semibold uppercase text-white">
                  {calculateSalePercent(product.price_before_discount, product.price)} giảm
                </div>
              </div>
              <div className="mt-8 flex items-center">
                <div className="capitalize text-gray-500">Số lượng</div>
                <QuantityController
                  type="text"
                  onDecrease={handleCurrentQuantity}
                  onIncrease={handleCurrentQuantity}
                  onType={handleCurrentQuantity}
                  value={currentQuantity}
                  max={product.quantity}
                  containerClassName="ml-10"
                ></QuantityController>
                <div className="ml-6 text-sm text-gray-500">{product.quantity} sản phẩm có sẵn</div>
              </div>
              <div className="mt-8 sm:flex sm:items-center sm:gap-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex h-12 w-full items-center justify-center rounded-sm border border-primary bg-primary/10 px-5 capitalize text-primary shadow-sm hover:bg-primary/5 sm:w-auto"
                >
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
                <button
                  onClick={handleBuyNow}
                  className="mt-5 flex h-12 w-full min-w-[5rem] items-center justify-center rounded-sm bg-primary px-5 capitalize text-white shadow-sm outline-none hover:bg-primary/90 sm:mt-0 sm:w-auto"
                >
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
      <div className="container">
        <h2 className="mt-5 uppercase">Các sản phẩm liên quan khác</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
          {relevantProductListData &&
            relevantProductListData.data.data.products.map((product) => (
              <div
                className="col-span-1"
                key={product._id}
              >
                <Product product={product}></Product>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
