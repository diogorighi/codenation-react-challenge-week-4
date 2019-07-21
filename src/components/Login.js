import React, { Component } from "react";
import { register, login } from "../services/loginService";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRegisterButtonClick = () => {
    const { username, password } = this.state;
    try {
      const newUser = {
        username,
        password
      };
      const createdUser = register(newUser);
      if (createdUser) {
        this.logUser(createdUser);
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  handleLoginButtonClick = () => {
    const { username, password } = this.state;

    try {
      const user = {
        username,
        password
      };
      this.logUser(user);
    } catch (error) {
      window.alert(error.message);
    }
  };

  logUser(user) {
    const successOnLogin = login(user);
    if (successOnLogin) {
      this.props.history.push("/");
    }
  }

  render = () => (
    <form className="form-signin" onSubmit={e => e.preventDefault()}>
      <div className="text-center mb-4">
        <h1 className="h3 mb-3 font-weight-normal">Login / Register</h1>
      </div>

      <div className="form-label-group">
        <label htmlFor="inputEmail">Username</label>
        <input
          name="username"
          onChange={this.handleInputChange}
          value={this.state.username}
          className="form-control"
          placeholder="Username"
          required
        />
      </div>

      <div className="form-label-group mt-2">
        <label htmlFor="inputPassword">Password</label>
        <input
          name="password"
          onChange={this.handleInputChange}
          value={this.state.password}
          type="password"
          className="form-control"
          placeholder="Password"
          required
        />
      </div>

      <div className="mt-5">
        <button
          className="login btn btn-lg btn-primary btn-block"
          type="submit"
          onClick={this.handleLoginButtonClick}
        >
          Login
        </button>
        <button
          className="register btn btn-lg btn-secondary btn-block"
          type="submit"
          onClick={this.handleRegisterButtonClick}
        >
          Register
        </button>
      </div>
    </form>
  );
}

export default Login;
