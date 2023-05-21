import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authApi from "src/apis/auth.api";
import purchaseAPI from "src/apis/purchase.api";
import EmptyCartIcon from "src/assets/images/empty-cart.png";
import { path } from "src/constants/path.enum";
import { purchasesStatus } from "src/constants/purchaseStatus.enum";
import { AuthContext } from "src/contexts/auth.context";
import useSearchProducts from "src/hooks/useSearchProducts";
import { formatCurrency } from "src/utils/formatNumber";
import getAvatarUrl from "src/utils/getAvatarUrl";
import getDeviceType from "src/utils/getDeviceType";
import { generateSlug } from "src/utils/slugify";
import { ArrowDownIcon, EarthIcon, ShopeeLogoIcon } from "../Icon";
import ShopeeLogoIcon2 from "../Icon/ShopeeLogoIcon2";
import Popover from "../Popover";

type TMainNavbar = {
  bottomCropped?: boolean;
};
const MAX_PURCHASES_PER_CART = 5;
const MainNavbar = ({ bottomCropped = false }: TMainNavbar) => {
  const location = useLocation();
  const { handleSearch, register } = useSearchProducts();
  const { isAuthenticated, userProfile, setIsAuthenticated, setUserProfile } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const logOutAccountMutation = useMutation({
    mutationFn: () => authApi.logoutAccount(),
    onSuccess: () => {
      toast.success("Đăng xuất thành công", {
        autoClose: 2000,
      });
      queryClient.removeQueries({
        queryKey: ["cart", { status: purchasesStatus.inCart }],
      });
    },
  });
  const { data: purchasesInCartData } = useQuery({
    queryKey: ["cart", { status: purchasesStatus.inCart }],
    queryFn: () => purchaseAPI.getCart({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated,
  });
  const purchasesInCart = purchasesInCartData?.data.data;
  const handleLogOut = () => {
    logOutAccountMutation.mutate();
    setIsAuthenticated(false);
    setUserProfile(null);

    navigate("/login");
  };

  return (
    <div
      className={`bg-[linear-gradient(-180deg,#f53d2d,#f63)] text-white ${
        bottomCropped ? "items-center py-1" : "pt-2 pb-5"
      }`}
    >
      <div className="container">
        <div className="flex justify-end gap-x-6">
          <Popover
            className="flex cursor-pointer items-center gap-x-1 py-1 hover:text-gray-300"
            as="span"
            renderPopover={
              <div className="flex flex-col items-start bg-white shadow-lg">
                <button className="py-3 pl-4 pr-36 hover:text-orange-400">Tiếng Việt</button>
                <button className="py-3 pl-4 pr-36 hover:text-orange-400">English</button>
              </div>
            }
          >
            <EarthIcon></EarthIcon>
            <span>Ngôn ngữ</span>
            <ArrowDownIcon></ArrowDownIcon>
          </Popover>
          {isAuthenticated && (
            <Popover
              className="flex cursor-pointer items-center py-1 hover:text-gray-300"
              renderPopover={
                <div className="relative rounded-sm border border-gray-200 bg-white shadow-lg">
                  <Link
                    to={path.profile}
                    className="block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500"
                  >
                    Tài khoản của tôi
                  </Link>
                  <Link
                    to={path.orderHistory}
                    className="block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500"
                  >
                    Đơn mua
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500"
                  >
                    Đăng xuất
                  </button>
                </div>
              }
            >
              <div className="mr-2 h-6 w-6 flex-shrink-0">
                <img
                  src={getAvatarUrl(userProfile?.avatar, userProfile?.email)}
                  alt="avatar"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div>{userProfile?.name || "Chưa có tên"}</div>
            </Popover>
          )}
          {!isAuthenticated && (
            <div className="flex items-center gap-x-3">
              <Link
                to={path.register}
                className="capitalize hover:text-white/70"
              >
                Đăng ký
              </Link>
              <div className="h-4 border-r-[1px] border-r-white/40" />
              <Link
                to={path.login}
                className="capitalize hover:text-white/70"
              >
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
        {!bottomCropped && (
          <div className="mt-4 flex items-center gap-x-4">
            <Link to={path.home}>
              <ShopeeLogoIcon
                className="hidden sm:block"
                fillColor="secondary"
              ></ShopeeLogoIcon>
              <ShopeeLogoIcon2
                fillColor="secondary"
                className="block sm:hidden"
              ></ShopeeLogoIcon2>
            </Link>
            <form
              className="w-full"
              onSubmit={handleSearch}
            >
              <div className="flex rounded-sm bg-white p-1">
                <input
                  type="text"
                  className="w-full flex-grow-0 border-none bg-transparent px-3 py-2 text-black outline-none"
                  placeholder="Free Ship Đơn Từ 0Đ"
                  {...register("search")}
                />
                <button className="rounded-sm bg-primary py-2 px-4 hover:opacity-90 lg:px-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </div>
            </form>
            <div className="col-span-1 justify-self-end">
              <Popover
                renderPopover={
                  <div className="relative max-w-[380px] rounded-sm border border-gray-200 bg-white text-sm shadow-md sm:max-w-[400px]">
                    {purchasesInCart && purchasesInCart.length > 0 ? (
                      <>
                        <div className="m-2 capitalize text-gray-400">Sản phẩm mới thêm</div>
                        <div className="mt-5">
                          {purchasesInCart.slice(0, MAX_PURCHASES_PER_CART).map((purchase) => (
                            <Link
                              className="flex py-3 px-2 hover:bg-gray-100"
                              key={purchase._id}
                              to={`/${generateSlug({ name: purchase.product.name, id: purchase.product._id })}`}
                            >
                              <div className="flex-shrink-0">
                                <img
                                  src={purchase.product.image}
                                  alt="anh"
                                  className="h-11 w-11 object-cover"
                                />
                              </div>
                              <div className="ml-2 flex-grow overflow-hidden">
                                <div className="truncate">{purchase.product.name}</div>
                              </div>
                              <div className="ml-2 flex-shrink-0">
                                <span className="text-primary">₫{formatCurrency(purchase.product.price)}</span>
                              </div>
                            </Link>
                          ))}
                          <div className="mx-2 mb-2 mt-6 flex items-center justify-between">
                            {purchasesInCart.length - MAX_PURCHASES_PER_CART > 0 && (
                              <div>Còn {purchasesInCart.length - MAX_PURCHASES_PER_CART} sản phẩm trong giỏ</div>
                            )}
                            <button
                              className="rounded-sm bg-primary px-4 py-2 capitalize text-white hover:bg-opacity-90"
                              onClick={() => navigate("/cart")}
                            >
                              Xem giỏ hàng
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-y-3 py-10 px-16 sm:py-12 sm:px-28">
                        <img
                          src={EmptyCartIcon}
                          alt="Empty"
                          className="h-20 w-20 sm:h-40 sm:w-40"
                        />
                        <span className="text-sm sm:text-base">Chưa có sản phẩm</span>
                      </div>
                    )}
                  </div>
                }
              >
                <Link
                  className="relative"
                  to={getDeviceType() === "mobile" || getDeviceType() === "tablet" ? location.pathname : path.cart}
                >
                  {purchasesInCart && purchasesInCart.length > 0 && (
                    <span className="absolute -top-3 -right-3 flex h-7 w-7 scale-75 items-center justify-center rounded-full bg-white px-3 py-4 text-primary">
                      {purchasesInCart.length}
                    </span>
                  )}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </Link>
              </Popover>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainNavbar;
