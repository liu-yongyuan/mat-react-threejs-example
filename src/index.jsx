import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import 'antd/dist/reset.css'; // 重置样式
import 'dayjs/locale/zh-cn'; //  默认中文
const root = document.getElementById('root');

/**
 * 1，React.StrictMode 开启严格模式，在严格模式下，React 的开发环境会刻意执行两次渲染，用于突出显示潜在问题。
 * 2，React.StrictMode 如果不想出现这个问题，可以将入口文件中的严格模式去除
 * https://juejin.cn/post/7265625144764825641
 */
createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
