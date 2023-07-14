import { Route, Routes } from "react-router-dom";

import "./App.scss";
import { useRecipes } from "@store/recipies";
import { AppRoutes } from "./constants/app";
import RecipesList from "./pages/RecipesList/RecipesList";
import RecipeInfo from "./pages/RecipeItem/RecipeInfo";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Alert from "./components/Alert/Alert";
import { useEffect } from "react";
import { useApp } from "@store/app";

function App() {
  const appShowAlert = useApp((state) => state.appShowAlert);
  const error = useRecipes((state) => state.error);

  useEffect(() => {
    if (error) {
      appShowAlert({ text: error, isError: true });
    }
  }, [error]);

  return (
    <div className="app__container background text">
      <Alert />
      <Header />
      <main className="main__container">
        <Routes>
          <Route
            path={AppRoutes.RECIPES_LIST}
            element={<RecipesList />}
          />
          <Route
            path={AppRoutes.RECIPE_ITEM}
            element={<RecipeInfo />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
