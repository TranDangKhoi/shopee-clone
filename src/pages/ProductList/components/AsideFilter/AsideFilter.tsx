import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import omit from "lodash/omit";
import { Controller, useForm } from "react-hook-form";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import Button from "src/components/Button";
import InputNumber from "src/components/InputNumber";
import { path } from "src/constants/path.enum";
import { TCategory } from "src/types/category.type";
import { TQueryConfig } from "src/types/query.type";
import { priceRangeSchema, TPriceRangeType } from "src/schemas/schema";
import RatingFilter from "../RatingFilter";

type AsideFilterProps = {
  categories: TCategory[];
  queryConfig: TQueryConfig;
};

type FormData = TPriceRangeType;
const AsideFilter = ({ categories, queryConfig }: AsideFilterProps) => {
  const { category } = queryConfig;
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      price_min: "",
      price_max: "",
    },
    shouldFocusError: false,
    resolver: yupResolver(priceRangeSchema),
  });

  const handleApplyPriceRange = handleSubmit((values) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: values.price_min?.toString(),
        price_max: values.price_max?.toString(),
      }).toString(),
    });
  });

  const handleRemoveAllFilter = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
          },
          ["rating_filter", "sort_by", "price_min", "price_max", "category", "order"],
        ),
      ).toString(),
    });
  };

  return (
    <div className="py-4">
      <Link
        to={{
          pathname: path.home,
          search: createSearchParams(
            omit(
              {
                ...queryConfig,
              },
              ["category"],
            ),
          ).toString(),
        }}
        className={classNames("flex items-center font-bold", {
          "font-semibold text-primary": !category,
        })}
      >
        <svg
          viewBox="0 0 12 10"
          className="mr-3 h-4 w-3 fill-current"
        >
          <g
            fillRule="evenodd"
            stroke="none"
            strokeWidth={1}
          >
            <g transform="translate(-373 -208)">
              <g transform="translate(155 191)">
                <g transform="translate(218 17)">
                  <path d="m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                  <path d="m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                  <path d="m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className="my-4 h-[1px] bg-gray-300" />
      <ul>
        {categories.map((categoryItem) => {
          const isActive = categoryItem._id === category;
          return (
            <li
              className="py-2 pl-2"
              key={categoryItem._id}
            >
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id.toString(),
                  }).toString(),
                }}
                className={classNames(
                  "relative px-2",
                  {
                    "font-semibold text-primary": isActive,
                  },
                  {
                    "font-normal text-black": !isActive,
                  },
                )}
              >
                {isActive && (
                  <svg
                    viewBox="0 0 4 7"
                    className="absolute top-1 left-[-10px] h-2 w-2 fill-primary"
                  >
                    <polygon points="4 3.5 0 0 0 7" />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        to={path.home}
        className="mt-4 flex items-center font-bold uppercase"
      >
        <svg
          enableBackground="new 0 0 15 15"
          viewBox="0 0 15 15"
          x={0}
          y={0}
          className="mr-3 h-4 w-3 fill-current stroke-current"
        >
          <g>
            <polyline
              fill="none"
              points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className="my-4 h-[1px] bg-gray-300" />
      <div className="my-5">
        <div>Khoảng giá</div>
        <form
          className="mt-2"
          onSubmit={handleApplyPriceRange}
        >
          <div className="flex items-center">
            {/* <InputControl
              type="number"
              control={control}
              name="price_min"
              placeholder="₫ TỪ"
              containerClassName="grow"
              errorClassName="hidden"
              onChange={() => {
                trigger("price_min");
              }}
            ></InputControl> */}
            <Controller
              control={control}
              name="price_min"
              render={({ field }) => {
                return (
                  <InputNumber
                    type="text"
                    placeholder="₫ TỪ"
                    containerClassName="grow"
                    errorClassName="hidden"
                    errorMsg={errors.price_min?.message}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      trigger("price_max");
                    }}
                  />
                );
              }}
            ></Controller>
            <div className="mx-2 shrink-0">-</div>
            <Controller
              control={control}
              name="price_max"
              render={({ field }) => {
                return (
                  <InputNumber
                    type="text"
                    placeholder="₫ ĐẾN"
                    containerClassName="grow"
                    errorClassName="hidden"
                    errorMsg={errors.price_max?.message}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      trigger("price_min");
                    }}
                  />
                );
              }}
            ></Controller>
          </div>
          {errors.price_min?.message ? (
            <div className="mt-1 min-h-[24px] text-center text-base text-red-600">{errors.price_min?.message}</div>
          ) : (
            <div className="mt-1 min-h-[24px] text-center text-base text-red-600"></div>
          )}
          <Button className="flex w-full items-center justify-center bg-primary p-2 text-sm uppercase text-white hover:bg-primary/80">
            Áp dụng
          </Button>
        </form>
      </div>
      <div className="my-4 h-[1px] bg-gray-300" />
      <RatingFilter queryConfig={queryConfig}></RatingFilter>
      <div className="my-4 h-[1px] bg-gray-300" />
      <Button
        onClick={handleRemoveAllFilter}
        className="flex w-full items-center justify-center bg-primary p-2 text-sm uppercase text-white hover:bg-primary/80"
      >
        Xóa tất cả
      </Button>
    </div>
  );
};

export default AsideFilter;
