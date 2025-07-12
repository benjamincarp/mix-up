import { draftMode } from "next/headers";
import { fetchRecipes, recipeSort } from "../../contentful/recipes";
import RecipeList from "../../components/RecipeList";

export default async function Alphabetical() {
  const recipeList = await fetchRecipes({ preview: (await draftMode()).isEnabled, order: recipeSort.name });
  return <RecipeList title="All by Name" recipeList={recipeList} />;
}
