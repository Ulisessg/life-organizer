import { ApiResponse } from '@/app/api/api'
import { CreateUserIngredientSchema, GetUserIngredientSchema } from '@/schemas/userIngredientSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const createUserIngredientThunk = createAsyncThunk<GetUserIngredientSchema, CreateUserIngredientSchema>('user_ingredients/post', async (userIngredient) => {
  const req = await fetch(`${window.location.href}api/user-ingredients`, {
    method: 'POST',
    body: JSON.stringify(userIngredient)
  })
  const res: ApiResponse<GetUserIngredientSchema> = await req.json()
  if (!req.ok) {
    throw res.message
  }
  return res.data
})