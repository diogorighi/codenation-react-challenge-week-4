import React, { Component } from "react";
import { Route } from "react-router-dom";
import NotLoggedRoute from "../utils/NotLoggedRoute";
import PrivateRoute from "../utils/PrivateRoute";
import Navbar from "./Navbar";
import Home from "./Home";
import RecipePage from "./RecipePage";
import Login from "./Login";
import User from "./User";
import { slugify } from "../helpers";
import recipes from "../sample_data/recipes.json";

const HomeRoute = ({ match }) => (
  <Home recipes={recipes.results} searchString="" />
);
const LoginRoute = props => <Login {...props} />;
const ProfileRoute = props => <User {...props} />;
const RecipePageRoute = ({ match }) => {
  const recipe = recipes.results.find(
    recipe => slugify(recipe.title) === match.params.recipeSlug
  );
  return <RecipePage recipe={recipe} />;
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar searchString="" />

        <div className="container mt-10">
          <Route path="/recipe/:recipeSlug" component={RecipePageRoute} />
          <NotLoggedRoute path="/user/login" component={LoginRoute} />
          <PrivateRoute path="/user/profile" component={ProfileRoute} />
          <Route exact path="/" component={HomeRoute} />
        </div>
      </div>
    );
  }
}

export default App;
