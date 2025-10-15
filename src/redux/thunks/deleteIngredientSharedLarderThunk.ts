import { ApiResponse } from "@/app/api/api";
import { DeleteIngredientSharedLarderSchema } from "@/schemas/ingredientSharedLarderSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteIngredientSharedLarderThunk = createAsyncThunk<number, DeleteIngredientSharedLarderSchema>('shared_larder_ingredient/delete',
  async (ingredientData) => {
    const req = await fetch(`${window.location.href}/api/shared-larder`, {
      method: 'DELETE',
      body: JSON.stringify(ingredientData)
    })
    const res: ApiResponse<DeleteIngredientSharedLarderSchema> = await req.json()
    if (!req.ok) {
      throw res.message
    }
    return res.data.id
  })