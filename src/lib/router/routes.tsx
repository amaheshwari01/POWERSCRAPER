import React from 'react';
import type { PathRouteProps } from 'react-router-dom';

const Grades = React.lazy(() => import('~/lib/pages/grades'));
const Moodle = React.lazy(() => import('~/lib/pages/moodle'));
const Dashboard = React.lazy(() => import('~/lib/pages/home'));
export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/moodle',
    element: <Moodle />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,

  },
  {
    path: '/grades',
    element: <Grades />,

  }
];

export const privateRoutes: Array<PathRouteProps> = [];
