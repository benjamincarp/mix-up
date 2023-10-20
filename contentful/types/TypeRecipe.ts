import type { Entry, EntryFields } from "contentful";

export interface TypeRecipeFields {
    name?: EntryFields.Symbol;
    ingredient: EntryFields.Symbol[];
    instructions?: EntryFields.RichText;
    tags?: EntryFields.Symbol[];
}

export type TypeRecipe = Entry<TypeRecipeFields>;
