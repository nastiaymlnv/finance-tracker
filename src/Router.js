import React from "react";
import { createBrowserRouter } from "react-router-dom";

import ErrorPage from './error-page';

import Home from './pages/Home';
import Bills from './pages/Bills';
import Analytics from './pages/Analytics';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />
    },
    {
        path: "bills",
        element: <Bills />,
        errorElement: <ErrorPage />
    },
    {
        path: "analytics",
        element: <Analytics />,
        errorElement: <ErrorPage />
    }
    ]);

export default router;