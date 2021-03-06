import React from "react";
import PropTypes from "prop-types";
import RecipeItem from "./RecipeItem";

const Home = ({ recipes = [], searchString = "" }) => (
  <div className="row">
    {recipes.map((recipe, index) => (
      <RecipeItem key={index} recipe={recipe} />
    ))}
  </div>
);

Home.propTypes = {
  searchString: PropTypes.string,
  recipes: PropTypes.array
};

export default Home;
