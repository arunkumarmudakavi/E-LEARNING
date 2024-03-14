import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
   httpChannelLogin, 
   httpGetChannelProfile
 } from "../../../hooks/channelRequest.js";
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
      
      // console.log(response);
      if (response?.data?.success) {
        const userData = await httpGetChannelProfile();
        console.log(userData.data);
        if (userData) {
          const log = dispatch(channelLogin({...userData}))
          console.log(log);
          navigate('/channel-home');
        } 
        
        
      }
    //   console.log(response);
    } catch (error) {
      setError(error.message)
      // console.log("login error: ", error);
    }
  };

  return (
    <div  className="flex flex-col text-white font-serif justify-center items-center mt-20 bg-gray-700 p-10 mr-20 ml-20 rounded-md">
      
      <form onSubmit={handleSubmit(handleLog)} className="flex flex-col items-center">
        <span className="text-4xl mb-4">Log In to Channel</span>
        <Input
          type="email"
          placeholder="Enter Email"
          {...register("email", {
            required: true,
            //validate: {matchPatern: () =>}
          })}
        />
        <Input
          type="password"
          placeholder="Enter Password"
          {...register("password", {
            required: true,
            //validate: {matchPatern: () =>}
          })}
        />
        <Button type="submit" children="Sign In"/>
        {/* <Button children="Sign In" /> */}
      </form>
      <div>
        <p>
          Don't have an channel?
          <Link to="/registerChannel"  className="underline"> Create a channel</Link>
        </p>
        {error && <p> {error}</p>}
      </div>
    </div>
  );
};

export { SignIn };
