import {configureStore} from "@reduxjs/toolkit"
import authSlice from "../features/authSlice.js"
import channelAuthSlice from "../features/channelAuthSlice.js"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        channelAuth: channelAuthSlice,
    },
})