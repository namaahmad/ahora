import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Loader from './components/Widget/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// context
const loading = () => <Loader />;

const Layout = React.lazy(() => import('./components/Layout/Layout'));
const Error = React.lazy(() => import('./pages/error/Error'));
export default function App() {
  // global
 
 
  useEffect(function () {
    
  }, []);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/app/factor" />} />
          <Route
            exact
            path="/app"
            render={() => <Redirect to="/app/factor" />}
          />
          <Route path="/app" component={Layout} />
          <Route component={Error} />
        </Switch>
      </React.Suspense>
      <ToastContainer />
    </BrowserRouter>
  );

}
