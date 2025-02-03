import { create } from "zustand";
import axiosInstance from "../utils/axiosInstace";
import { toast } from "react-toastify";

const useChatStore = create((set) => ({
  chats: [],
  groupChats: [],

  setChats: async () => {
    try {
      const response = await axiosInstance.get("/chats/");
      set({ chats: response.data.data });
    } catch (error) {
      console.log("Chats Error: ", error);
      set({ chats: [] });
    }
  },

  addChat: async (userId) => {
    try {
      const response = await axiosInstance.post("/chats", { userId: userId });
      set((state) => {
        const newChats = [...state.chats];
        const chatExists = newChats.some(
          (chat) => chat._id === response.data.data._id
        );
        if (!chatExists) newChats.unshift(response.data.data); // add the new chat to the beginning
        return { chats: newChats };
      });
      return response.data.data;
    } catch (error) {
      console.log("Chat add error: ", error);
    }
  },

  deleteChat: async (chatId) => {
    try {
      const response = await axiosInstance.delete(`chats/${chatId}`);
      const { isGroupChat } = response.data.data;

      if (!isGroupChat) {
        set((state) => ({
          chats: state.chats.filter((chat) => chat._id !== chatId),
        }));
      } else {
        set((state) => ({
          groupChats: state.groupChats.filter(
            (groupChat) => groupChat._id !== chatId
          ),
        }));
      }

      toast.success(response.data.message);
    } catch (error) {
      console.log("Delete chat error: ", error);
      toast.error("Failed to delete chat");
    }
  },

  // group chats functions

  setGroupChats: async () => {
    try {
      const response = await axiosInstance.get("/chats/group-chats");
      set({ groupChats: response.data.data });
    } catch (error) {
      console.log("Set group chat error: ", error);
      set({ groupChats: [] });
    }
  },

  addGroupChat: async (data) => {
    try {
      const response = await axiosInstance.post("chats/group", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => {
        const newChats = [...state.groupChats];
        const chatExists = newChats.some(
          (chat) => chat._id === response.data.data._id
        );
        if (!chatExists) newChats.unshift(response.data.data); // add the new chat to the beginning
        toast.success("Group created successfully");
        return { groupChats: newChats };
      });
      return response.data.data;
    } catch (error) {
      console.log("Add group chat error: ", error);
    }
  },
}));

export default useChatStore;
