const Patcher = require('./patcher');
const generalConfig = require('react-scripts/config/webpack.config.dev');
const path = require('path');

const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');

const sourcePath = path.join(__dirname, '../src');
const cssLocalName = '[local]--[hash:base64:5]';

module.exports = new Patcher(generalConfig)
  .addAliases({
    'src': sourcePath,
    '@': path.join(sourcePath, 'components'),
  })
  .patch((config) => {
    config.postcss = function() {
      return [
        autoprefixer({
          browsers: [
            'last 2 versions',
            'not ie < 9', // React doesn't support IE8 anyway,
          ],
        }),
        postcssImport({
          path: sourcePath,
        }),
        postcssNested(),
      ];
    };
  })
  .patchJSLoader((handler) => {
    handler.query = Object.assign({}, handler.query, {
      plugins: [
        ['babel-plugin-react-css-modules', {
          generateScopedName: cssLocalName,
          webpackHotModuleReloading: true,
          exclude: 'node_modules',
        }],
      ],
    });
  })
  .patchCssLoader((handler) => {
    handler.loader = `style!css?importLoaders=1&module&localIdentName=${cssLocalName}!postcss`;
    handler.include = [sourcePath];
  })
  .patch((config) => {
    let index = 0;
    for (; index < config.module.loaders.length; index += 1) {
      if (Patcher.isCssLoader(config.module.loaders[index])) {
        break;
      }
    }

    config.module.loaders.splice(index, 0, {
      test: /\.css$/,
      loader: 'style!css?importLoaders=1!postcss',
      exclude: [sourcePath],
    });
  })
  .config;
