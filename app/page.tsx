import { draftMode } from "next/headers";
import { Menu, fetchActiveMenu, Section, fetchSections } from "../contentful/menu";
import RecipeList from "../components/RecipeList";

export default async function Home() {
  const menu = await fetchActiveMenu();
  return menu?.sections.map((section:Section) => (<RecipeList key={section.id} title={section.name} recipeList={section.drinks} />))
}
