import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { createSearchParams, Link } from "react-router-dom";
import purchaseAPI from "src/apis/purchase.api";
import { Helmet } from "react-helmet-async";
import { path } from "src/constants/path.enum";
import { purchasesStatus } from "src/constants/purchaseStatus.enum";
import useQueryParams from "src/hooks/useQueryParams";
import { TPurchaseListStatus } from "src/types/purchase.type";
import { formatCurrency } from "src/utils/formatNumber";
import { generateSlug } from "src/utils/slugify";

const purchaseTabs = [
  { status: purchasesStatus.all, name: "Tất cả" },
  { status: purchasesStatus.waitForConfirmation, name: "Chờ xác nhận" },
  { status: purchasesStatus.waitForPickup, name: "Chờ lấy hàng" },
  { status: purchasesStatus.inProgress, name: "Đang giao" },
  { status: purchasesStatus.delivered, name: "Đã giao" },
  { status: purchasesStatus.cancelled, name: "Đã hủy" },
];

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams();
  const status: number = Number(queryParams.status) || purchasesStatus.all;

  const { data: purchasesInCartData } = useQuery({
    queryKey: ["purchases", { status }],
    queryFn: () => purchaseAPI.getCart({ status: status as TPurchaseListStatus }),
  });

  const purchasesInCart = purchasesInCartData?.data.data;
  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.orderHistory,
        search: createSearchParams({
          status: String(tab.status),
        }).toString(),
      }}
      className={classNames("flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center", {
        "border-b-primary text-primary": status === tab.status,
        "border-b-black/10 text-gray-900": status !== tab.status,
      })}
    >
      {tab.name}
    </Link>
  ));

  return (
    <div>
      <Helmet>
        <title>Shopee At Home | Đơn mua</title>
      </Helmet>
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="sticky top-0 flex rounded-t-sm shadow-sm">{purchaseTabsLink}</div>
          <div>
            {purchasesInCart?.map((purchase) => (
              <div
                key={purchase._id}
                className="mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm"
              >
                <Link
                  to={`${path.home}${generateSlug({ name: purchase.product.name, id: purchase.product._id })}`}
                  className="flex"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="h-20 w-20 object-cover"
                      src={purchase.product.image}
                      alt={purchase.product.name}
                    />
                  </div>
                  <div className="ml-3 flex-grow overflow-hidden">
                    <div className="truncate">{purchase.product.name}</div>
                    <div className="mt-3">x{purchase.buy_count}</div>
                  </div>
                  <div className="ml-3 flex-shrink-0">
                    <span className="truncate text-gray-500 line-through">
                      ₫{formatCurrency(purchase.product.price_before_discount)}
                    </span>
                    <span className="ml-2 truncate text-primary">₫{formatCurrency(purchase.product.price)}</span>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <div>
                    <span>Tổng giá tiền</span>
                    <span className="ml-4 text-xl text-primary">
                      ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
