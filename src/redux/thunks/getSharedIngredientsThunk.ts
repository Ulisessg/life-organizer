import { ApiResponse } from '@/app/api/api'
import { GetSharedIngredientsSchema } from '@/schemas/sharedIngredientsSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getSharedIngredientsThunk = createAsyncThunk<GetSharedIngredientsSchema[]>('shared_ingredients/get', async () => {
  const req = await fetch(`${window.location.href}api/shared-ingredients`)
  const res: ApiResponse<GetSharedIngredientsSchema[]> = await req.json()
  if (!req.ok) {
    throw res.message
  }
  console.log(res)
  return res.data
})