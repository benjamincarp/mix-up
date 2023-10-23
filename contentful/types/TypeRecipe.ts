import type { Entry, EntryFields } from "contentful";

export interface TypeRecipeFields {
    contentTypeId: 'recipe',
    fields: {
        name: EntryFields.Text;
        ingredients: EntryFields.Text[];
        instructions?: EntryFields.RichText;
        tags?: EntryFields.Text[];
    }
}

export type TypeRecipe = Entry<TypeRecipeFields>;
