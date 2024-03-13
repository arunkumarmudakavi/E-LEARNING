import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { httpChannelLogin, httpGetChannelProfile } from "../../../hooks/channelRequest.js";
import { channelLogin } from "../../../features/channelAuthSlice.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {Input, Button} from "../../index.js"

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const handleLog = async (data) => {
    setError("");
    try {
      const response = await httpChannelLogin(data);
      
      console.log(response);
      if (response?.data?.success) {
        const channelData = await httpGetChannelProfile();
        console.log(channelData);
        if (channelData) dispatch(channelLogin(channelData))
        navigate('/channel-home');
      }
    //   console.log(response);
    } catch (error) {
      setError(error.message)
      console.log("login error: ", error);
    }
  };

  return (
    <div>
      <div>
        <p>
          Don't have an account?
          <Link to="/registerChannel">Sign Up</Link>
        </p>
        {error && <p> {error}</p>}
      </div>
      <form onSubmit={handleSubmit(handleLog)} className="main-container">
        <span className="heading">Sign In</span>
        <Input
          label="Email: "
          type="email"
          placeholder="Email"
          {...register("email", {
            required: true,
            //validate: {matchPatern: () =>}
          })}
        />
        <Input
          label="Password: "
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            //validate: {matchPatern: () =>}
          })}
        />
        <Button type="submit" children="Sign In"/>
        {/* <Button children="Sign In" /> */}
      </form>
    </div>
  );
};

export { SignIn };
