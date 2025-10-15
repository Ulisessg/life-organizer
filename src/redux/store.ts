import { configureStore } from '@reduxjs/toolkit';
import { userIngredientSlice } from '@/redux/slices/userIngredientSlice'
import { sharedIngredientSlice } from '@/redux/slices/sharedIngredientSlice'
import { unitsOfMeasureSlice } from '@/redux/slices/unitsOfMeasureSlice';
import { userLarderIngredientSlice } from './slices/userLarderIngredientSlice';
import { sharedLarderIngredientSlice } from './slices/sharedLarderIngredientSlice';

export const store = configureStore({
  reducer: {
    userIngredients: userIngredientSlice.reducer,
    sharedIngredients: sharedIngredientSlice.reducer,
    unitsOfMeasure: unitsOfMeasureSlice.reducer,
    userLarderIngredients: userLarderIngredientSlice.reducer,
    sharedLarderIngredients: sharedLarderIngredientSlice.reducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch