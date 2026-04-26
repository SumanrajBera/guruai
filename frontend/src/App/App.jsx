import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from '../Auth/pages/Login';
import Registration from '../Auth/pages/Registration';
import EmailVerification from '../Auth/pages/EmailVerification';
import router from './app.routes';

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
