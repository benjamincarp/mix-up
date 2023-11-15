import { Entry, OrderFilterPaths, UnresolvedLink } from 'contentful'
import { Document as RichTextDocument } from '@contentful/rich-text-types'
import contentfulClient from './contentfulClient'
import { TypeSectionSkeleton, TypeRecipeSkeleton } from './types/Types'

// A function to fetch all blog posts.
// Optionally uses the Contentful content preview.
interface FetchRecipesOptions {
	preview: boolean,
	order: recipeSort
}

export enum recipeSort{
	'name' = 'fields.name',
	'newest' = '-sys.createdAt',
	'oldest' = 'sys.createdAt'
}
export interface Recipe {
	id: string,
	name: string,
	description: string | undefined,
	ingredients: string[],
	garnish: string | undefined,
	instructions: RichTextDocument | null,
	tags: string[]
}

export type RecipeEntry = Entry<TypeRecipeSkeleton, undefined, string> 

export function parseContentfulRecipe(recipeEntry: RecipeEntry): Recipe{
	return {
		id: recipeEntry.sys.id,
		name: recipeEntry.fields.name,
		description: recipeEntry.fields.description,
		ingredients: recipeEntry.fields.ingredients,
		garnish: recipeEntry.fields.garnish,
		instructions: recipeEntry.fields.instructions? recipeEntry.fields.instructions : null,
		tags: recipeEntry.metadata.tags ? recipeEntry.metadata.tags.map((tag)=>tag.sys.id) : []
	}
}


export async function fetchRecipes({ preview, order }: FetchRecipesOptions): Promise<Recipe[]> {
	const contentful = contentfulClient({ preview })
	const recipesResults = await contentful.getEntries<TypeRecipeSkeleton>({
		content_type: 'recipe',
		order: [order]
	})

	if (recipesResults.items.length < 1) return <Recipe[]>[];
	return recipesResults.items.map(parseContentfulRecipe);
}

// A function to fetch a single cocktail by its name.
// Optionally uses the Contentful content preview.
interface FetchSingleRecipeOptions {
	name: string
	preview: boolean
}
export async function fetchSingleRecipe({ name, preview }: FetchSingleRecipeOptions): Promise<Recipe | null> {
	const contentful = contentfulClient({ preview })

	const recipesResults = await contentful.getEntries<TypeRecipeSkeleton>({
		content_type: 'recipe',
		'fields.name': name
	});

	if (recipesResults.items.length < 1) return null;
	return parseContentfulRecipe(recipesResults.items[0]);
}

// A function to fetch all recipes matching the passed tag.
// Optionally uses the Contentful content preview.
interface FetchTaggedRecipeOptions {
	tag: string
	preview: boolean
}
export async function fetchTaggedRecipes({ tag, preview }: FetchTaggedRecipeOptions): Promise<Recipe[]> {
	const contentful = contentfulClient({ preview })

	const recipesResults = await contentful.getEntries<TypeRecipeSkeleton>({
		content_type: 'recipe',
		'metadata.tags.sys.id[in]': [tag],
		order: ['fields.name']
	});

	if (recipesResults.items.length < 1) return <Recipe[]>[];
	return recipesResults.items.map(parseContentfulRecipe);
}

