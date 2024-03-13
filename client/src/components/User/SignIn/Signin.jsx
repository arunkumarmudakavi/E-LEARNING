
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  httpGetUserProfile,
  httpUserLogIn,
} from "../../../hooks/userRequest.js";
import { userLogin } from "../../../features/authSlice.js";
import { Button, Input } from "../../index.js";
import { useForm } from "react-hook-form";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    // console.log(data);
    setError("");
    try {
      const response = await httpUserLogIn(data);
      // dispatch(response);
      // console.log(response);
      if (response?.data?.success) {
        const userData = await httpGetUserProfile();
        if (userData) dispatch(userLogin(userData));
        // console.log(userData);
        navigate("/");
      }
      // console.log(userData);
      // console.log("successfully login");
    } catch (error) {
      setError(error.message);
      // console.log("login error: ", error);
    }
  };

  return (
    <div className="flex flex-col text-white font-serif justify-center items-center mt-20 bg-gray-700 p-10 mr-20 ml-20 rounded-md">
      
      <form onSubmit={handleSubmit(login)} className="flex flex-col items-center">
        <center className="text-5xl mb-4">Sign In</center>
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
          Don't have an account?
          <Link to="/register" className="underline"> Sign Up</Link>
        </p>
        {error && <p> {error}</p>}
      </div>
    </div>
  );
};

export { Signin };
