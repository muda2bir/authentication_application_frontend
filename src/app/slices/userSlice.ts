import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserObjectType {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    picture: string;
    phone: string;
    bio: string;
    googleId: string;
    createddAt: Date;
    password: string;
  };
}

export interface UserStateType {
  value: UserObjectType;
}

const initialState: UserStateType = {
  value: {
    isAuthenticated: false,
    user: {
      id: "",
      name: "",
      email: "",
      picture: "",
      phone: "",
      bio: "",
      googleId: "",
      createddAt: new Date(),
      password: "",
    },
  },
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserState: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateUserState } = UserSlice.actions;
export default UserSlice.reducer;
