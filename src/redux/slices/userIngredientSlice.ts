import { createSlice } from '@reduxjs/toolkit'
import { UserIngredientState } from '@/redux/redux'

const initialState: UserIngredientState = {}

export const userIngredientSlice = createSlice({
  name: 'user_ingredients',
  initialState,
  reducers: {}
})