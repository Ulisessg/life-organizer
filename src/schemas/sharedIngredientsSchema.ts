import z, { object, string } from 'zod'
import { id } from '@/schemas/common'

const name = string().min(1).max(200)


export const sharedIngredientsSchema = object({ id, name })
export type SharedIngredientsSchema = z.infer<typeof sharedIngredientsSchema>

export type GetSharedIngredientsSchema = z.infer<typeof sharedIngredientsSchema>

export const createSharedIngredientSchema = object({ name })
export type CreateSharedIngredientSchema = z.infer<typeof createSharedIngredientSchema>

export const deleteSharedIngredientSchema = object({ id })
export type DeleteSharedIngredientSchema = z.infer<typeof deleteSharedIngredientSchema>