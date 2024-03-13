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
          console.log("register error", error);
        }
      };

  return (
    <div>
    <div>
      <p>
        Already have an account?
        <Link to="/login-channel">Log In</Link>
      </p>
      {error && <p> {error}</p>}
    </div>
    <form onSubmit={handleSubmit(createChannel)} className="main-container">
      <span className="heading">Sign Up</span>
      <Input
        label="Channel Name: "
        type="text"
        placeholder="Channel Name"
        {...register("channelName", {
          required: true,
          //validate: {matchPatern: () =>}
        })}
      />
      <Input
        label="First Name: "
        type="text"
        placeholder="First Name"
        {...register("firstName", {
          required: true,
          //validate: {matchPatern: () =>}
        })}
      />
      <Input
        label="Last Name: "
        type="text"
        placeholder="Last Name"
        {...register("lastName", {
          required: true,
          //validate: {matchPatern: () =>}
        })}
      />
      
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
        label="Mobile Number: "
        type="text"
        placeholder="Mobile Number"
        {...register("mobileNumber", {
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
      <Button type="submit" children="Create a Channel"/>
    </form>
  </div>
  );
};

export { SignUp };
