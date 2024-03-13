import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './index.css'
import {
  RouterProvider,
  createBrowserRouter,
  useParams,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Home from "./pages/Home.jsx";
import {Profile } from "./components/User/Profile/Profile"
import {
  Signin,
  UserSignUp,
  AllPosts,
  AuthLayout,
  SingleVideo,
  SignIn,
  SignUp,
  ChannelProfile,
  Videos,
  ChannelHome,
  UploadVideo,
} from "./components/index.js";
import ChannelAuthLayout from "./components/ChannelAuthLayout.jsx";






// const id = useParams()
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Signin />
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthLayout authentication={false}>
            <UserSignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication>
            {" "}
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: `/videos/:id`,
        element: <SingleVideo />,
      },
      {
        path: "/login-channel",
        element: (
          <ChannelAuthLayout authentication={false}>
            {" "}
            <SignIn />
          </ChannelAuthLayout>
        ),
      },
      
      {
        path: "/registerChannel",
        element: (
          <ChannelAuthLayout authentication={false}>
            {" "}
            <SignUp />
          </ChannelAuthLayout>
        ),
      },
      {
        path: "/channel-home",
        element: (
          <ChannelAuthLayout authentication>
            {" "}
            <ChannelHome />
          </ChannelAuthLayout>
        ),
      },
      {
        path: "/channelProfile",
        element: (
          <ChannelAuthLayout authentication>
            {" "}
            <ChannelProfile/>
          </ChannelAuthLayout>
        ),
      },
      {
        path: "/allVideos",
        element: (
          <ChannelAuthLayout authentication>
            {" "}
            <Videos />
          </ChannelAuthLayout>
        ),
      },
      {
        path: "/uploadVideo",
        element: (
          <ChannelAuthLayout authentication>
            {" "}
            <UploadVideo />
          </ChannelAuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
