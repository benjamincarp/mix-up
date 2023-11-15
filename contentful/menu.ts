import { Entry } from 'contentful'
import contentfulClient from './contentfulClient'
import { TypeMenuSkeleton, TypeSectionSkeleton } from './types/Types'
import { Recipe, RecipeEntry, parseContentfulRecipe } from './recipes'

export interface Section {
	id: string,
	name: string,
	drinks: Recipe[]
}

type SectionEntry = Entry<TypeSectionSkeleton, undefined, string> 

function parseContentfulSection(sectionEntry: SectionEntry): Section{
	const drinks = sectionEntry.fields.drinks
	return {
		id: sectionEntry.sys.id,
		name: sectionEntry.fields.name,
		drinks: drinks && drinks.length ? drinks.map(drink => drink as RecipeEntry).map(parseContentfulRecipe) : <Recipe[]>[]
	}
}
export async function fetchSections(): Promise<Section[]> {
	const contentful = contentfulClient({preview: false})


	const catResults = await contentful.getEntries<TypeSectionSkeleton>({
		content_type: 'section'
	})

	if (catResults.items.length < 1) return <Section[]>[];
	return catResults.items.map(parseContentfulSection);
}

export interface Menu {
	id: string,
	name: string,
    active: boolean,
	sections: Section[]
}

type MenuEntry = Entry<TypeMenuSkeleton, undefined, string> 

function parseContentfulMenu(menuEntry: MenuEntry): Menu{
	const sections = menuEntry.fields.sections

	return {
		id: menuEntry.sys.id,
		name: menuEntry.fields.name,
        active: (menuEntry.fields.active == true),
		sections: sections && sections.length ? sections.map(section => section as SectionEntry).map(parseContentfulSection) : <Section[]>[]
	}
}
export async function fetchActiveMenu(): Promise<Menu | null> {
	const contentful = contentfulClient({preview: false})


	const menuResults = await contentful.getEntries<TypeMenuSkeleton>({
		content_type: 'menu',
        "fields.active": true,
        include: 2
	})

	if (menuResults.items.length < 1) return null;
	return parseContentfulMenu(menuResults.items[0]);
}