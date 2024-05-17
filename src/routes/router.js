import App from '@/pages/app/app';
import Home from '@/pages/home/home';
import { createBrowserRouter } from 'react-router-dom';
import React from 'react';

const ResponsiveExample = React.lazy(() => import(/* webpackChunkName: "responsive-example" */ '../pages/basic/responsive-example'));
const PrimitivesExample = React.lazy(() => import(/* webpackChunkName: "primitives-example" */ '../pages/fundamentals/primitives/primitives-example'));

const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: App,
      children: [
        {
          Component: Home,
          index: true,
        },
        {
          path: '/basic/responsive-example',
          Component: ResponsiveExample
        },
        {
          path: '/fundamentals/primitives-example',
          Component: PrimitivesExample
        }
      ],
    },
  ],
  {
    basename: '/',
    window: window,
  },
);

export default router;
