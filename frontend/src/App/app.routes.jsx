import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../Auth/pages/Login";
import Registration from "../Auth/pages/Registration";
import EmailVerification from "../Auth/pages/EmailVerification";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" replace />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Registration />,
    },
    {
        path: '/verify-email',
        element: <EmailVerification />,
    }
]);

export default router;