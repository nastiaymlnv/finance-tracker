import React from "react";
import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "./error-page";

import Home from "./pages/Home";
import Bills from "./pages/Bills";
import Analytics from "./pages/Analytics";
import CreateOperation from "./pages/CreateOperation";

const router = createBrowserRouter([
  {
    path: "/finance-tracker",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  // {
  //   path: "bills/:transactionId",
  //   element: <Bills />,
  //   errorElement: <ErrorPage />,
  // },
  {
    path: "analytics",
    element: <Analytics />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/operation/:transactionId",
    element: <CreateOperation />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/operation",
    element: <CreateOperation />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
