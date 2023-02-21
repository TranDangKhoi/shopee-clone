import { Link } from "react-router-dom";
import { ArrowDownIcon, EarthIcon, ShopeeLogoIcon } from "../Icon";
import Popover from "../Popover";
const MainNavbar = () => {
  return (
    <div className="bg-[linear-gradient(-180deg,#f53d2d,#f63)] pb-5 pt-2 text-white">
      <div className="container">
        <div className="flex justify-end gap-x-6">
          <Popover
            className="flex cursor-pointer items-center gap-x-1 py-1 hover:text-gray-300"
            as="span"
            renderPopover={
              <div className="flex flex-col items-start bg-white shadow-sm">
                <button className="py-3 pl-4 pr-36 hover:text-orange-400">Tiếng Việt</button>
                <button className="py-3 pl-4 pr-36 hover:text-orange-400">English</button>
              </div>
            }
          >
            <EarthIcon></EarthIcon>
            <span>Ngôn ngữ</span>
            <ArrowDownIcon></ArrowDownIcon>
          </Popover>
          <Popover
            className="flex cursor-pointer items-center py-1 hover:text-gray-300"
            renderPopover={
              <div className="flex flex-col items-start bg-white shadow-sm">
                <Link
                  to="/profile"
                  className="w-full px-4 py-3 hover:text-orange-400"
                >
                  Tài khoản của tôi
                </Link>
                <Link
                  to="/orders"
                  className="w-full px-4 py-3 hover:text-orange-400"
                >
                  Đơn mua
                </Link>
                <button className="w-full px-4 py-3 text-left hover:text-orange-400">Đăng xuất</button>
              </div>
            }
          >
            <div className="mr-2 h-6 w-6 flex-shrink-0">
              <img
                src="https://cf.shopee.vn/file/d04ea22afab6e6d250a370d7ccc2e675_tn"
                alt="avatar"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div>Whatever</div>
          </Popover>
        </div>
        <div className="mt-4 flex items-center gap-x-4">
          <Link to="/">
            <ShopeeLogoIcon
              fillColor="secondary"
              hasBrandName={true}
            ></ShopeeLogoIcon>
          </Link>
          <form className="w-full">
            <div className="flex rounded-sm bg-white p-1">
              <input
                type="text"
                name="search"
                className="flex-grow border-none bg-transparent px-3 py-2 text-black outline-none"
                placeholder="Free Ship Đơn Từ 0Đ"
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
          <Link to="/">
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
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
