import { configureStore } from "@reduxjs/toolkit";
import employments from "./slices/employments";

export const store = configureStore({
  reducer: {
    employments: employments,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
