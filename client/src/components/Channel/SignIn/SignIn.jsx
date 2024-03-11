import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpChannelLogin } from "../../../hooks/channelRequest.js";
import { loggedChannel } from "../../../features/handleSlice.js";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch()

  const handleLog = async (e) => {
    e.preventDefault();
    try {
      const response = await httpChannelLogin(user);
      dispatch(loggedChannel(response))
      // console.log(response);
      if (response?.data?.success) {
        setUser({
          email: "",
          password: "",
        });
        navigate('/');
    }
    //   console.log(response);
    } catch (error) {
      console.log("login error: ", error);
    }
  };

  return (
    <>
      <form onSubmit={handleLog} className="main-container">
        <span className="heading">Sign In</span>
        <input
          type="text"
          name="email"
          autoComplete="off"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          autoComplete="off"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </>
  );
};

export { SignIn };
