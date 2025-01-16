import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import chatsReducer from "../features/chatsSlice.js";
import messageReducer from "../features/messageSlice.js";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["chats", "messages"], // exclude chats from being persisted
};

const rootReducer = combineReducers({
  user: userReducer,
  chats: chatsReducer,
  messages: messageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
