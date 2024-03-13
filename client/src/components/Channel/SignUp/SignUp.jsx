import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { httpChannelRegister } from "../../../hooks/channelRequest.js"
import { useForm } from "react-hook-form";
import {Input, Button} from "../../index.js";

const SignUp = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

      const createChannel = async (data) => {
        setError("");
    
        try {
          const response = await httpChannelRegister(data);
          console.log(response);
          if (response?.data?.success) {
            navigate("/login-channel")
        }
        // console.log(user);
    
        } catch (error) {
          setError(error.message)
          // console.log("register error", error);
        }
      };

  return (
    <div  className="flex flex-col text-white font-serif justify-center items-center mt-20 bg-gray-700 p-10 mr-20 ml-20 rounded-md">
    
    <form onSubmit={handleSubmit(createChannel)} className="flex flex-col items-center">
      <span className="text-5xl mb-4">Create a channel</span>
      <Input
        type="text"
        placeholder="Enter Channel Name"
        {...register("channelName", {
          required: true,
          //validate: {matchPatern: () =>}
        })}
      />
      <Input
        type="text"
        placeholder="Enter First Name"
        {...register("firstName", {
          required: true,
          //validate: {matchPatern: () =>}
        })}
      />
      <Input
        type="text"
        placeholder="Enter Last Name"
        {...register("lastName", {
          required: true,
          //validate: {matchPatern: () =>}
        })}
      />
      
      <Input
        type="email"
        placeholder="Enter Email"
        {...register("email", {
          required: true,
          //validate: {matchPatern: () =>}
        })}
      />
      <Input
        type="text"
        placeholder="Enter Mobile Number"
        {...register("mobileNumber", {
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
      <Button type="submit" children="Create a Channel"/>
    </form>
    <div>
      <p>
        Already have an account?
        <Link to="/login-channel"  className="underline"> Log In</Link>
      </p>
      {error && <p> {error}</p>}
    </div>
  </div>
  );
};

export { SignUp };
