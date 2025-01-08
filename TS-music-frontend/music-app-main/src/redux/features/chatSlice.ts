import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  chatId: number | null;
}

const initialState: ChatState = {
  chatId: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChatId: (state, action: PayloadAction<number>) => {
      state.chatId = action.payload;
    },
  },
});

export const { setActiveChatId } = chatSlice.actions;
export default chatSlice.reducer;
