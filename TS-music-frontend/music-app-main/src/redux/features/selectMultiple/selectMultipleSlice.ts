import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface SelectMultipleState {
  [key: string]: any;
}

const initialState: SelectMultipleState = {
  items: {
    collaborationLyricsLangs: [],
    proficientMusicStyles: [],
    skilledInstruments: [],
  },
};

export const selectMultipleSlice = createSlice({
  name: "selectMultipleSlice",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { key, value } = action.payload;
      state.items[key] = value;
    },
    removeValue: (state, action: PayloadAction<string>) => {
      delete state[action.payload]; // Remove the value by key
    },
    clearValues: (state) => {
      return {}; // Clear all values
    },
  },
});

export const { addItem, removeValue, clearValues } =
  selectMultipleSlice.actions;
export default selectMultipleSlice.reducer;
