import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchRecipes, fetchSingleRecipe, recipeSort } from '../../../contentful/recipes'
import { draftMode } from 'next/headers'
import RichText from '../../../contentful/RichText'
import ContentCard from '@/components/ContentCard'
import Separator from '@/components/Separator'
import Link from 'next/link'
import { getTagName } from '@/contentful/tags'


interface RecepePageParams {
	name: string
}

interface RecipePageProps {
	params: RecepePageParams
}

// Tell Next.js about all our drink pages so
// they can be statically generated at build time.
export async function generateStaticParams(): Promise<RecepePageParams[]> {
	const recipes = await fetchRecipes({ preview: false, order: recipeSort.name })

	return recipes.map((recipe) => ({ name: recipe.name }))
}

export async function generateMetadata({ params }: RecipePageProps, parent: ResolvingMetadata): Promise<Metadata> {
	const recipe = await fetchSingleRecipe({ name: decodeURIComponent(params.name), preview: draftMode().isEnabled })

	if (!recipe) {
		return notFound()
	}

	return {
		title: `Mixing a ${recipe.name?.toString()}`,
	}
}

// The actual RecipePage component.
async function RecipePage({ params }: RecipePageProps) {
	const name = decodeURIComponent(params.name)
	const recipe = await fetchSingleRecipe({ name: name, preview: draftMode().isEnabled })

	if (!recipe) {
		return notFound()
	}

	return (
		<main>
			<ContentCard titleText={name}>
				<span className='italic text-sm'>
					Ingredients:
				</span>
				<ul className='mt-1.5'>
					{recipe.ingredients.map((ingredient,i) => {
						return (<li key={i}>{ingredient}</li>)
					})}
				</ul>
				{parseGarnish(recipe.garnish)}
				<Separator />
				<div>
					<RichText document={recipe.instructions} />
				</div>
				{ await parseTags(recipe.tags)}
			</ContentCard>
		</main>
	)
}

function parseGarnish(garnish? :string) {
	if (!garnish) return null;

	return (
		<div className='pt-3'>
			<div className='italic text-sm'>
				Garnish:
			</div>
			<div className='mt-1.5 pl-6'>
				{garnish}
			</div>
		</div>
	)
}

async function parseTags(tags? :string[]){
	if (!tags?.length || tags.length<1) return null;

	const tagLinks = tags.map(async (tag)=>{
		let name = await getTagName(tag)
		
		console.log(`tag name ${name}`)
		console.log(`tag id ${tag}`)

		return (<span key={tag} className=''>
				<Link href={`/tag/${encodeURIComponent(tag)}`} className='underline px-1 inline'>{name}</Link>
			</span>)
	})


	return (
		<>
			<Separator />
			<div className='flex flex-row'>
				<div className='italic text-sm flex-shrink'>
					Explore more like this:
				</div>
				<div className='flex flex-grow flex-wrap content-end justify-end'>
					{tagLinks}
				</div>
			</div>
		</>
	)
}

export default RecipePage