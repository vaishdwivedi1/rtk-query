import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "../services/todoApi";

// Create and configure the Redux store
export const store = configureStore({
  // Register the todoApi reducer under its specified path in the Redux state
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
  },

  // Add the RTK Query middleware to enable features like caching, invalidation, polling, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

// Define the RootState type based on the store's state shape
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type based on the store's dispatch method
export type AppDispatch = typeof store.dispatch;
