export const RECIPES_URL = "https://api.punkapi.com/v2/beers";

export interface IAlert {
  text: string;
  isError?: boolean;
}

export enum AlertColor {
  RED = "red",
  GREEN = "green",
}

export enum AppRoutes {
  RECIPES_LIST = "/",
  RECIPE_ITEM = "/recipes/:id",
}
