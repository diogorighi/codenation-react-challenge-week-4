import React from "react";
import { Link } from "react-router-dom";
import { slugify } from "../helpers";

const RecipeItem = ({ recipe }) => (
  <div className="col-sm-3 mt-4">
    <div className="card">
      <Link to={`/recipe/${slugify(recipe.title)}`}>
        <img
          className="card-img-top img-fluid"
          src={recipe.thumbnail}
          alt={recipe.title}
        />
        <div className="card-body">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text">
            <strong>Ingredients: </strong>
            {recipe.ingredient}
          </p>
        </div>
      </Link>
    </div>
  </div>
);

export default RecipeItem;
