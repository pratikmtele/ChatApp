import { combineReducers, configureStore } from "@reduxjs/toolkit";
import chatsReducer from "../features/chatsSlice.js";
import messageReducer from "../features/messageSlice.js";

// combine reducers
const rootReducer = combineReducers({
  chats: chatsReducer,
  messages: messageReducer,
});

// configure store
export const store = configureStore({
  reducer: rootReducer,
});
