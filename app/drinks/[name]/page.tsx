import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchRecipes, fetchSingleRecipe } from '../../../contentful/recipes'
import { draftMode } from 'next/headers'
import RichText from '../../../contentful/RichText'
import ContentCard from '@/app/components/ContentCard'
import Separator from '@/app/components/Separator'


interface RecepePageParams {
	name: string
}

interface RecipePageProps {
	params: RecepePageParams
}

// Tell Next.js about all our blog posts so
// they can be statically generated at build time.
export async function generateStaticParams(): Promise<RecepePageParams[]> {
	const recipes = await fetchRecipes({ preview: false })

	return recipes.map((recipe) => ({ name: recipe.name }))
}

export async function generateMetadata({ params }: RecipePageProps, parent: ResolvingMetadata): Promise<Metadata> {
	const recipe = await fetchSingleRecipe({ name: params.name, preview: draftMode().isEnabled })

	if (!recipe) {
		return notFound()
	}

	return {
		title: `Mixing a ${recipe.name?.toString()}`,
	}
}

// The actual RecipePage component.
async function RecipePage({ params }: RecipePageProps) {
	// Fetch a single blog post by slug,
	// using the content preview if draft mode is enabled:
	const recipe = await fetchSingleRecipe({ name: params.name, preview: draftMode().isEnabled })

	if (!recipe) {
		// If a blog post can't be found,
		// tell Next.js to render a 404 page.
		return notFound()
	}

	return (
		<main>
			<ContentCard titleText={recipe.name}>
				<span className='italic text-sm'>
					Ingredients:
				</span>
				<ul className='mb-3 mt-1.5'>
					{recipe.ingredients.map((ingredient,i) => {
						return (<li key={i}>{ingredient}</li>)
					})}
				</ul>
				<Separator />
				<div className='mt-3'>
					<RichText document={recipe.instructions} />
				</div>
			</ContentCard>
		</main>
	)
}

export default RecipePage