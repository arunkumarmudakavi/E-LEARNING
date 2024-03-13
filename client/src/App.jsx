import { Routes, Route, Outlet } from "react-router-dom";
import { Header } from "./components/index.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { httpGetUserProfile } from "./hooks/userRequest.js";
import { userLogin, userLogout } from "./features/authSlice.js";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // const status = useSelector((state) => state.auth.status)
  // console.log(status);

  useEffect(() => {
    httpGetUserProfile()
      .then((userData) => {
        if (userData) {
          dispatch(userLogin({ userData }));
        } else {
          dispatch(userLogout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/channels" element={<Channels />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/channel-register" element={<SignUp />} />
        <Route path="/register" element={<UserSignUp />} />
        <Route path="/login-channel" element={<SignIn />} />
      </Routes> */}
    </>
  ) : null;
}

export default App;
