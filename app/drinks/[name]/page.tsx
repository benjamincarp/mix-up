import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchSingleRecipe } from '../../../contentful/recipes'

interface RecepePageParams {
	name: string
}

interface RecipePageProps {
	params: RecepePageParams
}

// Tell Next.js about all our blog posts so
// they can be statically generated at build time.
// export async function generateStaticParams(): Promise<RecepePageParams[]> {
// 	const recipes = await fetchRecipes({ preview: false })

// 	return recipes.map((recipe) => ({ slug: recipe.sys.id }))
// }

export async function generateMetadata({ params }: RecipePageProps, parent: ResolvingMetadata): Promise<Metadata> {
	const recipe = await fetchSingleRecipe({ name: params.name, preview: false })

	if (!recipe) {
		return notFound()
	}

	return {
		title: `Mixing a ${recipe.fields.name?.toString()}`,
	}
}

// The actual RecipePage component.
async function RecipePage({ params }: RecipePageProps) {
	// Fetch a single blog post by slug,
	// using the content preview if draft mode is enabled:
	const recipe = await fetchSingleRecipe({ name: params.name, preview: false })

	if (!recipe) {
		// If a blog post can't be found,
		// tell Next.js to render a 404 page.
		return notFound()
	}

	return (
		<main className="p-[6vw]">
			{recipe.fields.name?.toString()}
		</main>
	)
}

export default RecipePage