import { draftMode } from "next/headers";
import { Section, fetchSections } from "../contentful/menu";
import RecipeList from "../components/RecipeList";

export default async function Home() {
  const catList = await fetchSections();
  console.log('Categories')
  console.dir(catList)

  return catList.map((section:Section) => (<RecipeList key={section.id} title={section.name} recipeList={section.drinks} />))
}
