import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeRecipeFields {
    name: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Symbol;
    ingredients: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    garnish?: EntryFieldTypes.Symbol;
    instructions?: EntryFieldTypes.RichText;
}

export type TypeRecipeSkeleton = EntrySkeletonType<TypeRecipeFields, "recipe">;
export type TypeRecipe<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeRecipeSkeleton, Modifiers, Locales>;
