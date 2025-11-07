import z from "zod";
import { id } from "./common";

const quantity = z.number().positive().min(0.1)
const expiration_date = z.iso.date().optional()

export const ingredientInUserLarderSchema = z.object({
  id,
  user_ingredient_id: id,
  unit_of_measure_id: id,
  quantity,
  expiration_date
})
export type IngredientInUserLarderSchema = z.infer<typeof ingredientInUserLarderSchema>

export const getIngredientInUserLarderSchema = z.object({
  ...ingredientInUserLarderSchema.shape,
  name: z.string().min(1).max(200)
})
export type GetIngredientInUserLarderSchema = z.infer<typeof getIngredientInUserLarderSchema>

export const addIngredientInUserLarderSchema = z.object({
  user_ingredient_id: id,
  unit_of_measure_id: id,
  quantity: z.number().positive().min(0.1),
  expiration_date: z.iso.date().optional()
})
export type AddIngredientInUserLarderSchema = z.infer<typeof addIngredientInUserLarderSchema>

export const deleteIngredientInUserLarderSchema = z.object({ id })
export type DeleteIngredientInUserLarderSchema = z.infer<typeof deleteIngredientInUserLarderSchema>

export const updateIngredientUserLarderSchema = z.object({
  id,
  unit_of_measure_id: id,
  quantity,
  expiration_date
})
export type UpdateIngredientUserLarderSchema = z.infer<typeof updateIngredientUserLarderSchema>
