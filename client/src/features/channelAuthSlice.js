import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const channelAuthSlice = createSlice({
  name: "channelAuth",
  initialState,
  reducers: {
    channelLogin: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    channelLogout: (state) => {
      (state.status = false), (state.userData = null);
    }
  },
});

export const {channelLogin, channelLogout } = channelAuthSlice.actions;
export default channelAuthSlice.reducer;
