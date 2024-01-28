import React from 'react';
import type { PathRouteProps } from 'react-router-dom';

const Home = React.lazy(() => import('~/lib/pages/home'));
const Moodle = React.lazy(() => import('~/lib/pages/moodle'));
export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/moodle',
    element: <Moodle />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
