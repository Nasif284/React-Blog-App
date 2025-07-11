import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useAuth } from '../Context/authContext';
import Login from '../Components/Login';

const AdminLogin = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
    const [errMessage, serErrMessage]= useState()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (email !== "admin@example.com") {
        serErrMessage("Login filed: Invalid Creditionals");
      } else {
        await login(email, password);
        navigate("/admin-dashboard");
      }
    } catch (err) {
      console.log(err.message);
      
    }
  }
  return (
    <Login model="Admin Login" setEmail={setEmail} setPassword={setPassword} handleLogin={handleLogin} errMessage={errMessage} />
  );
}

export default AdminLogin