import { ApiResponse } from '@/app/api/api'
import { DeleteSharedIngredientSchema } from '@/schemas/sharedIngredientsSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const deleteSharedIngredientThunk =
  createAsyncThunk<number, DeleteSharedIngredientSchema>('shared_ingredients/delete',
    async ({ id }) => {
      const req = await fetch(`${window.location.href}api/shared-ingredients`, {
        method: 'DELETE',
        body: JSON.stringify({ id })
      })
      const res: ApiResponse<number> = await req.json()
      if (!req.ok) {
        throw res.message
      }
      return res.data
    })