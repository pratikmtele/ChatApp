import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  groupChats: [],
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
    // group chat reducers
    setGroupChat: (state, action) => {
      state.groupChats = action.payload;
    },
    addGroupChat: (state, action) => {
      state.groupChats.push(action.payload);
    },
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

export const {
  setChats,
  addChat,
  removeChat,
  updateChat,
  addGroupChat,
  removeGroupChat,
  updateGroupChat,
  setGroupChat,
} = chatsSlice.actions;

export default chatsSlice.reducer;
