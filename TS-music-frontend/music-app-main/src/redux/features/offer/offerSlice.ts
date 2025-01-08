import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { CategoriesService } from "@/services/categories.service";

interface OfferState {
  offerDialog: boolean;
  cancelDialog: boolean;
  completeDialog: boolean;
  revisionDialog: boolean;
  ratingDialog: boolean;
  arbitrationDialog: boolean;
  invoiceDialog: boolean;
  reportDialog: boolean;
  musicBackgroundDialog: boolean;
  musicPlayerDialog: boolean;
  isMusicAssets: boolean;
  isCustomer: boolean;
  reportUserDialog: boolean;
  filterExplore: string;
  selectedId: string | null;
  musicDetail: MusicDetail | null;
  isMusicCreation: boolean;
  source: "assets" | "home" | null;
  musicAsset: any;
}

interface MusicDetail {
  musicStyle?: string;
  instrument?: string;
  movieGameType?: string;
  softwareTools?: string;
  label?: string;
  description?: string;
}

const initialState: OfferState = {
  offerDialog: false,
  cancelDialog: false,
  completeDialog: false,
  revisionDialog: false,
  ratingDialog: false,
  arbitrationDialog: false,
  invoiceDialog: false,
  reportDialog: false,
  musicBackgroundDialog: false,
  musicPlayerDialog: false,
  isMusicAssets: false,
  isCustomer: false,
  reportUserDialog: false,
  filterExplore: "all",
  selectedId: null,
  musicDetail: null as MusicDetail | null,
  isMusicCreation: false,
  source: null,
  musicAsset: null,
};

export const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    updateDialog: (state) => {
      state.offerDialog = !state.offerDialog;
    },
    cancelDialog: (state) => {
      state.cancelDialog = !state.cancelDialog;
    },
    completeDialog: (state) => {
      state.completeDialog = !state.completeDialog;
    },
    revisionDialog: (state) => {
      state.revisionDialog = !state.revisionDialog;
    },
    ratingDialog: (state) => {
      state.ratingDialog = !state.ratingDialog;
    },
    arbitrationDialog: (state) => {
      state.arbitrationDialog = !state.arbitrationDialog;
    },
    invoiceDialog: (state) => {
      state.invoiceDialog = !state.invoiceDialog;
    },
    reportDialog: (state) => {
      state.reportDialog = !state.reportDialog;
    },
    musicBackgroundDialog: (state) => {
      state.musicBackgroundDialog = !state.musicBackgroundDialog;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setMusicDetail: (state, action: PayloadAction<any>) => {
      console.log("Setting music detail:", action.payload);
      state.musicDetail = action.payload;
    },
    musicPlayerDialog: (state) => {
      state.musicPlayerDialog = !state.musicPlayerDialog;
      if (!state.musicPlayerDialog) {
        state.isMusicAssets = false;
        state.selectedId = null;
        state.musicDetail = null;
        state.source = null;
      }
    },
    setMusicAssetId: (state, action) => {
      state.selectedId = action.payload;
      state.isMusicAssets = true;
      state.source = "assets";
    },
    setMusicCreationId: (state, action) => {
      state.selectedId = action.payload;
      state.isMusicAssets = false;
      state.source = "home";
    },
    isCustomer: (state, action: PayloadAction<boolean>) => {
      state.isCustomer = action.payload;
    },
    reportUserDialog: (state) => {
      state.reportUserDialog = !state.reportUserDialog;
    },
    filterExplore: (state, action: PayloadAction<string>) => {
      state.filterExplore = action.payload;
    },
    musicCreation: (state, action: PayloadAction<boolean>) => {
      state.isMusicCreation = action.payload;
    },
    updateMusicAsset: (state, action) => {
      state.musicAsset = action.payload;
    },
  },
});

export const {
  updateDialog,
  cancelDialog,
  completeDialog,
  revisionDialog,
  ratingDialog,
  arbitrationDialog,
  invoiceDialog,
  reportDialog,
  musicBackgroundDialog,
  musicPlayerDialog,
  setMusicAssetId,
  setMusicCreationId,
  isCustomer,
  reportUserDialog,
  filterExplore,
  setSelectedId,
  setMusicDetail,
  musicCreation,
  updateMusicAsset,
} = offerSlice.actions;
export default offerSlice.reducer;
