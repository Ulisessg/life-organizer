import { ApiResponse } from '@/app/api/api'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const deleteUserIngredientThunk = createAsyncThunk<number, { id: number }>('user_ingredients/delete',
  async ({ id }) => {
    const request = await fetch(`${window.location.href}api/user-ingredients`, {
      method: 'DELETE',
      body: JSON.stringify({ id })
    })
    const response: ApiResponse<number> = await request.json()
    if (!request.ok) {
      throw response
    }
    return response.data
  })