import { configureStore } from '@reduxjs/toolkit';
import { userIngredientSlice } from '@/redux/slices/userIngredientSlice'

export const store = configureStore({
  reducer: {
    userIngredients: userIngredientSlice.reducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch