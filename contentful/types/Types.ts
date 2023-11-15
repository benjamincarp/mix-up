import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeMenuFields {
    name: EntryFieldTypes.Symbol;
    active?: EntryFieldTypes.Boolean;
    sections: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeSectionSkeleton>>;
}

export type TypeMenuSkeleton = EntrySkeletonType<TypeMenuFields, "menu">;
export type TypeMenu<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeMenuSkeleton, Modifiers, Locales>;

export interface TypeRecipeFields {
    name: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Symbol;
    ingredients: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    garnish?: EntryFieldTypes.Symbol;
    instructions?: EntryFieldTypes.RichText;
}

export type TypeRecipeSkeleton = EntrySkeletonType<TypeRecipeFields, "recipe">;
export type TypeRecipe<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeRecipeSkeleton, Modifiers, Locales>;

export interface TypeSectionFields {
    name: EntryFieldTypes.Symbol;
    drinks?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeRecipeSkeleton>>;
}

export type TypeSectionSkeleton = EntrySkeletonType<TypeSectionFields, "section">;
export type TypeSection<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeSectionSkeleton, Modifiers, Locales>;