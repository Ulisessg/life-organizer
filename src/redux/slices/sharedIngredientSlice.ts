import { createSlice } from '@reduxjs/toolkit'
import { SharedIngredientState } from '../redux'
import { getSharedIngredientsThunk } from '../thunks/getSharedIngredientsThunk'
import { createSharedIngredientThunk } from '../thunks/createSharedIngredientThunk'
import { deleteSharedIngredientThunk } from '../thunks/deleteSharedIngredientThunk'

const initialState: SharedIngredientState = {}

export const sharedIngredientSlice = createSlice({
  initialState,
  name: 'shared_ingredients',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSharedIngredientsThunk.fulfilled, (state, action) => {
      const formattedState: SharedIngredientState = {}
      action.payload.map(({ id, name }) => {
        formattedState[id] = { name }
      })
      state = formattedState
      return state
    })
    builder.addCase(createSharedIngredientThunk.fulfilled, (state, action) => {
      state = {
        ...state, [action.payload.id]: {
          name: action.payload.name
        }
      }
      return state
    })
    builder.addCase(deleteSharedIngredientThunk.fulfilled, (state, action) => {
      delete state[action.payload]
      return state
    })
  }
})