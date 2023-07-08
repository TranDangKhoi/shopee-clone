/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended", "plugin:import/recommended", "plugin:import/typescript", "plugin:jsx-a11y/recommended", "plugin:@typescript-eslint/recommended", "eslint-config-prettier", "prettier", "plugin:storybook/recommended"],
  plugins: ["prettier"],
  settings: {
    react: {
      // Nói eslint-plugin-react tự động biết version của React.
      version: "detect"
    },
    // Nói ESLint cách xử lý các import
    "import/resolver": {
      node: {
        // Fix a path bug causing the root directory is not the current project - ESLint bug
        paths: [path.resolve(__dirname, "")],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  env: {
    node: true
  },
  rules: {
    // Tắt rule yêu cầu import React trong file jsx
    "react/react-in-jsx-scope": "off",
    // Cảnh báo khi thẻ <a target='_blank'> mà không có rel="noreferrer"
    "react/jsx-no-target-blank": "warn",
    // Tăng cường một số rule prettier (copy từ file .prettierrc qua)
    "prettier/prettier": ["warn", {
      arrowParens: "always",
      semi: true,
      trailingComma: "all",
      tabWidth: 2,
      endOfLine: "auto",
      useTabs: false,
      singleQuote: false,
      printWidth: 120,
      jsxSingleQuote: false,
      singleAttributePerLine: true
    }]
  }
};