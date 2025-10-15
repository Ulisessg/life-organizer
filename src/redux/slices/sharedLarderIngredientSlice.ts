import { GetIngredientSharedLarderSchema } from "@/schemas/ingredientSharedLarderSchema";
import { createSlice } from "@reduxjs/toolkit";
import { getIngredientsSharedLarderThunk } from "../thunks/getIngredientsSharedLarderThunk";
import { createIngredientSharedLarderThunk } from "../thunks/createIngredientSharedLarderThunk";
import { deleteIngredientSharedLarderThunk } from "../thunks/deleteIngredientSharedLarderThunk";

const initialState: GetIngredientSharedLarderSchema[] = []

export const sharedLarderIngredientSlice = createSlice({
  initialState,
  name: 'shared-larder-ingredients',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredientsSharedLarderThunk.fulfilled, (state, action) => {
      state = action.payload
      return state
    })
    builder.addCase(createIngredientSharedLarderThunk.fulfilled, (state, action) => {
      state.push(action.payload)
      return state
    })
    builder.addCase(deleteIngredientSharedLarderThunk.fulfilled, (state, action) => {
      state = state.filter(({ id }) => id !== action.payload)
      return state
    })
  }
})