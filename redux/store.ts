import { configureStore } from "@reduxjs/toolkit";
import employments from "./slices/employments";
import submitemployments from "./slices/submitemployments";

export const store = configureStore({
  reducer: {
    employments: employments,
    submitemployments: submitemployments,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
