import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface MenuState {
  title: string;
}

const initialState: MenuState = {
  title: "",
};

export const menuSlice = createSlice({
  name: "updateMenu",
  initialState,
  reducers: {
    updateMenu: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { updateMenu } = menuSlice.actions;
export default menuSlice.reducer;
