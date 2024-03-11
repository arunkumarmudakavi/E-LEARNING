import {createSlice, nanoid} from "@reduxjs/toolkit"

const initialState = {
    registerUserData: [],
    videos: [],
    loggedChannelData: [],
}

// Reducer
export const handleSlice = createSlice({
    name: "handle",
    initialState,
    reducers: { // list(methods) of reducers
        registerUser: (state, action) => {
            const register = {
                id: nanoid(),
                text: action.payload,
            }
            state.registerUserData.push(register)
        },
        loggedUser: (state, action) => {
            const loginUser = {
                id: nanoid(),
                text: action.payload,
            }
            state.loggedUserData.push(loginUser)
        },
        getVideo: (state, action) => {
            const videos = {
                text: action.payload,
            }
            state.videos.push(videos)
        },
        loggedChannel: (state, action) => {
            const loginChannel = {
                id: nanoid(),
                text: action.payload,
            }
            state.loggedChannelData.push(loginChannel)
        }
    }
})

export const {registerUser, loggedUser, getVideo, loggedChannel} = handleSlice.actions
export default handleSlice.reducer