import { useLocation } from "react-router-dom";

import "./Header.scss";
import { useRecipes } from "@store/recipies";

function Header() {
  const location = useLocation();
  const showRemoveBtn = useRecipes((state) => state.checkedRecipes.length);
  const removeAllCheckedRecipes = useRecipes(
    (state) => state.removeAllCheckedRecipes
  );

  const handleRemove = () => {
    removeAllCheckedRecipes();
  };

  return (
    <header className="header">
      <h1>Recipes App</h1>
      {showRemoveBtn && location.pathname === "/" ? (
        <button
          className="header__button_remove"
          onClick={handleRemove}
        >
          Remove all checked
        </button>
      ) : null}
    </header>
  );
}

export default Header;
