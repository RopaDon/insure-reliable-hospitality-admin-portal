import { Auth } from "@/config/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthSlice {
  auth: Auth | null;
}

const initialState: AuthSlice = {
  auth: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<Auth | null>) {
      state.auth = action.payload;
    },
    logOut(state) {
      state.auth = null;
      window.location.replace(`/auth/login`);
    },
    updateProfilePic(state, action: PayloadAction<string>) {
      state.auth!.user!.profilePic = action.payload;
    },
    updateUser(state, action: PayloadAction<object>) {
      const admin = state.auth!.user;

      state.auth!.user = {
        ...state.auth!.user,
        ...action.payload,
      } as any;
    },
  },
});
export const { setAuth, logOut, updateProfilePic, updateUser } = authSlice.actions;
export default authSlice;
