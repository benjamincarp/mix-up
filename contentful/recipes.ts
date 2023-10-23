import { TypeRecipeFields } from './types'
import { Entry } from 'contentful'
import { Document as RichTextDocument } from '@contentful/rich-text-types'
import contentfulClient from './contentfulClient'

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

type RecipeEntry = Entry<TypeRecipeFields, undefined, string>

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

	const blogPostsResult = await contentful.getEntries<TypeRecipeFields>({
		content_type: 'recipe'
	})

	return blogPostsResult.items.map(parseContentfulRecipe);
}

// A function to fetch a single cocktail by its slug.
// Optionally uses the Contentful content preview.
interface FetchSingleRecipeOptions {
	name: string
	preview: boolean
}
export async function fetchSingleRecipe({ name, preview }: FetchSingleRecipeOptions): Promise<Recipe | null> {
	const contentful = contentfulClient({ preview })

	const recipesResult = await contentful.getEntries<TypeRecipeFields>({
		content_type: 'recipe',
		// @ts-ignore
		'fields.name': name
	});

	return parseContentfulRecipe(recipesResult.items[0]);
}


