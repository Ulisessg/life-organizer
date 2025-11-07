import { ApiResponse } from "@/app/api/api";
import { GetIngredientSharedLarderSchema } from "@/schemas/ingredientSharedLarderSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getIngredientsSharedLarderThunk = createAsyncThunk<GetIngredientSharedLarderSchema[]>('shared_larder_ingredient/get', async () => {
  const req = await fetch(`${window.location.href}/api/shared-larder`)
  const res: ApiResponse<GetIngredientSharedLarderSchema[]> = await req.json()
  if (!req.ok) {
    throw res.message
  }
  return res.data
})