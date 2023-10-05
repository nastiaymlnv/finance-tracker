import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PropTypes from 'prop-types';

import Home from "./pages/Home";
import CreateOperation from "./pages/CreateOperation";
import Analytics from "./pages/Analytics";
import Accounts from "./pages/Accounts";

import { ErrorBoundary } from "./components/ErrorBoundary";

const Router = ({setShowBottomNav}) => {
  return <Routes>
    <Route
      path="/finance-tracker"
      element={<Navigate to="/home" />}
    />
    <Route
      path="/home"
      element={<Home setShowBottomNav={setShowBottomNav}/>}
      errorElement={<ErrorBoundary />}
    />
    <Route
      path="/analytics"
      element={<Analytics setShowBottomNav={setShowBottomNav} />}
      errorElement={<ErrorBoundary />}
    />
    <Route
      path="/operation"
      element={<CreateOperation setShowBottomNav={setShowBottomNav} />}
      errorElement={<ErrorBoundary />}>
      <Route
        path=":transactionId"
        element={<CreateOperation />}
        errorElement={<ErrorBoundary />}
      />
    </Route>
    <Route
      path="/accounts"
      element={<Accounts setShowBottomNav={setShowBottomNav} />}
      errorElement={<ErrorBoundary />}
    />
    <Route path="/*" element={<ErrorBoundary setShowBottomNav={setShowBottomNav} />} />
  </Routes>
}

Router.propTypes = {
  setShowBottomNav: PropTypes.func
}

export default Router;
