import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    removeMessage: (state, action) => {
      state.messages.filter((chat) => {
        chat._id !== action.payload;
      });
    },
  },
});

export const { setMessages, addMessage, removeMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
