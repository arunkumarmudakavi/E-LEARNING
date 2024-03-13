import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
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
  channelProfile,
  Videos,
  ChannelHome,
  UploadVideo,
} from "./components/index.js";




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
        path: "/registerChannel",
        element: (
          <AuthLayout authentication={false}>
            {" "}
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/login-channel",
        element: (
          <AuthLayout authentication={false}>
            {" "}
            <SignIn />
          </AuthLayout>
        ),
      },
      {
        path: `/videos/:id`,
        element: <SingleVideo />,
      },
      {
        path: "/registerChannel",
        element: (
          <AuthLayout authentication={false}>
            {" "}
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/login-channel",
        element: (
          <AuthLayout authentication={false}>
            {" "}
            <SignIn />
          </AuthLayout>
        ),
      },
      {
        path: "/channel-home",
        element: (
          <AuthLayout authentication={false}>
            {" "}
            <ChannelHome />
          </AuthLayout>
        ),
      },
      {
        path: "/channelProfile",
        element: (
          <AuthLayout authentication>
            {" "}
            <channelProfile />
          </AuthLayout>
        ),
      },
      {
        path: "/allVideos",
        element: (
          <AuthLayout authentication>
            {" "}
            <Videos />
          </AuthLayout>
        ),
      },
      {
        path: "/uploadVideo",
        element: (
          <AuthLayout authentication>
            {" "}
            <UploadVideo />
          </AuthLayout>
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
