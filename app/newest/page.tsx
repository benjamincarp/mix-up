import { draftMode } from "next/headers";
import { fetchRecipes, recipeSort } from "../../contentful/recipes";
import RecipeList from "../../components/RecipeList";

export default async function Newest() {
  const recipeList = await fetchRecipes({ preview: draftMode().isEnabled, order: recipeSort.newest });
  return <RecipeList title="All Newest" recipeList={recipeList} />;
}
