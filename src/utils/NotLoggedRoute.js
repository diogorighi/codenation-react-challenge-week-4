import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogged } from "../services/loginService";

const NotLoggedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogged() ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default NotLoggedRoute;
