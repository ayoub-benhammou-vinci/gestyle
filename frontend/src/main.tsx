import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import App from './components/Main/App';
import LoginPage from './components/pages/Loginpage';
import Homepage from './components/pages/Homepage';
import RegisterPage from './components/pages/Registerpage';
import Todopage from './components/pages/Todopage';
import Focuspage from './components/pages/Focuspage';
import { UserContextProvider } from './contexts/UserContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'todo',
        element: <Todopage />,
      },
      {
        path: 'focus',
        element: <Focuspage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>,
);
