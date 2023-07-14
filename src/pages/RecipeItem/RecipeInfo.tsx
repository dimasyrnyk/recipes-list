import { Link, useParams } from "react-router-dom";

import "./RecipeInfo.scss";
import { useRecipes } from "@store/recipies";
import { IRecipe } from "@constants/recipe";

function RecipeInfo() {
  const { id } = useParams();
  const recipe = useRecipes((state) =>
    state.recipes.find((recipe: IRecipe) => recipe.id === +id!)
  );

  return (
    <div className="recipe-info">
      <h2 className="recipe-info__title">{recipe?.name}</h2>
      <p className="recipe-info__paragraph">
        <strong>Tagline:</strong> {recipe?.tagline}
      </p>
      <p className="recipe-info__paragraph">
        <strong>Description:</strong> {recipe?.description}
      </p>
      <p className="recipe-info__paragraph">
        <strong>Food pairing:</strong> {recipe?.food_pairing}
      </p>
      <Link
        className="recipe-info__link"
        to="/"
      >
        <h5>Back to list</h5>
      </Link>
    </div>
  );
}

export default RecipeInfo;
