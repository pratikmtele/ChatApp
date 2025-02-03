import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  groupChats: [],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    updateChat: (state, action) => {
      const index = state.chats.findIndex(
        (chat) => chat._id === action.payload._id
      );
      if (index !== -1) {
        state.chats[index] = action.payload;
      }
    },
    // group chat reducers
    removeGroupChat: (state, action) => {
      state.groupChats.filter((chat) => {
        chat._id !== action.payload;
      });
    },
    updateGroupChat: (state, action) => {
      const index = state.groupChats.findIndex(
        (chat) => chat._id === action.payload._id
      );
      if (index !== -1) {
        state.chats[index] = action.payload;
      }
    },
  },
});

export const { updateChat, removeGroupChat, updateGroupChat } =
  chatsSlice.actions;

export default chatsSlice.reducer;
