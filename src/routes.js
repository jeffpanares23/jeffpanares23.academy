import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/UserPage';
import TownPage from './pages/TownPage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import PageSuccess from './pages/PageSuccess';

import DashboardAppPage from './pages/DashboardAppPage';

// ----------------------------------------------------------------------

const isAuthenticated = () => {
  const token = sessionStorage.getItem('token');
  return token !== null;
};

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'town', element: <TownPage /> },
        { path: 'post', element: <PostPage /> },
      ],
    },
    {
      path: 'login',
      element: isAuthenticated() ? <Navigate to="/dashboard" /> : <LoginPage />,
    },
    {
      path: 'success',
      element: isAuthenticated() ? <PageSuccess /> : <Navigate to="/login" />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
