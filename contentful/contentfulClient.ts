import { createClient } from 'contentful'
// const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_PREVIEW_ACCESS_TOKEN } = process.env
const CONTENTFUL_SPACE_ID = 'ff4m1egimr2c';
const CONTENTFUL_ACCESS_TOKEN = 'wXeqnxscFAAw1i9jYED264zTUel8ImOS7bA1VJti7K8';
const CONTENTFUL_PREVIEW_ACCESS_TOKEN = '8-n53Eevy76KxWcjBLoYnZX_jl5U1S1D5X1ZjM3P8GU';

console.log(`space = ${CONTENTFUL_SPACE_ID}`);

// This is the standard Contentful client. It fetches
// content that has been published.
const client = createClient({
	space: CONTENTFUL_SPACE_ID!,
	accessToken: CONTENTFUL_ACCESS_TOKEN!,
})

// This is a Contentful client that's been configured
// to fetch drafts and unpublished content.
const previewClient = createClient({
	space: CONTENTFUL_SPACE_ID!,
	accessToken: CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
	host: 'preview.contentful.com',
})

// This little helper will let us switch between the two
// clients easily:
export default function contentfulClient({ preview = false }) {
	if (preview) {
		return previewClient
	}

	return client
}