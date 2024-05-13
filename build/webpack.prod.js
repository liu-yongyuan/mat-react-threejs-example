const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const globAll = require('glob-all');

module.exports = merge(baseConfig, {
  mode: 'production', // 生产模式下, 会开启 tree-shaking 和压缩代码,以及其他优化项
  plugins: [
    // 复制插件
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'), // 从 public 文件夹
          to: path.resolve(__dirname, '../dist'), // 复制到 dist 文件夹
          filter: (source) => {
            return !source.includes('index.html'); // 忽略 index.html
          },
        },
      ],
    }),

    // 抽离 css 插件
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
    }),

    // 清理无用 css
    // 检测 src 下所有 jsx 和 public 下的 index.html 中使用的类名,id 和标签名称
    // 只打包这些文件中用到的样式
    // 不清处，因为会改UI组件的样式，清除了之后影响UI组件的样式不会被加载
    // new PurgeCSSPlugin({
    //   paths: globAll.sync([`${path.join(__dirname, '../src')}/**/*.jsx`, path.join(__dirname, '../public/index.html')]),
    // }),

    // 前端代码在浏览器运行,需要从服务器把html,css,js资源下载执行,下载的资源体积越小,页面加载速度就会越快。
    // 生成 gzip 插件,提供加速加载能力
    new CompressionPlugin({
      // 只生成 js, css 压缩文件
      test: /.(js|css)$/,
      // 文件命名
      filename: '[path][base].gz',
      // 压缩格式,默认为 gzip
      algorithm: 'gzip',
      // 只有大小大于该值的资源会被处理. 默认值是 10k
      threshold: 10240,
      // 压缩率,默认是 0.8
      minRatio: 0.8,
    }),
  ],
});
