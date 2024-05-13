const node_env = process.env.NODE_ENV;
const base_env = process.env.BASE_ENV;

console.log(`NODE_ENV=${node_env}`);
console.log(`BASE_ENV=${base_env}`);

const isDev = Object.is(base_env, 'dev'); // 是开发环境
const isTest = Object.is(base_env, 'test'); // 是开发环境
const isProd = Object.is(base_env, 'prod'); // 是生产环境

module.exports = {
  isDev,
  isTest,
  isProd,
  node_env,
  base_env,
};
