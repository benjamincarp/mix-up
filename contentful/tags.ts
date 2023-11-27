import contentfulClient from './contentfulClient';

type Tag = {
	id: string,
	name: string
}

let tags: Tag[] = [];


export async function fetchTags(): Promise<Tag[]> {
	const contentful = contentfulClient({ preview: false });
	const results = await contentful.getTags();

	tags = results.items.map(tag => {return { id: tag.sys.id, name: tag.name}});

	return tags;
}

export async function getTagName(id: string): Promise<string> {
	if (tags.length<1) {await fetchTags()}

	let match = tags.find((tag)=> { return (tag.id == id)})
	if (match) {
		return match.name
	}
	return ""
}