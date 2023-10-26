import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchTaggedRecipes } from '../../../contentful/recipes'
import { draftMode } from 'next/headers'
import ContentCard from '@/app/components/ContentCard'
import Link from 'next/link'


interface TagPageParams {
	tag: string
}

interface TagPageProps {
	params: TagPageParams
}

export async function generateMetadata({ params }: TagPageProps, parent: ResolvingMetadata): Promise<Metadata> {
	return {
		title: `${params.tag?.toString()} List`.toUpperCase()
}
}

// The actual TagPage component.
async function TagPage({ params }: TagPageProps) {
	const recipeList = await fetchTaggedRecipes({ preview: draftMode().isEnabled, tag: params.tag.toLowerCase() });

  if (recipeList.length < 1) {return notFound()}

  return (
    <ContentCard titleText={params.tag}>
      {recipeList.map((recipe) => {
        const name = recipe.name.toString();
        return (
          <div key={name}>
            <Link href={`/drinks/${name}`} className='underline'>
              {name}
            </Link>
          </div>
        )
      })}
    </ContentCard>  
  )
}

export default TagPage
