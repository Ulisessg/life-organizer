import { ApiResponse } from '@/app/api/api'
import { GetUserIngredientSchema } from '@/schemas/userIngredientSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getUserIngredientThunk = createAsyncThunk<GetUserIngredientSchema[]>("user_ingredients/get", async () => {
  const request = await fetch(`${window.location.href}api/user-ingredients`)
  const res: ApiResponse<GetUserIngredientSchema[]> = await request.json()
  if (!request.ok) {
    throw res.message
  }
  return res.data
})

