import Link from 'next/link'
import { draftMode } from 'next/headers'
import { fetchRecipes } from '../contentful/recipes'
import ContentCard from './components/ContentCard';
import Separator from './components/Separator';

export default async function Home() {
  const recipeList = await fetchRecipes({ preview: draftMode().isEnabled });

  return (
    <ContentCard titleText='House Specialties'>
      {recipeList.map((recipe, index) => {
        const name = recipe.name.toString();
        return (
          <div key={name}>
            {(index>0)? <Separator/> : null}
            <Link href={`drinks/${name}`} className='underline'>
              {name.toUpperCase()}
            </Link>
            <div className='text-center'>
            {recipe.description}
            </div>
          </div>
        )
      })}
    </ContentCard>  
  )
}