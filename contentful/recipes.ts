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

// A function to fetch a single blog post by its slug.
// Optionally uses the Contentful content preview.
// interface FetchBlogPostOptions {
// 	slug: string
// 	preview: boolean
// }
// export async function fetchBlogPost({ slug, preview }: FetchBlogPostOptions): Promise<BlogPost | null> {
// 	const contentful = contentfulClient({ preview })

// 	const blogPostsResult = await contentful.getEntries<Any>({
// 		content_type: 'blogPost',
// 		'fields.slug': slug,
// 		include: 2,
// 	})

// 	return parseContentfulBlogPost(blogPostsResult.items[0])
// }