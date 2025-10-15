import { ApiResponse } from "@/app/api/api";
import { GetIngredientInUserLarderSchema } from "@/schemas/ingredientInUserLarderSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserLarderIngredientsThunk = createAsyncThunk<GetIngredientInUserLarderSchema[]>("user_larder_ingredients/get", async () => {
  const req = await fetch(`${window.location.href}/api/user-larder-ingredient`)
  const res: ApiResponse<GetIngredientInUserLarderSchema[]> = await req.json()
  if (!req.ok) {
    throw res.message
  }
  return res.data
})