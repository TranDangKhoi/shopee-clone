import React from "react";
import { Link } from "react-router-dom";
import ProductRating from "src/components/ProductRating";
import { TProduct } from "src/types/product.type";
import { formatCurrency, formatNumberToSocialStyle } from "src/utils/formatNumber";
import { generateSlug } from "src/utils/slugify";
type ProductProps = {
  product: TProduct;
};
const Product = ({ product }: ProductProps) => {
  product;
  return (
    <Link to={`/${generateSlug({ name: product.name, id: product._id })}`}>
      <div className="overflow-hidden rounded-sm bg-white shadow transition-all duration-200 hover:translate-y-[-0.09rem] hover:shadow-md">
        <div className="relative w-full pt-[100%]">
          <img
            src={product.image}
            alt={product.name}
            className="absolute top-0 left-0 h-full w-full bg-white object-cover"
          />
        </div>
        <div className="overflow-hidden p-2">
          <div className="min-h-[2rem] text-xs line-clamp-2">{product.name}</div>
          <div className="mt-3 flex items-center gap-x-1">
            <div className="max-w-[50%] truncate text-gray-500 line-through">
              <span className="text-xs">₫</span>
              <span className="text-sm">{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className="truncate text-primary">
              <span className="text-xs">₫</span>
              <span className="text-sm">{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-x-2">
            <ProductRating
              rating={product.rating}
              activeClassName="w-3 h-3 fill-[#ffca11] text-[#ffca11]"
              nonActiveClassName="w-3 h-3 fill-gray-300 text-gray-300"
            ></ProductRating>
            <div className="flex gap-x-1 text-sm">
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
