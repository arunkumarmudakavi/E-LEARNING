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

  // const [user, setUser] = useState({
  //   firstName: "",
  //   lastName: "",
  //   username: "",
  //   email: "",
  //   mobileNumber: "",
  //   password: "",
  // });

  const userRegister = async (data) => {

    // console.log(data);
    setError("");
    try {
      const response = await httpSubmitUserRegister(data);
      // dispatch(userLogin(user));
      // console.log(response?.data?.success);
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
    <div>
      <div>
        <p>
          Already have an account?
          <Link to="/login">Sign Up</Link>
        </p>
        {error && <p> {error}</p>}
      </div>
      <form onSubmit={handleSubmit(userRegister)} className="main-container">
        <span className="heading">Sign Up</span>
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
          label="Username: "
          type="text"
          placeholder="User Name"
          {...register("username", {
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
        <Button type="submit" children="Sign Up"/>
      </form>
    </div>
  );
};
export { UserSignUp };
