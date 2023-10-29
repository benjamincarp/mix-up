import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchTaggedRecipes } from '../../../contentful/recipes'
import { draftMode } from 'next/headers'
import RecipeList from '@/components/RecipeList'

interface TagPageParams {
	tag: string
}

interface TagPageProps {
	params: TagPageParams
}

export async function generateMetadata({ params }: TagPageProps, parent: ResolvingMetadata): Promise<Metadata> {
	return {title: `${decodeURIComponent(params.tag?.toString())} List`.toUpperCase()}
}

// The actual TagPage component.
async function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag)
	const recipeList = await fetchTaggedRecipes({ preview: draftMode().isEnabled, tag: tag });

  if (recipeList.length < 1) {return notFound()}

  return (
    <RecipeList title={params.tag} recipeList={recipeList} /> 
  )
}

export default TagPage
