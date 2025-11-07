import { ApiResponse } from "@/app/api/api";
import { DeleteIngredientInUserLarderSchema } from "@/schemas/ingredientInUserLarderSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteUserLarderIngredientThunk = createAsyncThunk<number, { id: number }>('user_larder_ingredient/delete', async ({ id }) => {
  const req = await fetch(`${window.location.href}/api/user-larder-ingredient`, {
    method: 'DELETE',
    body: JSON.stringify({ id })
  })
  const res: ApiResponse<DeleteIngredientInUserLarderSchema> = await req.json()
  if (!req.ok) {
    throw res.message
  }
  return res.data.id
})