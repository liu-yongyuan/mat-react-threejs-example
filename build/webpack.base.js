const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const env = require('./env');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const { isDev } = env;

module.exports = {
  entry: path.join(__dirname, '../src/index.jsx'), //入口文件

  //打包文件出口
  output: {
    /* 
    合理配置文件缓存,可以提升前端加载页面速度。webpack打包的hash分三种：
hash：跟整个项目的构建有关，只要项目里面有文件修改，那么整个项目构建的hash都会改变
chunkhash:文件本身修改或者依赖的文件修改，chunkhash值会改变
contenthash:每个文件有一个单独的hash值，文件的改动只会影响自身的hash

js:我们在生产环境里会把一些公共库和程序入口文件区分开,单独打包构建。采用chunkhash的方式生成哈希值,那么只要我们不改动公共库的代码,就可以保证其哈希值不会受影响,可以继续使用浏览器缓存,所以js适合使用chunkhash。
css、媒体、图片资源:一般都是单独存在的,可以采用contenthash,只有文件本身变化后会生成新hash值。
修改webpack.base.js,把js输出的文件名称格式加上chunkhash,把css和图片媒体资源输出格式加上

     */
    filename: 'static/js/[name].[chunkhash:8].js', //每个输出的js文件的名称
    path: path.join(__dirname, '../dist'), //打包结果输出的路径
    clean: true, //webapck5内置的，webpack4中需要配置clean-webpack-plugin来删除之前的dist
    publicPath: '/', //打包后文件的公共前缀路径
  },

  module: {
    rules: [
      // babel tsx 和 ts 文件转换
      {
        test: /.(js|jsx|ts|tsx)$/,
        use: ['babel-loader', 'thread-loader'],
        include: [path.resolve(__dirname, '../src')], // 只对项目 src 文件的 ts,tsx 进行 loader 解析
      },
      // css 文件处理,通过插件解析 css 样式和注入到页面
      {
        test: /.css$/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      // less 文件处理,拆分处理
      {
        test: /.less$/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
      },
      // 使用 webpack5 自带的 asset-module 处理图片文件
      {
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: 'asset', // type 选择 asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于 10kb 转 base64
          },
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
      },
      // 处理字体和媒体文件. 处理方式和图片一样
      {
        test: /.(woff2?|ttf|eot)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: 10 * 1024,
        },
        generator: {
          filename: 'static/font/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
      },
      {
        test: /.(map4|mp3|webm|wav|flac|acc|ogg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: 10 * 1024,
        },
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
      },
    ],
  },

  resolve: {
    /* 
      extebsions是webpack的resolve解析配置下的选项，在==引入模块时不带入文件后缀==的时候，会在该配置数组中依次添加后缀查找文件。
      因为ts不支持引入以.ts、.tsx为后缀的文件，所以要在extensions中要配置，在很多第三方库中里面很多引入js文件且没有带后缀，所以也要配置下js。
    */
    extensions: ['.js', '.jsx', '.tsx', '.ts'],

    // alias 别名
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },

    // 缩小模块的搜索范围
    /* node 里面模块分三种:
    1,node 核心模块
    2,node_modules模块
    3,自定义的文件模块

    使用require或者import来引入模块时，如果有准确的路径，那么就会按照路径来查找。如果没有准确的路径时，
    它就会优先查询node模块，若没有找到，就去当前目录下的node_modules中找，如果没有找到，就会从父级文件夹中查找node_modules,一直查到系统node全局模块。

    这样的话就会有些问题，比如一级一级地查询比较消耗时间。我们可以告诉webpack搜索目录范围,来规避这个问题
    */
    modules: [path.resolve(__dirname, '../node_modules')],
  },

  plugins: [
    /* html 模板插件 */
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 模板用定义 root 节点的模板
      inject: true, // 自动注入静态资源
    }),

    /* process.env.BASE_ENV注入到业务代码里面，就可以通过该环境变量设置对应环境的接口地址和数据 */
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
    }),
  ],

  // webpack 5 缓存
  cache: {
    type: 'filesystem', // 使用文件缓存
  },

  // 优化
  optimization: {
    minimizer: [
      // css 压缩插件
      new CssMinimizerPlugin(),

      // webpack5 自带了该插件
      // 但是 css 压缩插件会导致失效,需要重新安装该插件和对插件进行使用
      // npm i terser-webpack-plugin -D
      new TerserPlugin({
        // 压缩 js
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ['console.log'], // 删除 console.log
          },
        },
      }),
    ],
    /* 
  6,一般情况下第三方包不会改动，我们可以对node_modules里的代码单独打包，
  当第三方包代码没有改变时，它的chunkhash也不会改变，我们可以有效利用浏览器的缓存。
  
  webpack提供了代码分隔功能，需要在optimization中手动配置splitChunk规则

  ===>
  7、tree-shaking清理未引用的js
  模式mode为production时就会默认开启tree-shaking功能以此来标记未引入代码然后移除掉.
   */
    // 分隔代码
    splitChunks: {
      cacheGroups: {
        // 提取 node_modules 代码
        vendors: {
          // 只匹配 node_modules 里的模块
          test: /node_modules/,
          // 提取文件名为 vendors.js 后缀和 chunkhash 会自动添加
          name: 'vendors',
          // 只要使用 1 次就提取出来
          minChunks: 1,
          // 只提取初始化就能获取到的模块,不管异步的
          chunks: 'initial',
          // 提取代码体积大于 0 就提取出来
          minSize: 0,
          // 提取优先级为 1
          priority: 1,
        },
        // 提取页面公共代码
        commons: {
          // 提取文件名为 commons
          name: 'commons',
          // 只要使用 2 次就提取出来
          minChunks: 2,
          // 只提取初始化就能获取到的模块,不管异步的
          chunks: 'initial',
          // 提取代码体积大于 0 就提取出来
          minSize: 0,
        },
      },
    },
  },
};

/* 
8、资源懒加载
react,vue等单页应用打包默认会打包到一个js文件中,虽然使用代码分割可以把node_modules模块和公共模块分离,但页面初始加载还是会把整个项目的代码下载下来,
其实只需要公共资源和当前页面的资源就可以了,其他页面资源可以等使用到的时候再加载,可以有效提升首屏加载速度。

webpack默认支持资源懒加载,只需要引入资源使用import语法来引入资源,webpack打包的时候就会自动打包为单独的资源文件,等使用到的时候动态加载。

const LazyDemo = lazy(() => import('@/components/LazyDemo')) // 使用import语法配合react的Lazy动态引入资源

show为true时加载LazyDemo组件 
//{ show && <Suspense fallback={null}><LazyDemo /></Suspense> }
 */
