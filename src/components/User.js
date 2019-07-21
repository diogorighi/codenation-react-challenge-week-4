import React from "react";
import { logout } from "../services/loginService";

const User = ({ history }) => (
  <button
    className="btn"
    onClick={() => {
      logout();
      history.push("/");
    }}
  >
    Logout
  </button>
);

export default User;
