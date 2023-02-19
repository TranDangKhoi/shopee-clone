/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ee4d2d",
      },
      backgroundImage: {
        "shopee-pattern": "url('https://cf.shopee.vn/file/5569eb9dc7e09e2dbed5315b8f2ea8ba')",
      },
    },
  },
  plugins: [],
};
