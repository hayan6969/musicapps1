import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface ManagementState {
  detailTitle: string;
  icon: string;
}

const initialState: ManagementState = {
  detailTitle: "",
  icon: "",
};

export const managementSlice = createSlice({
  name: "managementDrawer",
  initialState,
  reducers: {
    updateDrawer: (state, action: PayloadAction<ManagementState>) => {
      state.detailTitle = action.payload.detailTitle;
      state.icon = action.payload.icon;
    },
  },
});

export const { updateDrawer } = managementSlice.actions;
export default managementSlice.reducer;
