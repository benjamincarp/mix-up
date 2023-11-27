import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchTaggedRecipes } from '../../../contentful/recipes'
import { fetchTags, getTagName } from '@/contentful/tags'
import { draftMode } from 'next/headers'
import RecipeList from '@/components/RecipeList'

interface TagPageParams {
	tag: string
}

interface TagPageProps {
	params: TagPageParams
}

// Tell Next.js about all our blog posts so
// they can be statically generated at build time.
export async function generateStaticParams(): Promise<TagPageParams[]> {
	const tags = await fetchTags()

	return tags.map((tag) => { return { tag: tag.id }})
}

export async function generateMetadata({ params }: TagPageProps, parent: ResolvingMetadata): Promise<Metadata> {
	let tagName =await getTagName(params.tag)
  return {title: `${tagName} List`}
}

// The actual TagPage component.
async function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag)
	const recipeList = await fetchTaggedRecipes({ preview: draftMode().isEnabled, tag: tag });

  if (recipeList.length < 1) {return notFound()}
  let tagName =await getTagName(params.tag)

  return (
    <RecipeList title={tagName} recipeList={recipeList} /> 
  )
}

export default TagPage
