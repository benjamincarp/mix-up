import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeCategoryFields {
    name: EntryFieldTypes.Symbol;
    drinks?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeRecipeSkeleton>>;
}

export type TypeCategorySkeleton = EntrySkeletonType<TypeCategoryFields, "category">;
export type TypeCategory<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeCategorySkeleton, Modifiers, Locales>;

export interface TypeRecipeFields {
    name: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Symbol;
    ingredients: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    garnish?: EntryFieldTypes.Symbol;
    instructions?: EntryFieldTypes.RichText;
}

export type TypeRecipeSkeleton = EntrySkeletonType<TypeRecipeFields, "recipe">;
export type TypeRecipe<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeRecipeSkeleton, Modifiers, Locales>;