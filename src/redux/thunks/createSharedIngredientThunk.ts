import { ApiResponse } from '@/app/api/api'
import { GetSharedIngredientsSchema } from '@/schemas/sharedIngredientsSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const createSharedIngredientThunk = createAsyncThunk<GetSharedIngredientsSchema, { name: string }>('shared_ingredient/create', async ({ name }) => {
  const req = await fetch(`${window.location.href}api/shared-ingredients`, {
    body: JSON.stringify({ name }),
    method: 'POST'
  })
  const res: ApiResponse<GetSharedIngredientsSchema> = await req.json()
  if (!req.ok) {
    throw res.message
  }
  return res.data
})