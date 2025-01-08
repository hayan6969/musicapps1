import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  credentials: any | null;
}

const initialState: AuthState = {
  credentials: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.credentials = action.payload;
    },
    logout: (state) => {
      state.credentials = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
