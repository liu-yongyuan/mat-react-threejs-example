const isDev = process.env.NODE_ENV === 'development'; // 是否为开发模式

module.exports = function (api) {
  api.cache(false);

  // console.log("[mat-cloud-learn][react]--- babel.config.js %o", api);

  // plugins: [isDev && require.resolve("react-refresh/babel")].filter(Boolean),
  const plugins = [isDev && require.resolve('react-refresh/babel')].filter(Boolean);
  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', // 根据配置的浏览器兼容,以及代码中使用到的 api 进行引入 polyfill 按需添加
        corejs: 3, // 配置使用 core-js 版本
      },
    ],
    '@babel/preset-react', // 此处可配置, 只处理 tsx 和 jsx
    '@babel/preset-typescript',
  ];

  return {
    plugins,
    presets,
  };
};
