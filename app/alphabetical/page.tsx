import { draftMode } from "next/headers";
import { fetchRecipes, recipeSort } from "../../contentful/recipes";
import RecipeList from "../../components/RecipeList";

export default async function Alphabetical() {
  const recipeList = await fetchRecipes({ preview: draftMode().isEnabled, order: recipeSort.name });
  console.log(recipeList)

  return <RecipeList title="All by Name" recipeList={recipeList} />;
}
