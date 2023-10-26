import Link from 'next/link'
import { draftMode } from 'next/headers'
import { fetchRecipes } from '../contentful/recipes'
import ContentCard from './components/ContentCard';

export default async function Home() {
  const recipeList = await fetchRecipes({ preview: draftMode().isEnabled });

  return (
    <ContentCard titleText='House Specialties'>
      {recipeList.map((recipe) => {
        const name = recipe.name.toString();
        return (
          <div key={name}>
            <Link href={`drinks/${name}`} className='underline'>
              {name}
            </Link>
          </div>
        )
      })}
    </ContentCard>  
  )
}