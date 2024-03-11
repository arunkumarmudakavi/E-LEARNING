import "./Signin.scss";
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

  //    const [user, setUser] = useState({
  //        email: "",
  //        password: "",
  //     })

  const login = async (data) => {
    console.log(data);
    setError("");
    try {
      const response = await httpUserLogIn(data);
      // dispatch(response);
      // console.log(response.data.success);
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
    <div>
      <div>
        <p>
          Don't have an account?
          <Link to="/register">Sign Up</Link>
        </p>
        {error && <p> {error}</p>}
      </div>
      <form onSubmit={handleSubmit(login)} className="main-container">
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

export { Signin };
