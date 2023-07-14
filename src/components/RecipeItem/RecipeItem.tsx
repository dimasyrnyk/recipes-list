import React from "react";
import { Link } from "react-router-dom";

import "./RecipeItem.scss";
import { useRecipes } from "@store/recipies";
import { IRecipe } from "@constants/recipe";

type Props = {
  recipe: IRecipe;
  innerRef?: (node: HTMLElement | null) => void;
};

function RecipeItem({ recipe, innerRef }: Props) {
  const toggleRecipes = useRecipes((state) => state.toggleRecipes);
  const isChecked = !!useRecipes((state) =>
    state.checkedRecipes.find((id) => id === recipe.id)
  );
  const classes = isChecked ? " checked" : "";

  const toggleComplete = () => {
    toggleRecipes(recipe.id);
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    toggleRecipes(recipe.id);
    e.preventDefault();
  };

  return (
    <li
      ref={innerRef}
      className={"recipe-item" + classes}
      onContextMenu={handleContextMenu}
    >
      <label className="recipe-item__checkbox_label">
        <input
          className="recipe-item__checkbox"
          aria-label="an appropriate label"
          type="checkbox"
          checked={isChecked}
          onChange={toggleComplete}
        />
      </label>
      <div className="recipe-item__container">
        <h3 className={"recipe-item__title" + classes}>
          <Link
            className="recipe-item__link"
            to={"/recipes/" + recipe.id}
          >
            {recipe?.name}
          </Link>
        </h3>
        <span>{recipe?.tagline}</span>
      </div>
    </li>
  );
}

export default RecipeItem;
