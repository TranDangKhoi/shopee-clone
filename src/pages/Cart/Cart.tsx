import { useMutation, useQuery } from "@tanstack/react-query";
import { produce } from "immer";
import { keyBy } from "lodash";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import purchaseAPI from "src/apis/purchase.api";
import Button from "src/components/Button";
import QuantityController from "src/components/QuantityController";
import { path } from "src/constants/path.enum";
import { purchasesStatus } from "src/constants/purchaseStatus.enum";
import { PurchaseType } from "src/types/purchase.type";
import { formatCurrency } from "src/utils/formatNumber";
import { generateSlug } from "src/utils/slugify";

type ExtendedPurchases = {
  disabled: boolean;
  checked: boolean;
} & PurchaseType;

const Cart = () => {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchases[]>([]);
  const { data: purchasesInCartData, refetch: purchaseInCartRefetch } = useQuery({
    queryKey: ["purchases", { status: purchasesStatus.inCart }],
    queryFn: () => purchaseAPI.getCart({ status: purchasesStatus.inCart }),
  });
  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseAPI.updateCart,
    onSuccess: () => {
      purchaseInCartRefetch();
    },
  });
  const purchasesInCart = purchasesInCartData?.data.data;
  useEffect(() => {
    setExtendedPurchases((prev) => {
      const newExtendedPurchase = keyBy(prev, "_id");
      return (
        purchasesInCart?.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: Boolean(newExtendedPurchase[purchase._id]?.checked),
        })) || []
      );
    });
  }, [purchasesInCart]);
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked === true);
  const handleSelectProduct = (productIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[productIndex].checked = e.target.checked;
      }),
    );
  };
  const handleSelectAllProducts = () => {
    setExtendedPurchases(
      produce((draft) => {
        draft.forEach((purchase) => {
          purchase.checked = !isAllChecked;
        });
      }),
    );
  };

  const handleQuantity = (productIndex: number, value: number, enable: boolean) => {
    const product = extendedPurchases[productIndex];
    if (enable) {
      setExtendedPurchases(
        produce((draft) => {
          draft[productIndex].disabled === true;
        }),
      );
    }
    updatePurchaseMutation.mutate({ product_id: product.product._id, buy_count: value });
  };

  const handleTypeQuantity = (productIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[productIndex].buy_count = value;
      }),
    );
  };
  return (
    <div className="bg-neutral-100 py-16">
      <div className="container">
        <div className="hidden grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow lg:grid">
          <div className="col-span-6">
            <div className="flex items-center">
              <div className="flex flex-shrink-0 items-center justify-center pr-3">
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-primary"
                  checked={isAllChecked}
                  onChange={handleSelectAllProducts}
                />
              </div>
              <div className="text-black">Sản phẩm</div>
            </div>
          </div>
          <div className="col-span-6">
            <div className="grid grid-cols-5 text-center">
              <div className="col-span-2">Đơn giá</div>
              <div className="col-span-1">Số lượng</div>
              <div className="col-span-1">Số tiền</div>
              <div className="col-span-1">Thao tác</div>
            </div>
          </div>
        </div>
        <div className="my-3 rounded-sm bg-white shadow sm:p-5">
          {extendedPurchases?.map((purchase, index) => (
            <div
              key={purchase._id}
              className="mb-5 flex items-center justify-between rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0 lg:grid lg:grid-cols-12"
            >
              <div className="flex items-center gap-x-3 lg:col-span-6">
                <div className="flex items-center justify-center gap-x-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-primary"
                    checked={purchase.checked}
                    onChange={handleSelectProduct(index)}
                  />
                  <Link
                    className="h-14 w-14 flex-shrink-0 sm:h-20 sm:w-20"
                    to={`${path.home}${generateSlug({
                      name: purchase.product.name,
                      id: purchase.product._id,
                    })}`}
                  >
                    <img
                      alt={purchase.product.name}
                      src={purchase.product.image}
                      className="h-14 w-14 object-cover sm:h-20 sm:w-20"
                    />
                  </Link>
                </div>
                <div className="flex flex-col items-start gap-y-1 lg:flex-row lg:gap-y-0">
                  <Link
                    to={`${path.home}${generateSlug({
                      name: purchase.product.name,
                      id: purchase.product._id,
                    })}`}
                    className="text-left line-clamp-1 lg:line-clamp-2"
                  >
                    {purchase.product.name}
                  </Link>

                  <div className="flex items-center gap-x-3 lg:hidden">
                    <span className="text-gray-300 line-through">
                      ₫{formatCurrency(purchase.product.price_before_discount)}
                    </span>
                    <span className="hidden lg:block">₫{formatCurrency(purchase.product.price)}</span>
                    <span className="block text-primary lg:hidden">₫{formatCurrency(purchase.product.price)}</span>
                  </div>
                  <div className="flex gap-x-3 lg:hidden">
                    <QuantityController
                      max={purchase.product.quantity}
                      value={purchase.buy_count}
                      containerClassName="flex items-center"
                      onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                      onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                      onType={handleTypeQuantity(index)}
                      onFocusOutside={(value) =>
                        handleQuantity(
                          index,
                          value,
                          value >= 1 && value <= purchase.product.quantity && value !== purchase.buy_count,
                        )
                      }
                      disabled={purchase.disabled}
                    />
                    <button className="bg-none text-primary">Xóa khỏi giỏ</button>
                  </div>
                </div>
              </div>
              <div className="col-span-6">
                <div className="grid grid-cols-5 items-center">
                  <div className="col-span-2">
                    <div className="hidden items-center justify-center gap-x-3 lg:flex">
                      <span className="text-gray-300 line-through">
                        ₫{formatCurrency(purchase.product.price_before_discount)}
                      </span>
                      <span className="hidden lg:block">₫{formatCurrency(purchase.product.price)}</span>
                      <span className="block text-primary lg:hidden">₫{formatCurrency(purchase.product.price)}</span>
                    </div>
                  </div>
                  <div className="col-span-1 hidden lg:block">
                    <QuantityController
                      max={purchase.product.quantity}
                      value={purchase.buy_count}
                      containerClassName="flex items-center"
                      onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                      onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                      onType={handleTypeQuantity(index)}
                      onFocusOutside={(value) =>
                        handleQuantity(index, value, value >= 1 && value <= purchase.product.quantity)
                      }
                      disabled={purchase.disabled}
                    />
                  </div>
                  <div className="col-span-1 hidden lg:block">
                    <span className="text-primary">₫{formatCurrency(purchase.product.price * purchase.buy_count)}</span>
                  </div>
                  <div className="col-span-1 hidden lg:block">
                    <button className="hover:text-orange bg-none text-black transition-colors">Xóa</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow lg:flex-row lg:items-center">
          <div className="flex items-center">
            <div className="flex flex-shrink-0 items-center justify-center pr-3">
              <input
                type="checkbox"
                className="h-5 w-5 accent-primary"
                checked={isAllChecked}
                onChange={handleSelectAllProducts}
              />
            </div>
            <button className="mx-3 border-none bg-none">Chọn tất cả ({purchasesInCart?.length})</button>
            <button className="mx-3 border-none bg-none">Xóa</button>
          </div>

          <div className="mt-5 flex flex-col lg:ml-auto lg:mt-0 lg:flex-row lg:items-center">
            <div>
              <div className="flex items-center lg:justify-end">
                <div>Tổng thanh toán (0 sản phẩm):</div>
                <div className="ml-2 text-2xl text-primary">₫138000</div>
              </div>
              <div className="flex items-center text-sm lg:justify-end">
                <div className="text-gray-500">Tiết kiệm</div>
                <div className="ml-6 text-primary">₫138000</div>
              </div>
            </div>
            <Button className="mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 lg:ml-4 lg:mt-0">
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
