import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input } from "../../index.js";
import { userLogin } from "../../../features/authSlice.js";
import { useForm } from "react-hook-form";

import { httpGetUserProfile, httpSubmitUserRegister } from "../../../hooks/userRequest.js";

const UserSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const userRegister = async (data) => {

    setError("");
    try {
      const response = await httpSubmitUserRegister(data);
      if (response?.data?.success) {
        // const userData = await httpGetUserProfile();
        // if (userData) dispatch(userLogin(userData));
        navigate("/login");
      }
      // console.log(user);
      // console.log("successfully Registered");
    } catch (error) {
      setError(error.message);
      // console.log("Registration error: ", error);
    }
  };

  return (
    <div className="flex flex-col text-white font-serif justify-center items-center mt-20 bg-gray-700 p-10 mr-20 ml-20 rounded-md">
      
      <form onSubmit={handleSubmit(userRegister)} className="flex flex-col items-center">
        <span className="text-5xl mb-4">Sign Up</span>
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
          type="text"
          placeholder="Enter User Name"
          {...register("username", {
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
        <Button type="submit" children="Sign Up"/>
      </form>
      <div>
        <p>
          Already have an account?
          <Link to="/login" className="underline"> Sign In</Link>
        </p>
        {error && <p> {error}</p>}
      </div>
    </div>
  );
};
export { UserSignUp };
