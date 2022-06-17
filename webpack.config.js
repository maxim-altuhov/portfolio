const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const postcssFlexbugs = require('postcss-flexbugs-fixes');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pagesDir = path.join(__dirname, './src/pages');
const allPages = fs.readdirSync(pagesDir);
const isDev = process.env.NODE_ENV === 'development';
const isDevServer = process.env.SECOND_ENV === 'devserver';
const isProd = !isDev;
const inputTypeFile = 'html';

// Setting whether to put a hash of the file when uploading to production
const setHash = true;

// We form the file name depending on the build mode
const getFileName = (ext) => {
  if (isProd && setHash) return `[name].[fullhash].min.${ext}`;
  if (isProd) return `[name].min.${ext}`;

  return `[name].${ext}`;
};

// Loaders
const setLoaders = (add) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../',
      },
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            postcssFlexbugs,
            [
              'postcss-preset-env',
              {
                autoprefixer: {
                  grid: true,
                },
              },
            ],
          ],
        },
      },
    },
    {
      loader: 'resolve-url-loader',
    },
  ];

  if (add) loaders.push(add);

  return loaders;
};

// Settings for babel
const setBabelOptions = (presets) => {
  const options = {
    presets: [
      ['@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: { version: '3.8', proposals: true },
        },
      ],
    ],
  };
  if (presets) options.presets.push(presets);

  return options;
};

// Plugins
const setPlugins = () => {
  const basePlugins = [
    ...allPages.map((page) => new HTMLWebpackPlugin({
      filename: `${page}.html`,
      template: `${pagesDir}/${page}/${page}.${inputTypeFile}`,
      chunks: [`${page}`],
      minify: {
        collapseWhitespace: isProd,
      },
      inject: 'body',
      scriptLoading: 'blocking',
    })),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/base/assets/'),
        to: path.resolve(__dirname, 'dist/assets/'),
      }],
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/works-img/'),
        to: path.resolve(__dirname, 'dist/img/'),
      }],
    }),
    new MiniCssExtractPlugin({
      filename: `css/${getFileName('css')}`,
    }),
  ];
  if (isDev && !isDevServer) {
    basePlugins.push(new ESLintPlugin());
  } else if (isProd) {
    basePlugins.push(
      new ImageMinimizerPlugin({
        minimizerOptions: {
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
            [
              'svgo',
              {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                ],
              },
            ],
          ],
        },
      }),
    );
  }

  return basePlugins;
};

// Optimization parameters
const setOptimization = () => {
  const config = {};
  if (isProd) {
    config.minimize = true;
    config.minimizer = [new CssMinimizerPlugin(), new TerserWebpackPlugin()];
  } else if (isDev) {
    config.minimize = true;
    config.minimizer = [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardDuplicates: true,
              normalizeWhitespace: false,
              cssDeclarationSorter: false,
              calc: false,
              colormin: false,
              convertValues: false,
              discardComments: false,
              discardEmpty: false,
              discardOverridden: false,
              mergeLonghand: false,
              mergeRules: false,
              minifyFontValues: false,
              minifyGradients: false,
              minifyParams: false,
              minifySelectors: false,
              normalizeCharset: false,
              normalizeDisplayValues: false,
              normalizePositions: false,
              normalizeRepeatStyle: false,
              normalizeString: false,
              normalizeTimingFunctions: false,
              normalizeUnicode: false,
              normalizeUrl: false,
              orderedValues: false,
              reduceInitial: false,
              reduceTransforms: false,
              svgo: false,
              uniqueSelectors: false,
            },
          ],
        },
      }),
    ];
  }

  return config;
};

// Defining input points
const getEntryPoints = () => {
  const entry = {};

  allPages.forEach((page) => {
    entry[`${page}`] = `./pages/${page}/${page}`;
  });

  return entry;
};

// Module with settings
module.exports = {
  context: path.resolve(__dirname, 'src'),
  stats: { children: false },
  mode: 'development',
  entry: getEntryPoints(),
  output: {
    filename: `js/${getFileName('js')}`,
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss', '.html'],
    alias: {
      '@base': path.resolve(__dirname, 'src/base'),
      '@scss': path.resolve(__dirname, 'src/base/scss'),
      '@fonts': path.resolve(__dirname, 'src/base/fonts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@json': path.resolve(__dirname, 'json'),
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
  optimization: setOptimization(),
  devServer: {
    watchFiles: ['src/pages/**/*'],
    port: 4200,
    open: true,
  },
  target: (isDev === true) ? 'web' : 'browserslist',
  devtool: (isDev === true) ? 'source-map' : false,
  plugins: setPlugins(),
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: setBabelOptions(),
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: setLoaders(),
      },
      {
        test: /\.(sass|scss)$/i,
        use: setLoaders({
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }),
      },
      {
        test: /\.(?:ico|png|jpg|jpeg|svg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',
        },
      },
      {
        test: /\.(?:json)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'json/[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
        include: [
          path.resolve(__dirname, 'src/base/fonts'),
        ],
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
};
