import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import missileReducer from "./slices/missileSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    missiles: missileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
