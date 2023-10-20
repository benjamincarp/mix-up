import { TypeRecipeFields } from './types'
import { Entry } from 'contentful'
import { Document as RichTextDocument } from '@contentful/rich-text-types'
import contentfulClient from './contentfulClient'

// A function to fetch all blog posts.
// Optionally uses the Contentful content preview.
interface FetchRecipesOptions {
	preview: boolean
}

export async function fetchRecipes({ preview }: FetchRecipesOptions): Promise<Entry[]> {
	const contentful = contentfulClient({ preview })

	const blogPostsResult = await contentful.getEntries<TypeRecipeFields>({
		content_type: 'recipe'
	})

	return blogPostsResult.items;
}

// A function to fetch a single cocktail by its slug.
// Optionally uses the Contentful content preview.
interface FetchSingleRecipeOptions {
	slug: string
	preview: boolean
}
export async function fetchSingleRecipe({ slug, preview }: FetchSingleRecipeOptions): Promise<Entry | null> {
	const contentful = contentfulClient({ preview })

	const recipesResult = await contentful.getEntries<TypeRecipeFields>({
		content_type: 'recipe',
		'sys.id': slug,
		include: 2,
	})

	return recipesResult.items[0];
}