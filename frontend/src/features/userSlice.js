import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAvatar: (state, action) => {
      state.userData.avatar = action.payload.avatar;
    },
    updateAccountDetails: (state, action) => {
      state.userData = action.payload;
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
