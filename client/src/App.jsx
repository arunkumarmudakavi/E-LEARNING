import { Routes, Route } from "react-router-dom"
import { Home } from "./components/User/Home/Home"
import { Header } from "./components/User/Header/Header"
import { Channels } from "./components/User/Channels/Channels"
import { Profile } from "./components/User/Profile/Profile"
import { Signin } from "./components/User/SignIn/Signin"
import { SignUp } from "./components/Channel/SignUp/SignUp"

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/channels" element={<Channels/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/channel-register" element={<SignUp/>}/>
      </Routes>
    </>
  )
}

export default App
