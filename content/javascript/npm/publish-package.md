---
title: Publishing NPM Package With Typescript
date: "2022-06-30"
description: "Create and publish NPM package with Typescript"
mainPage: true
---

## Init Typescript Project

Create a new project folder and place inside:

`package.json` with following content:

```json
{
  "name": "package-name",
  "version": "0.0.1",
  "description": "package description",
  "main": "build/index.js", // path to main executable script
  "types": "build/index.d.ts", // path to main type declarations file
  "scripts": {
    "test": "jest --coverage",
    "test:watch": "jest --coverage --watchAll",
    "format": "prettier --config .prettierrc 'src/**/*.ts' --write",
    "lint": "eslint . --ext .ts",
    "view:coverage": "serve coverage/lcov-report",
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "devDependencies": {
    "@types/jest": "^27.4.1",
    "@types/node": "^17.0.23",
    "@typescript-eslint/eslint-plugin": "^5.17.0",
    "@typescript-eslint/parser": "^5.17.0",
    "eslint": "^8.12.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.0.0",
    "install": "^0.13.0",
    "jest": "^27.5.1",
    "npm": "^8.5.5",
    "prettier": "^2.6.1",
    "ts-jest": "^27.1.4",
    "typescript": "^4.6.3"
  },
  "repository": {
    "type": "git",
    "url": "git repo url"
  },
  "author": "author name",
  "license": "ISC",
  "bugs": {
    "url": "issues url"
  },
  "homepage": "readme url",
  "dependencies": {
  }
}
```

Here `name` - it is a name of package. With this name it will be created in npm registry.
`version` is a version of package. Package can not be exported with same version twice.
`main` and `types` define paths to main executable and types. We add `/build` section because as we have
a `typescript` project, our executables will be compiled and placed to specific folder. In our case
this specific folder will be `build`, which we will specify in `tsconfig.json` file next. Depending on
configuration you can choose any name you prefer.

*in this example we will pack all the project, but we can also create configuration, when only `build` content will be published*

In `repository` section we can specify path to project's repository.
`homepage` defines path to project's main page. Often it is a path to the readme file on git.
`bugs` section defines path to the issues page of the project.

`tsconfig.json` with following content:
  
```json
{
    "compilerOptions": {
        "target": "es2016",
        "lib": [
        "es6"
        ],
        "module": "commonjs",
        "rootDir": "",
        "resolveJsonModule": true,
        "allowJs": false,
        "declaration": true,
        "sourceMap": true,
        "outDir": "build",
        "removeComments": true,
        "noEmitOnError": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "noImplicitAny": true,
        "noImplicitThis": true,
        "alwaysStrict": true,
        "skipLibCheck": true
    },
    "exclude": [
        "node_modules",
        "**/*.js",
        "**/*.dev.ts",
        "build"
    ]
}
```

For testing configure `jest`:

```js
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        "@exmpl/(.*)": "<rootDir>/src/$1"
    },
    "testRegex": "((/__tests__/).*|(\\.|/)(test|spec))\\.(ts|js)$",
    "coverageDirectory": "coverage",
    "collectCoverageFrom": [
        "src/**/*.{ts}",
        "src/**/*.d.ts"
    ]
};
```

Also we have defined `prettier` and `eslint` in our dev dependencies. For them we need to create
`.prettierrc`, `.eslintrc` and `.eslintignore` files in the root of projects with proper configuration,
you prefer.

As a starter for example let's use:

For `.prettierrc`:

```json
{
    "semi": true,
    "trailingComma": "none",
    "singleQuote": true,
    "printWidth": 80,
    "tabWidth": 2
}
```

For `.eslintrc`:

```json
{
    "root": true,
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "@typescript-eslint"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "rules": {
    }
}
```

For `.eslinignore`:

```txt
node_modules/
build/
**/*.js
```

Create folders `src` and `tests` in root project folder.

Now we can create our business code in `src` folders and tests in `tests` folder.

## Publish Package

As our package is ready, we can publish it. But before that we have to login into `npm`.
To do that run:

```bash
npm adduser
```

This command will ask for username, password and `OTP`.

Once that is done run:

```bash
npm publish
```

Now the package should be successfully published into npm registry.

## Publish On Github NPM Registry

Create `Github` access token with following permissions:

- `repo`
- `write:packages`
- `read:packages`

Then authorize `npm` to access `Github` registry:

```bash
npm config set //npm.pkg.github.com/:_authToken <generated-token>
```

`Github` only allows to push packages within a context of user account, so field `name` in `package.json`
should be assembled as follows:

```json
"name": "@<account-name>/<package-name>"
```

Then to use our uploaded package from custom scope, we should specify source in `.npmrc` file:

```txt
@<account-name>:registry=https://npm.pkg.github.com/
```

Now installing packages from `@<account-name>` they will be downloaded from customized source.
