import z, { object, string } from 'zod'
import { user_uuid, id } from '@/schemas/common'

const name = string().min(1).max(200)

export const userIngredientSchema = object({ id, name, user_uuid })
export type UserIngredientSchema = z.infer<typeof userIngredientSchema>

export type GetUserIngredientSchema = Omit<UserIngredientSchema, 'user_uuid'>

export const createUserIngredientSchema = object({ name })
export type CreateUserIngredientSchema = z.infer<typeof createUserIngredientSchema>

export const deleteUserIngredientSchema = object({ id })
export type DeleteUserIngredientSchema = z.infer<typeof deleteUserIngredientSchema>