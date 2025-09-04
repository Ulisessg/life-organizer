import { GetUserIngredientSchema } from "@/schemas/userIngredientSchema";

export type UserIngredientState = Record<number, Omit<GetUserIngredientSchema, 'id'>>