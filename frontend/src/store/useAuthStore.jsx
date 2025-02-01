import { create } from "zustand";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstace.js";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  socket: null,
  onlineusers: [],

  login: async (data) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/users/login", data);
      set({ user: response.data.data, isAuthenticated: true });
      toast.success(response.data.message);
    } catch (error) {
      console.log("Login error: ", error);
      set({ user: null, isAuthenticated: false });
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get("/users/current-user");
      set({ user: response.data.data, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ loading: false });
    }
  },

  updateAvatar: async (avatar) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.patch(
        "/users/update-avatar",
        avatar
      );
      set({ user: response.data.data });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },

  updateAccountDetails: async (data) => {
    try {
      const response = await axiosInstance.patch(
        "/users/update-account-details",
        data
      );
      set({ user: response.data.data });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.get("/users/logout");
      set({ user: null, isAuthenticated: false });
      toast.success(response.data.message);
    } catch (error) {
      console.log("Logout Error: ", error);
    }
  },
}));

export default useAuthStore;
