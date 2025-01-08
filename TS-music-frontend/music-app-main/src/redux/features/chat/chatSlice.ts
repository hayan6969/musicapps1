import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChatUser } from "@/types/chat";

interface ChatUser {
  id: string;
  chatId: string;
  userName: string;
  avatar: string;
  latestMessage: string;
  unreadCount: number;
}

interface ChatState {
  chatDrawer: boolean;
  chatId: string;
  chatUsers: ChatUser[];
}

const initialState: ChatState = {
  chatDrawer: false,
  chatId: "",
  chatUsers: [],
};

export const chatSlice = createSlice({
  name: "chatDrawer",
  initialState,
  reducers: {
    updateDrawer: (state) => {
      state.chatDrawer = !state.chatDrawer;
    },
    chatId: (state, action: PayloadAction<string>) => {
      state.chatId = action.payload;
    },
    updateChatUsers: (state, action: PayloadAction<ChatUser[]>) => {
      state.chatUsers = [...state.chatUsers, ...action.payload];
    },
  },
});

export const { updateDrawer, chatId, updateChatUsers } = chatSlice.actions;
export default chatSlice.reducer;
