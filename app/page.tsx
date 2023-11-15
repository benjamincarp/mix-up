import { draftMode } from "next/headers";
import { Category, fetchCatagories, fetchRecipes, recipeSort } from "../contentful/recipes";
import RecipeList from "../components/RecipeList";

export default async function Home() {
  const catList = await fetchCatagories();
  console.log('Categories')
  console.dir(catList)

  return catList.map((category:Category) => (<RecipeList key={category.id} title={category.name} recipeList={category.drinks} />))
}
