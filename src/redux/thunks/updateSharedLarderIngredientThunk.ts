import { ApiResponse } from "@/app/api/api";
import { UpdateIngredientSharedLarderSchema } from "@/schemas/ingredientSharedLarderSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateSharedLarderIngredientThunk =
  createAsyncThunk<UpdateIngredientSharedLarderSchema, UpdateIngredientSharedLarderSchema>('shared_larder_ingredient/update', async (sharedLarderIngredient) => {
    const req = await fetch(`${window.location.href}/api/shared-larder`, {
      method: 'PATCH',
      body: JSON.stringify(sharedLarderIngredient)
    })
    const res: ApiResponse<UpdateIngredientSharedLarderSchema> = await req.json()
    if (!req.ok) {
      throw res.message
    }
    return res.data
  })