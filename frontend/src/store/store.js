import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice.js";

const store = configureStore({
  reducer: userReducer,
});

export default store;
