# Shoppe Clone

## Main features ⚡:

- Authentication using JWT:

  - Sign up
  - Sign in
  - Sign out

- Product List:

  - Searching products
  - Sorting and filtering
  - Pagination

- Product Detail:

  - Image on hover zoom effect
  - Carousel
  - Add to cart
  - Descriptions are displayed in WYSIWYG HTML format

- Shopping Cart:

  - Payment (demo)
  - CRUD

- User Profile:
  - Update private information
  - Upload avatar
  - Change your password
  - Check order's status

## What i used 🤔

- UI / CSS Library: Tailwind 🌊

- State Management: React Query for async state and React Context for other states 🔍

- Form Management: React Hook Form 👀

- Router: React Router 6️⃣

- Build tool: Vite ⚡

- APIs: Got it from the course 🤯

- Multilingualism: i18next 👩‍💻

- SEO: React Helmet ⛑

- Simulate components: Storybook 📔

- Self-testing and unit-testing applied 🔧

## Setting up the project

Cuz we're not using **Create-React-App 🐢** but **Vite 🐇**, so we must install and configurate ESLint by ourselves. Here are the list of devDeps you have to install:

- ESLint, Prettier

- @typescript-eslint/eslint-plugin, @typescript-eslint/parser: For providing rules for Typescript and detecting Typescript errors

- eslint-config-prettier: To disable all rules that made conflicts between ESLint and Prettier

- eslint-plugin-import: Made ESLint understand what the actual ... is happening with the import statement (In short, helping vite to import more accurate)

- eslint-plugin-jsx-a11y: For accessiblity improvement (check if your website is compatible on multiple devices),

- eslint-plugin-react: ESLint rules for React

- eslint-plugin-prettier: Add some more Prettier's rules in ESLint

- prettier-plugin-tailwindcss: Sorting tailwindcss classes order to resolve CSS conflicts (believe me you must install this right now)

- eslint-plugin-react-hooks: ESLint for React Hooks

For **npm** users:

```bash
npm install eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-prettier prettier-plugin-tailwindcss eslint-plugin-react-hooks -D
```

For **yarn** users:

```bash
yarn add eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-prettier prettier-plugin-tailwindcss eslint-plugin-react-hooks -D
```

For pnpm users:

```bash
I do not want to talk to you
```

## Cấu hình ESLint

Create a new file called `.eslintrc.cjs` in the root folder

```js
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  extends: [
    // Use all of the rules of the installed plugins.
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    // Disable rules that made conflicts between eslint and pretiter
    // Put 2 of these below so they override all of the rules above!
    "eslint-config-prettier",
    "prettier",
  ],
  plugins: ["prettier"],
  settings: {
    react: {
      // Auto-detect react version
      version: "detect",
    },
    // Tell ESlint how to import
    "import/resolver": {
      node: {
        paths: [path.resolve(__dirname, "")],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  env: {
    node: true,
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-no-target-blank": "warn",
    "prettier/prettier": [
      "warn",
      {
        arrowParens: "always",
        semi: true,
        trailingComma: "all",
        tabWidth: 2,
        endOfLine: "auto",
        useTabs: false,
        singleQuote: false,
        printWidth: 120,
        jsxSingleQuote: false,
        singleAttributePerLine: true,
      },
    ],
  },
};
```

Tạo file `.eslintignore`

```json
node_modules/
dist/
```

Tạo file `.prettierrc`

```json
{
  "arrowParens": "always",
  "semi": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "endOfLine": "auto",
  "useTabs": false,
  "singleQuote": false,
  "printWidth": 120,
  "jsxSingleQuote": false,
  "singleAttributePerLine": true
}
```

Tạo file `.prettierignore`

```json
node_modules/
dist/
```

Thêm script mới vào `package.json`

```json
  "scripts": {
    ...
    "lint": "eslint --ext ts,tsx src/",
    "lint:fix": "eslint --fix --ext ts,tsx src/",
    "prettier": "prettier --check \"src/**/(*.tsx|*.ts|*.css|*.scss)\"",
    "prettier:fix": "prettier --write \"src/**/(*.tsx|*.ts|*.css|*.scss)\""
  },
```

### Cài editorconfig

Tạo file `.editorconfig` ở thư mục root

```EditorConfig
[*]
indent_size = 2
indent_style = space
```

### Cấu hình tsconfig.json

Set `"target": "ES2015"` và `"baseUrl": "."` trong `compilerOptions`

### Cấu hình vite config

Íntall `@types/node` package to use NodeJS inside of .ts files without bugs

```bash
yarn add -D @types/node
```

In `vite.config.ts`, do as the following code:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
});
```

### Extensions you should, or should i say MUST install in VSCode

- ESLint

- Prettier - Code formatter

- EditorConfig for VS Code

Vscode Settings Configuration

- Turn on **`"Format On Save"`**
- Change your default formatter to Prettier

## My Notes

Delete all special characters on your keyboard

```ts
export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, "");
```

What did you say ? Your Tailwind doesn't have suggestions for classNames ? 🤔 Follow this instruction:

Add this into your `settings.json` (VSCode version)

```json
{
  //...
  "tailwindCSS.experimental.classRegex": ["[a-zA-Z]*class[a-zA-Z]*='([^']+)'"]
}
```
