import Link from 'next/link'
import { draftMode } from 'next/headers'
import { fetchRecipes } from '../contentful/recipes'

  export default async function Home() {
    const recipeList = await fetchRecipes({ preview: draftMode().isEnabled });

    return (
      <main className="items-center justify-between p-24">
        <h1>
          MixUp
        </h1>
        <ul>
          {recipeList.map((recipe) => {
            const name = recipe.fields.name?.toString();
            return (
              <li key={name}>
                <Link href={`drinks/${name}`}>{name}</Link>
              </li>
            )
          })}
        </ul>
      </main>  
    )
  }