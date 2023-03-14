# Shoppe Clone

## How to run this project

1. Clone this repository
2. Open the project, and install all the deps and devDeps (This process may takes more than a few minutes):
   <br clear="both">

- For `yarn` users, run `yarn`

- For `npm` users, run `npm install`

- For `pnpm` users, run `pnpm install`

3. Run `yarn dev` or `npm run dev` to start a localhost server, or you can run `yarn dev --host` to host and let other devices get access to the website you're currently hosting

## Main features ⚡:

- Authentication using JWT:

  - Sign up
  - Sign in
  - Sign out

- Product List:

  - Products Searching
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
  - User information updating
  - Avatar uploading
  - Change your password
  - Order's status checking

## What i was using and is gonna be using 🤔

- Programming languages: Javascript, Typescript 👩‍💻

- UI / CSS Library: Tailwind 🌊

- State Management: React Query for async state and React Context for other states 🔍

- Form Management: React Hook Form 👀

- Router: React Router 6️⃣

- Build tool: Vite ⚡

- Multilingualism: i18next 👩‍💻

- SEO: React Helmet ⛑

- Simulate components: Storybook 📔

- Self-testing and unit-testing applied 🔧

- _And many more ..._

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
pnpm add eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-prettier prettier-plugin-tailwindcss eslint-plugin-react-hooks -D
```

## ESLint Configuration

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
    // Some of the plugins above may cause conflicts between eslint and prettier
    // Put these 2 below so they override all of the plugins above => fix the problems
    "eslint-config-prettier",
    "prettier",
  ],
  plugins: ["prettier"],
  settings: {
    react: {
      // Auto-detect react version
      version: "detect",
    },
    // Tell ESlint the correct import format, so that it doesn't show the error when importing components, pages, ...e.t.c
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

Create a new file called `.eslintignore` with the following content:

```json
node_modules/
dist/
```

And also `.prettierrc` with the following content:

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

Last but not least, `.prettierignore` with the following content:

```json
node_modules/
dist/
```

Add new scripts into `package.json`

```json
  "scripts": {
    ...
    "lint": "eslint --ext ts,tsx src/",
    "lint:fix": "eslint --fix --ext ts,tsx src/",
    "prettier": "prettier --check \"src/**/(*.tsx|*.ts|*.css|*.scss)\"",
    "prettier:fix": "prettier --write \"src/**/(*.tsx|*.ts|*.css|*.scss)\""
  },
```

### Config editorconfig

Create a file called `.editorconfig` in the root folder (outside the src folder)

```EditorConfig
[*]
indent_size = 2
indent_style = space
```

### Configuration inside tsconfig.json

Set `"target": "ES2015"` và `"baseUrl": "."` inside `compilerOptions`

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "."
  }
}
```

### Using NodeJS in Vite.config.ts

Install `@types/node` package to use NodeJS inside of .ts files without bugs

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

### Extensions you should, or should i say ... MUST install in VSCode

- ESLint

- Prettier - Code formatter

- EditorConfig for VS Code

Vscode Settings Configuration

- Turn on **`"Format On Save"`**
- Change your default formatter to Prettier

## My Notes

Function to delete all special characters

```ts
export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, "");
```

### React-Router-Dom

When you direct to a page which has the same header and footer component as your layout, the header and footer component won't be unmount, they just re-render

### Tailwind configuration

I have overrided some of the Tailwind's styles, check it out right here: [tailwind.config.cjs](/tailwind.config.cjs)

## Tips and other stuffs

### Tailwind doesn't have suggestions

What did you say ? Your Tailwind doesn't have suggestions for classNames ? 🤔 Follow this instruction:

Add this into your `settings.json` (VSCode version)

```json
{
  //...
  "tailwindCSS.experimental.classRegex": ["[a-zA-Z]*class[a-zA-Z]*='([^']+)'"]
}
```

### How can I enable Tailwind IntelliSense outside of a normal "className"?

When you're writing classNames styles 💅 for many elements within a component using TailwindCSS and you want to conveniently style that component using "whateverClassName" props, sure go ahead and do that. BUT there might be more than 1 element that need to have the "whateverClassName" prop inside its `className attribute`, for example:

```tsx
type InputProps = {
  type: React.HTMLInputTypeAttribute;
  className?: string; // the first one
  containerClassName?: string; // the second one
  errorClassName?: string; // the third one
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ type = "text", className, containerClassName, errorClassName }: InputProps) => {
  return (
    <div className={containerClassName}>
      <input
        type={type}
        className={className}
      />
      <div className={errorClassName}>Error!</div>
    </div>
  );
};
```

When you export the component and then import it somewhere else, you can use those "whateverClassName" prop to style the component 😄. But the problem is... there are no className suggestions ☹. This will become frustrated for those who is new to Tailwind or haven't remembered all of the neccessary classNames (including me)

The reason is because Tailwind will only suggest Tailwind's classNames when you declare a `className=""`, it doesn't understand `errorClassName=""` or `containerClassName=""` or `whateverClassName=""`. So you need to change your settings a bit, using this one I made for myself:

```json
{
  "tailwindCSS.classAttributes": ["class", "className", "ngClass", ".*Styles", ".*ClassName"]
}
```

Example usage:

```tsx
// .*Styles
const contentStyles = "py-1 bg-white dark:bg-gray-700";

// .*ClassName
<MyComponent errorClassName="text-red-500 py-10 bg-white"></MyComponent>;
```

Hope this tip will help you write code faster and more convinient 😎

### Swiper

> Cannot convert undefined or null to object when using Thumbs module

Simply fixed by replace your current thumbs prop with this

```tsx
  thumbs={{ swiper: thumbSwiper && !thumbSwiper.destroyed ? thumbSwiper : null }}
```
