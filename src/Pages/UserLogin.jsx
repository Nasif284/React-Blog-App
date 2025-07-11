import React, { useState } from "react";
import { useNavigate} from "react-router";
import { useAuth } from "../Context/authContext";
import Login from "../Components/Login";
const UserLogin = () => {
  const {login} = useAuth();

      const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [errMessage, serErrMessage]= useState()
  const navigat= useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login( email, password)
      console.log("user Logged in")
      navigat("/");
    } catch (err) {
      console.log(err.message)
      serErrMessage("Login filed: Invalid Creditionals")
    }
   

  }
  return (
       <Login model="Login" setEmail={setEmail} setPassword={setPassword} handleLogin={handleLogin} errMessage={errMessage} />
   
  );
};

export default UserLogin;
