import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    addChat: (state, action) => {
      state.chats.push(action.payload);
    },
    removeChat: (state, action) => {
      state.chats.filter((chat) => {
        chat._id !== action.payload;
      });
    },
    updateChat: (state, action) => {
      const index = state.chats.findIndex(
        (chat) => chat._id === action.payload._id
      );
      if (index !== -1) {
        state.chats[index] = action.payload;
      }
    },
  },
});

export const { setChats, addChat, removeChat, updateChat } = chatsSlice.actions;

export default chatsSlice.reducer;
