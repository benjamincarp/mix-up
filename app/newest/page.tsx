import { draftMode } from "next/headers";
import { fetchRecipes, recipeSort } from "../../contentful/recipes";
import RecipeList from "../../components/RecipeList";

export default async function Newest() {
  const isDraft = (await draftMode()).isEnabled
  const recipeList = await fetchRecipes({ preview: isDraft, order: recipeSort.newest });
  return <RecipeList title="All Newest" recipeList={recipeList} />;
}
