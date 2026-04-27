import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../Auth/pages/Login";
import Registration from "../Auth/pages/Registration";
import EmailVerification from "../Auth/pages/EmailVerification";
import Dashboard from "../Dashboard/pages/Dashboard";
import Protected from "../Auth/components/Protected";

const router = createBrowserRouter([
    {
        element: <Protected />,
        children: [
            {
                path: "/",
                element: <Dashboard />
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            }
        ]
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
        path: '/verify-email/:identifier',
        element: <EmailVerification />,
    }
]);

export default router;