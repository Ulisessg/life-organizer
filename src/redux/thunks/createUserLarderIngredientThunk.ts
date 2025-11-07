import { ApiResponse } from "@/app/api/api";
import { AddIngredientInUserLarderSchema, GetIngredientInUserLarderSchema } from "@/schemas/ingredientInUserLarderSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createUserLarderIngredientThunk =
  createAsyncThunk<GetIngredientInUserLarderSchema, AddIngredientInUserLarderSchema>('user_ingredient_larder/create',
    async (ingredientData: AddIngredientInUserLarderSchema) => {
      const req = await fetch(`${window.location.href}/api/user-larder-ingredient`, {
        method: 'POST',
        body: JSON.stringify(ingredientData)
      })
      const res: ApiResponse<GetIngredientInUserLarderSchema> = await req.json()
      if (!req.ok) {
        throw res.message
      }
      return res.data
    })