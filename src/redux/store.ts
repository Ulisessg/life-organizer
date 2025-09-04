import { configureStore } from '@reduxjs/toolkit';
import { userIngredientSlice } from '@/redux/slices/userIngredientSlice'

export const store = configureStore({
  reducer: {
    userIngredients: userIngredientSlice.reducer
  }
})