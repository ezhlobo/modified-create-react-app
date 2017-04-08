# Project name

## Usage

`yarn start` will start development server.

You have full control of webpack config here by [modified `react-scripts` package](https://github/com/ezhlobo/react-scripts).

## Preconfigured stuff

1. CSSModules with hot replacement

  ```js
  import React from 'react';

  import './styles.css'; // `.test { color: red }`

  export default () => <div styleName="test">This text is red</div>;
  ```

  *Note: It imports stylesheets outside from `src` directory without changing selectors.*

2. Aliases for better importing: `src` to source directory, and `@` to components directory. So you can import files independently where you are:

  ```js
  // src/components/FavoriteComponent/index.js
  import helpers from 'src/lib/helpers';
  import Button from '@/Button';
  ```

3. Postcss with `autoprefixer`, `postcss-import` and `postcss-nested`.

4. Added `redux`, `redux-saga`, `react-router` and `lodash`.
