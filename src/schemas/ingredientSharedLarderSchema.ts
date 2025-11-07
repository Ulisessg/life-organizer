import z from 'zod'
import { id } from './common'

const quantity = z.number().positive().min(0.1)
const expiration_date = z.iso.date().optional()

export const ingredientSharedLarderSchema = z.object({
  id,
  shared_ingredient_id: id,
  unit_of_measure_id: id,
  quantity,
  expiration_date
})
export type IngredientSharedLarderSchema = z.infer<typeof ingredientSharedLarderSchema>

export const getIngredientSharedLarderSchema = z.object({
  ...ingredientSharedLarderSchema.shape,
  name: z.string().min(1).max(200)
})
export type GetIngredientSharedLarderSchema = z.infer<typeof getIngredientSharedLarderSchema>

export const createIngredientSharedLarderSchema = z.object({
  shared_ingredient_id: id,
  unit_of_measure_id: id,
  quantity,
  expiration_date
})
export type CreateIngredientSharedLarderSchema = z.infer<typeof createIngredientSharedLarderSchema>

export const deleteIngredientSharedLarderSchema = z.object({
  id
})
export type DeleteIngredientSharedLarderSchema = z.infer<typeof deleteIngredientSharedLarderSchema>

export const updateIngredientSharedLarderSchema = z.object({
  id,
  unit_of_measure_id: id,
  quantity,
  expiration_date
})
export type UpdateIngredientSharedLarderSchema = z.infer<typeof updateIngredientSharedLarderSchema>