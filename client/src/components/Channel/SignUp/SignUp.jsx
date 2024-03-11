import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { httpChannelRegister } from "../../../hooks/channelRequest.js"

const SignUp = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        avatar: "",
        channelName: "",
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        password: "",
      });

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await httpChannelRegister(user);
          if (response.ok) {
            setUser({
              avatar: "",
              channelName: "",
              firstName: "",
              lastName: "",
              email: "",
              mobileNumber: "",
              password: "",
            });
        }
        // console.log(user);
        // console.log("success");
        navigate('/login-channel')
    
        } catch (error) {
          console.log("register error", error);
        }
      };

  return (
    <>
      <form onSubmit={handleSubmit} className="main-container">
        <span className="heading">Create a Channel</span>
        {/* <input
            type="file"
            name="avatar"
            onChange={(e) => setUser({ ...user, avatar: e.target.value})}
        /> */}
        <input
          type="text"
          name="channelName"
          placeholder="Channel Name"
          autoComplete="off"
          onChange={(e) => setUser({ ...user, channelName: e.target.value })}
          required
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          autoComplete="off"
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          autoComplete="off"
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="off"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <input
          type="number"
          name="mobileNumber"
          placeholder="Mobile Number"
          autoComplete="off"
          onChange={(e) => setUser({ ...user, mobileNumber: e.target.value })}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
        <button type="submit">Create a channel</button>
      </form>
    </>
  );
};

export { SignUp };
