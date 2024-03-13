import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  channelData: null,
};

const channelAuthSlice = createSlice({
  name: "channelAuth",
  initialState,
  reducers: {
    channelLogin: (state) => {
      state.status = true;
      state.channelData = action.payload.userData;
    },
    channelLogout: (state) => {
      (state.status = false), (state.channelData = null);
    }
  },
});

export const {channelLogin, channelLogout } = channelAuthSlice.actions;
export default channelAuthSlice.reducer;