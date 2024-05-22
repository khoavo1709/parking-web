import { configureStore } from "@reduxjs/toolkit";
import { authSlice, parkingLotSlice } from "./reducers";
import { employeeSlice } from "./reducers/employeeSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    parkingLot: parkingLotSlice.reducer,
    employee: employeeSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
