import { createSlice } from '@reduxjs/toolkit'
import { UserIngredientState } from '@/redux/redux'
import { getUserIngredientThunk } from '@/redux/thunks/getUserIngredientsThunk'

const initialState: UserIngredientState = {}

export const userIngredientSlice = createSlice({
  name: 'user_ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserIngredientThunk.fulfilled, (_state, action) => {
      const formattedState: UserIngredientState = {}
      action.payload.map((userIngredient) => {
        formattedState[userIngredient.id] = {
          name: userIngredient.name
        }
      })
      return formattedState
    })
  }
})