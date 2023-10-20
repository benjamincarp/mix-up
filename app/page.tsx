import Link from 'next/link'
import { draftMode } from 'next/headers'
import { fetchRecipes } from '../contentful/recipes'

  export default async function Home() {
    const recipeList = await fetchRecipes({ preview: draftMode().isEnabled });

    console.log(recipeList);
    return (
      <main className="items-center justify-between p-24">
        <h1>
          MixUp
        </h1>
        <ul>
          {recipeList.map((recipe) => {
            const slug = recipe.sys.id;
            return (
              <li key={slug}>
                <Link href={`/${slug}`}>{recipe.fields.name?.toString() || ''}</Link>
              </li>
            )
          })}
        </ul>
      </main>  
    )
  }