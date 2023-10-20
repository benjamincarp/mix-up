import Image from 'next/image'
import { draftMode } from 'next/headers'
import { fetchRecipes } from '../contentful/recipes'

  export default async function Home() {
    const recipeList = await fetchRecipes({ preview: draftMode().isEnabled });

    console.log(recipeList);
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>
          MixUp
        </h1>
      </main>  
    )
  }