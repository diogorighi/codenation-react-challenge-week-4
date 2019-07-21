import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogged } from "../services/loginService";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogged() ? <Component {...props} /> : <Redirect to="/user/login" />
      }
    />
  );
};

export default PrivateRoute;
