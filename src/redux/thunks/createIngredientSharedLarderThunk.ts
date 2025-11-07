import { ApiResponse } from "@/app/api/api";
import { CreateIngredientSharedLarderSchema, GetIngredientSharedLarderSchema } from "@/schemas/ingredientSharedLarderSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createIngredientSharedLarderThunk = createAsyncThunk<GetIngredientSharedLarderSchema, CreateIngredientSharedLarderSchema>('shared_larder_ingredient/create',
  async (ingredientData) => {
    const req = await fetch(`${window.location.href}/api/shared-larder`, {
      method: 'POST',
      body: JSON.stringify(ingredientData)
    })
    const res: ApiResponse<GetIngredientSharedLarderSchema> = await req.json()
    if (!req.ok) {
      throw res.message
    }
    return res.data
  })