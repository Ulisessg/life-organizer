import { createSlice } from '@reduxjs/toolkit'
import { UserIngredientState } from '@/redux/redux'
import { getUserIngredientThunk } from '@/redux/thunks/getUserIngredientsThunk'
import { createUserIngredientThunk } from '@/redux/thunks/createUserIngredientThunk'
import { deleteUserIngredientThunk } from '@/redux/thunks/deleteUserIngredientThunk'

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
    builder.addCase(createUserIngredientThunk.fulfilled, (state, action) => {
      return {
        ...state, [action.payload.id]: {
          name: action.payload.name
        }
      }
    })
    builder.addCase(deleteUserIngredientThunk.fulfilled, (state, action) => {
      delete state[action.payload]
      return state
    })
  }
})