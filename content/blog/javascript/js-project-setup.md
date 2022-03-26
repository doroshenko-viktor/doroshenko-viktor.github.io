---
title: JavaScript/TypeScript Project Setup
date: "2022-03-20"
description: "Setting up basic projects with ESLint, Prettier and Jest"
---

## Project Init

```bash
npm i typescript --save-dev
npm install @types/node --save-dev
npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true
```

- `rootDir`: This is where `TypeScript` looks for our code. We've configured it to look in the src/ folder. That's where we'll write our TypeScript.
- `outDir`: Where TypeScript puts our compiled code. We want it to go to a build/ folder.
- `esModuleInterop`: If you were in the JavaScript space over the past couple of years, you might have recognized that modules systems had gotten a little bit out of control (AMD, SystemJS, ES Modules, etc). For a topic that requires a much longer discussion, if we're using commonjs as our module system (for Node apps, you should be), then we need this to be set to true.
- `resolveJsonModule`: If we use JSON in this project, this option allows TypeScript to use it.
- `lib`: This option adds ambient types to our project, allowing us to rely on features from different Ecmascript versions, testing libraries, and even the browser DOM api. We'd like to utilize some es6 language features. This all gets compiled down to es5.
- `module`: commonjs is the standard Node module system in 2019. Let's use that.
- `allowJs`: If you're converting an old JavaScript project to TypeScript, this option will allow you to include .js files among .ts ones.
- `noImplicitAny`: In TypeScript files, don't allow a type to be unexplicitly specified. Every type needs to either have a specific type or be explicitly declared any. No implicit anys.

## Ts Config

Base ts project config:

**Compilation Options:**

`compilerOptions` section defines parameters for compilation:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "outDir": "dist",
    "sourceMap": true
  }
}
```

- `lib` - include target specific types. e.g. `dom` for better frontend browser types support.

_default options when `target == es6` set:_

```json
"compilerOptions": {
  "lib": [
    "dom",
    "es6",
    "dom.iterable",
    "scripthost"
  ]
}
```

**Exclude:**

`exclude` section defines paths, which will be excluded from the compilation:

```json
{
  "exclude": [
    "node_modules", // exclude node_modules. excluded by default if no `exclude` section specified
    "path-to-file-or-folder-to-exclude",
    "**/*.dev.ts" // exclude all files with specified extension in any folder
  ]
}
```

**Include:**

`include` section works the same as `exclude` but to include specified patterns into compilation.

**Files:**

`files` section specifies concrete files to compile.

**AllowJs && CheckJs:**

`allowJs` and `checkJs` options enable support for `js` validation inside of `ts` projects.

**Specifying Of Compiled Files Source And Destination:**

`outDir` value used to specify the destination folder of compiled `*.ts` files.
`rootDir` specifies the root of target files to compile. Only files from inside of this root will be compiled.

**Other Options:**

- `removeComments` - not include comments into compiled `*.js` files.
- `noEmit` - compile and check source files, but not create compiled `*.js` files.
- `noEmitOnError` - not emit compiled `js` when compilation error occurs.
- `strict` - strict compilation. This would be equivalent to setting `true` on all of the following:
  - `"noImplicitAny": true` - Enable error reporting for expressions and declarations with an implied `any` type..
  - `"strictNullChecks": true` - When type checking, take into account `null` and `undefined`.
  - `"strictFunctionTypes": true` - When assigning functions, check to ensure parameters and the return values are subtype-compatible.
  - `"strictBindCallApply": true` - Check that the arguments for `bind`, `call`, and `apply` methods match the original function.
  - `"strictPropertyInitialization": true` - Check for class properties that are declared but not set in the constructor.

## Compilation

```bash
npx tsc #compile project
npx tsc -w #set compiler to watch mode; (--watch)
```

Running `*.ts` file without compilation to js:

```bash
npm install --save-dev ts-node nodemon

npx tsc file-name.ts
```

**With monitoring:**

Create `nodemon.json`:

```json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "ts-node ./src/index.ts"
}
```

And add run configuration into `package.json`:

```json
"scripts": {
    "start:dev": "nodemon"
}
```

## ESLint

Installation:

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Create `.eslintrc` file:

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ]
}
```

To ignore some files or folders on linting create [`.eslintignore`](https://eslint.org/docs/user-guide/configuring/ignoring-code):

```text
node_modules/
build/
**/*.js
```

Add lint script:

```text
"lint": "eslint . --ext .ts",
```

There are three modes for a rule in eslint:

- `off` - 0
- `warn` - 1
- `error` - 2

[Rules reference](https://eslint.org/docs/rules/)

```json
"rules": {
  "no-console": 2 // Remember, this means error!
}
```

## Prettier

Install:

```bash
npm install --save-dev prettier
```

Create `.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "none",
  "singleQuote": true,
  "printWidth": 80
}
```

- `semi` set to true means that `Prettier` will add semicolons when necessary.
- `trailingComma` set to none means that `Prettier` will remove any trailing commas at the end of objects.
- `singleQuote` set to true means that `Prettier` will automatically use single quotes instead of double quotes.
- `printWidth` set to 80 specifies that the printer will wrap any lines that exceed 80 characters.

[More rules](https://prettier.io/docs/en/options.html)

Add script:

```json
"prettier-format": "prettier --config .prettierrc 'src/**/*.ts' --write"
```

**Conflicts with ESLint:**

Install:

```bash
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

- `eslint-config-prettier`: Turns off all `ESLint` rules that have the potential to interfere with `Prettier` rules.
- `eslint-plugin-prettier`: Turns `Prettier` rules into `ESLint` rules.

Lastly, we need to make an adjustment to the `.eslintrc`.

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "prettier"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "no-console": 1, // Means warning
    "prettier/prettier": 2 // Means error
  }
}
```

## Testing: Jest

```bash
npm install --save-dev jest @types/jest ts-jest
npx ts-jest config:init
```
