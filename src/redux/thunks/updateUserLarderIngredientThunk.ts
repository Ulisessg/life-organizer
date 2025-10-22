import { ApiResponse } from "@/app/api/api";
import { UpdateIngredientUserLarderSchema } from "@/schemas/ingredientInUserLarderSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateUserLarderIngredientThunk =
  createAsyncThunk<UpdateIngredientUserLarderSchema, UpdateIngredientUserLarderSchema>("user_larder_ingredients/update", async (userLarderIngredient) => {
    console.log(userLarderIngredient)
    const req = await fetch(`${window.location.href}/api/user-larder-ingredient`, {
      method: 'PATCH',
      body: JSON.stringify(userLarderIngredient)
    })
    const res: ApiResponse<UpdateIngredientUserLarderSchema> = await req.json()
    if (!req.ok) {
      throw res.message
    }
    return res.data
  })