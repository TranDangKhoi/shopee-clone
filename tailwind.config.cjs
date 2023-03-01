// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      screens: {
        xs: "365px",
      },
      colors: {
        primary: "#ee4d2d",
      },
      boxShadow: {
        "bottom-spread": "rgba(0, 0, 0, 0.35)0px 5px 15px;",
      },
      backgroundImage: {
        "shopee-pattern": "url('https://cf.shopee.vn/file/5569eb9dc7e09e2dbed5315b8f2ea8ba')",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".container": {
          maxWidth: theme("columns.7xl"),
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: theme("spacing.4"),
          paddingRight: theme("spacing.4"),
          // Vì các trình duyệt phiên bản cũ (Chrome <2020, IE 9 11, ...v.v) chưa hỗ trợ kiểu styles này nên phải tạm comment để sử dụng kiểu trên
          // marginInline: "auto",
          // paddingInline: theme("spacing.4"),
          // Nguồn: https://caniuse.com/?search=%20%20padding-inline và https://caniuse.com/?search=margin-inline
        },
      });
    }),
    require("@tailwindcss/line-clamp"),
  ],
};
