import { Entry } from 'contentful'
import { Document as RichTextDocument } from '@contentful/rich-text-types'
import contentfulClient from './contentfulClient'
import { TypeRecipeSkeleton } from './types/TypeRecipe'

// A function to fetch all blog posts.
// Optionally uses the Contentful content preview.
interface FetchRecipesOptions {
	preview: boolean
}
export interface Recipe {
	id: string,
	name: string,
	ingredients: string[],
	instructions: RichTextDocument | null,
	tags: string[]
}

type RecipeEntry = Entry<TypeRecipeSkeleton, undefined, string> 

function parseContentfulRecipe(recipeEntry: RecipeEntry): Recipe{
	return {
		id: recipeEntry.sys.id,
		name: recipeEntry.fields.name,
		ingredients: recipeEntry.fields.ingredients,
		instructions: recipeEntry.fields.instructions? recipeEntry.fields.instructions : null,
		tags: recipeEntry.fields.tags ? recipeEntry.fields.tags : []
	}
}


export async function fetchRecipes({ preview }: FetchRecipesOptions): Promise<Recipe[]> {
	const contentful = contentfulClient({ preview })

	const recipesResults = await contentful.getEntries<TypeRecipeSkeleton>({
		content_type: 'recipe'
	})

	if (recipesResults.items.length < 1) return <Recipe[]>[];
	return recipesResults.items.map(parseContentfulRecipe);
}

// A function to fetch a single cocktail by its slug.
// Optionally uses the Contentful content preview.
interface FetchSingleRecipeOptions {
	name: string
	preview: boolean
}
export async function fetchSingleRecipe({ name, preview }: FetchSingleRecipeOptions): Promise<Recipe | null> {
	const contentful = contentfulClient({ preview })

	const recipesResults = await contentful.getEntries<TypeRecipeSkeleton>({
		content_type: 'recipe',
		'fields.name': name,
		include: 2
	});

	if (recipesResults.items.length < 1) return null;
	return parseContentfulRecipe(recipesResults.items[0]);
}


