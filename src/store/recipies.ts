import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios from "axios";

import { RECIPES_URL } from "@constants/app";
import { IRecipe } from "@constants/recipe";

interface RecipesState {
  recipes: IRecipe[];
  checkedRecipes: number[];
  startIndex: number;
  nextPage: number;
  loading: boolean;
  error: string;
  getRecipes: (pageNumber: number) => void;
  toggleRecipes: (recipeId: number) => void;
  removeAllCheckedRecipes: () => void;
  setStartIndex: (index: number) => void;
}

export const useRecipes = create<RecipesState>()(
  devtools((set, get) => ({
    recipes: [],
    checkedRecipes: [],
    startIndex: 0,
    nextPage: 1,
    loading: false,
    error: "",
    getRecipes: async (pageNumber: number) => {
      try {
        set({ loading: true });
        const response = await axios.get(RECIPES_URL, {
          params: { page: pageNumber },
        });
        if (response.data.length) {
          set((state) => ({
            recipes: [...state.recipes, ...response.data],
          }));
        } else {
          set({ error: "There are no more recipes" });
        }
      } catch (error) {
        set({ error: `Error fetching recipes: ${error}` });
      } finally {
        set({ loading: false });
      }
    },
    toggleRecipes: (recipeId: number) => {
      const checkedRecipes = [...get().checkedRecipes];
      const isIdInCheckckedRecipes = checkedRecipes.find(
        (id) => id === recipeId
      );
      const newCheckedRecipes = isIdInCheckckedRecipes
        ? checkedRecipes.filter((id) => id !== recipeId)
        : [...checkedRecipes, recipeId];
      set({ checkedRecipes: newCheckedRecipes });
    },
    removeAllCheckedRecipes: () =>
      set((state) => {
        const newRecipes = [...state.recipes].filter(
          (recipe) => !state.checkedRecipes.includes(recipe.id)
        );
        const newStartIndex = state.startIndex - state.checkedRecipes.length;
        return {
          recipes: newRecipes,
          checkedRecipes: [],
          startIndex: newStartIndex >= 0 ? newStartIndex : 0,
        };
      }),
    setStartIndex: (index: number) => set({ startIndex: index }),
  }))
);
