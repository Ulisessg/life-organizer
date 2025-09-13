import { SharedIngredientsSchema } from "@/schemas/sharedIngredientsSchema";
import { GetUserIngredientSchema } from "@/schemas/userIngredientSchema";

export type UserIngredientState = Record<number, Omit<GetUserIngredientSchema, 'id'>>

export type SharedIngredientState = Record<number, Omit<SharedIngredientsSchema, 'id'>>