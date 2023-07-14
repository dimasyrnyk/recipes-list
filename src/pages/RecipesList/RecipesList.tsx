import { useCallback, useEffect, useRef, useState } from "react";

import "./RecipesList.scss";
import { useRecipes } from "@store/recipies";
import {
  RENDER_RECIPES_COUNT,
  START_PAGE,
  VISIBLE_RECIPES_COUNT,
} from "@constants/recipe";
import RecipeItem from "@components/RecipeItem/RecipeItem";

function RecipesList() {
  const [pageNumber, setPageNumber] = useState<number>(START_PAGE);
  const loading = useRecipes((state) => state.loading);
  const recipes = useRecipes((state) => state.recipes);
  const startIndex = useRecipes((state) => state.startIndex);
  const getRecipes = useRecipes((state) => state.getRecipes);
  const setStartIndex = useRecipes((state) => state.setStartIndex);

  const visibleRecipes = recipes.slice(
    startIndex,
    startIndex + RENDER_RECIPES_COUNT
  );
  const hasLoadMore = recipes.length <= startIndex + RENDER_RECIPES_COUNT;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastRecipeElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    getRecipes(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    if (containerRef.current && startIndex) {
      containerRef.current.scrollTop = containerRef.current.clientHeight;
    }
  }, [visibleRecipes]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (!scrollTop && startIndex) {
      setStartIndex(startIndex - VISIBLE_RECIPES_COUNT);
    }
    if (scrollTop + clientHeight === scrollHeight && !hasLoadMore) {
      setStartIndex(startIndex + VISIBLE_RECIPES_COUNT);
    }
  };

  if (!visibleRecipes.length) {
    return <center className="recipes-list">No recipes...</center>;
  }

  return (
    <div
      ref={containerRef}
      className="recipes-list"
      onScroll={handleScroll}
    >
      <ul>
        {visibleRecipes.map((recipe) =>
          hasLoadMore ? (
            <RecipeItem
              innerRef={lastRecipeElementRef}
              key={recipe.id}
              recipe={recipe}
            />
          ) : (
            <RecipeItem
              key={recipe.id}
              recipe={recipe}
            />
          )
        )}
      </ul>
    </div>
  );
}

export default RecipesList;
