import React, { useState } from 'react'
import { useAuth } from '../Context/authContext';
import Login from '../Components/Login';


const SignUp = () => {
    const { signUp } = useAuth();

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp(email, password)
            console.log("user created");
        } catch (err) {
            console.log(err.message);
            
        }
       
    }
  return <Login model="Sign Up" setEmail={setEmail} setPassword={setPassword} handleLogin={handleSubmit}/>;
}

export default SignUp