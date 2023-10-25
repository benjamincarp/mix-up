import Link from 'next/link'
import { draftMode } from 'next/headers'
import { fetchRecipes } from '../contentful/recipes'

export default async function Home() {
  const recipeList = await fetchRecipes({ preview: draftMode().isEnabled });

  return (
    <>
      <h1>
        MixUp
      </h1>
      <ul>
        {recipeList.map((recipe) => {
          const name = recipe.name.toString();
          return (
            <li key={name}>
              <Link href={`drinks/${name}`}>{name}</Link>
            </li>
          )
        })}
      </ul>
    </>  
  )
}