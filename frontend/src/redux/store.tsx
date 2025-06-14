import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth.service";
import { userSlice } from "./slices/user.slice";
import { docsApi } from "./services/doc.service";
// ...

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    // ...

    [authApi.reducerPath]: authApi.reducer,
    [docsApi.reducerPath]: docsApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, docsApi.middleware), 
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
