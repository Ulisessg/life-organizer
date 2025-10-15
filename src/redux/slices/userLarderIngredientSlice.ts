import { GetIngredientInUserLarderSchema } from "@/schemas/ingredientInUserLarderSchema";
import { createSlice } from "@reduxjs/toolkit";
import { createUserLarderIngredientThunk } from "../thunks/createUserLarderIngredientThunk";
import { getUserLarderIngredientsThunk } from "../thunks/getUserLarderIngredientsThunk";
import { deleteUserLarderIngredientThunk } from "../thunks/deleteUserLarderIngredientThunk";

const initialState: GetIngredientInUserLarderSchema[] = []

export const userLarderIngredientSlice = createSlice({
  initialState,
  name: 'user_larder_ingredient',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUserLarderIngredientThunk.fulfilled, (state, action) => {
      state.push(action.payload)
      return state
    })
    builder.addCase(getUserLarderIngredientsThunk.fulfilled, (state, action) => {
      state = action.payload
      return state
    })
    builder.addCase(deleteUserLarderIngredientThunk.fulfilled, (state, action) => {
      state = state.filter((userLarderIngredient) => userLarderIngredient.id !== action.payload)
      return state
    })
  }
})