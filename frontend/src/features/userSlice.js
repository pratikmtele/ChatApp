import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    fullname: "",
    username: "",
    email: "",
    bio: "",
    avatar: "",
    password: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
    },
    updateAvatar: (state, action) => {
      state.userData.avatar = action.payload.avatar;
    },
    updateAccountDetails: (state, action) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.userData = null;
    },
  },
});

export const {
  login,
  register,
  forgotPassword,
  updateAccountDetails,
  updateAvatar,
  searchUsers,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
