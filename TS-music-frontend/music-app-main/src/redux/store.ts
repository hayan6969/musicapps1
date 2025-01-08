import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "@/redux/features/counter/counterSlice";
import ChatReducer from "@/redux/features/chat/chatSlice";
import OfferReducer from "@/redux/features/offer/offerSlice";
import MenuReducer from "@/redux/features/menu/menuSlice";
import MusicPlayerReducer from "@/redux/features/musicPlayer/musicPlayerSlice";
import ManagementReducer from "@/redux/features/management/managementSlice";
import AuthReducer, { AuthState } from "@/redux/features/auth/authSlice";
import SelectMultipleReducer from "@/redux/features/selectMultiple/selectMultipleSlice";
import { loadState, saveState } from "./localStorage";

// const defaultAuthState: AuthState = { credentials: null }; // Define the default state
// const preloadedState = {
//   auth: loadState<any>("auth"), // Load auth state dynamically
// };
// const preloadedState = loadState("auth");
const preloadedState = {
  auth: loadState("auth") || { credentials: null },
};

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    chat: ChatReducer,
    offer: OfferReducer,
    menu: MenuReducer,
    musicPlayer: MusicPlayerReducer,
    management: ManagementReducer,
    auth: AuthReducer,
    selectMultiple: SelectMultipleReducer,
  },
  preloadedState,
});

// Subscribe to store changes
store.subscribe(() => {
  // console.log("subrek");
  const { auth } = store.getState();
  // console.log(auth);
  // console.log(auth.credentials);
  if (auth.credentials != undefined) {
    saveState<any>("auth", auth.credentials); // Save auth state dynamically
  }
});

// store.subscribe(() => {
//   saveState("auth", store.getState().auth.credentials); // Save only the dynamic state
// });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
