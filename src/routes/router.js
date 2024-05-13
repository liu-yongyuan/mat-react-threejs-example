import App from '@/pages/app/app';
import Home from '@/pages/home/home';
import { createBrowserRouter } from 'react-router-dom';
import React from 'react';

const Welcome = React.lazy(() => import(/* webpackChunkName: "welcome" */ '../pages/welcome/welcome'));;

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
          path: '/welcome',
          Component: Welcome
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
