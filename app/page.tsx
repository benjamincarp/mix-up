import { draftMode } from 'next/headers'
import { fetchRecipes } from '../contentful/recipes'
import RecipeList from './components/RecipeList';

export default async function Home() {
  const recipeList = await fetchRecipes({ preview: draftMode().isEnabled });

  return (
    <RecipeList title='House Specialties' recipeList={recipeList} />
  )
}