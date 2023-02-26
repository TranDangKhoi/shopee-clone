import React from "react";

const TransparentStarIcon = () => {
  return (
    <svg
      viewBox="0 0 9.5 8"
      className="mr-1 h-4 w-4"
    >
      <defs>
        <linearGradient
          id="transparentRatingStarGradient"
          x1="50%"
          x2="50%"
          y1="0%"
          y2="100%"
        >
          <stop
            offset={0}
            stopColor="transparent"
          />
          <stop
            offset={1}
            stopColor="transparent"
          />
        </linearGradient>
        <polygon
          id="transparentRatingStar"
          points="14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903"
        />
      </defs>
      <g
        fill="url(#transparentRatingStarGradient)"
        fillRule="evenodd"
        stroke="none"
        strokeWidth={1}
      >
        <g transform="translate(-876 -1270)">
          <g transform="translate(155 992)">
            <g transform="translate(600 29)">
              <g transform="translate(10 239)">
                <g transform="translate(101 10)">
                  <use
                    stroke="#ffa727"
                    strokeWidth=".5"
                    xlinkHref="#ratingStar"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default TransparentStarIcon;
