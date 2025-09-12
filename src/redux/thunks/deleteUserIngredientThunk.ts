import { ApiResponse } from '@/app/api/api'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const deleteUserIngredientThunk = createAsyncThunk<number, { ingredientId: number }>('user_ingredients/delete',
  async ({ ingredientId }) => {
    const request = await fetch(`${window.location.href}api/user-ingredients`, {
      method: 'DELETE',
      body: JSON.stringify({ id: ingredientId })
    })
    const response: ApiResponse<number> = await request.json()
    if (!request.ok) {
      throw response
    }
    return response.data
  })