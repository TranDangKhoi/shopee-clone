import { createSearchParams, useNavigate } from "react-router-dom";
import { StarIcon, TransparentStarIcon } from "src/components/Icon";
import { path } from "src/constants/path.enum";
import { TQueryConfig } from "src/types/query.type";

type RatingFilterProps = {
  queryConfig: TQueryConfig;
};

const RatingFilter = ({ queryConfig }: RatingFilterProps) => {
  const navigate = useNavigate();
  const handleRatingFilter = (numberOfStar: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        page: "1",
        rating_filter: numberOfStar.toString(),
      }).toString(),
    });
  };

  return (
    <>
      <div className="text-sm">Đánh giá</div>
      <ul className="my-3">
        {Array(5)
          .fill(0)
          .map((_, listIndex) => (
            <li
              className="py-1 pl-2"
              key={listIndex}
            >
              <div
                className="flex cursor-pointer items-center text-sm"
                onClick={() => handleRatingFilter(5 - listIndex)}
                aria-hidden={true}
              >
                {Array(5)
                  .fill(0)
                  .map((_, starIndex) => {
                    if (starIndex < 5 - listIndex) {
                      return <StarIcon key={starIndex}></StarIcon>;
                    }
                    return <TransparentStarIcon key={starIndex}></TransparentStarIcon>;
                  })}
                {listIndex !== 0 && <span>Trở lên</span>}
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default RatingFilter;
