import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  email: undefined,
  uid: undefined,
  name: undefined,
  age: undefined,
  dateOfJoining: undefined,
  gender: undefined,
  isAdmin: undefined,
  phone: undefined,
  username: undefined,
};

export const adminDataSlice = createSlice({
  name: "adminData",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.loggedIn = true;
      state.uid = payload?.uid;
      state.email = payload?.email;
    },
    logout: (state) => {
      state = initialState;
    },
    updateAdminData: (state, { payload }) => {
      state.name = payload?.name;
      state.age = payload?.age;
      state.gender = payload?.gender;
      state.isAdmin = payload?.isAdmin;
      state.username = payload?.username;
      state.dateOfJoining = payload?.dateOfJoining;
      state.phone = payload?.phone;
    },
  },
});

export const UserDataAction = adminDataSlice.actions;

export default adminDataSlice.reducer;
