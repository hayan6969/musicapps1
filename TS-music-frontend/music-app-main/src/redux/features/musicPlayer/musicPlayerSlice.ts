import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface MusicPlayerState {
  isAssetMusic: boolean;
}

const initialState: MusicPlayerState = {
  isAssetMusic: false,
};

export const musicPlayerSlice = createSlice({
  name: "redirectMusicPlayer",
  initialState,
  reducers: {
    redirectMusicPlayer: (state) => {
      state.isAssetMusic = !state.isAssetMusic;
    },
  },
});

export const { redirectMusicPlayer } = musicPlayerSlice.actions;
export default musicPlayerSlice.reducer;
