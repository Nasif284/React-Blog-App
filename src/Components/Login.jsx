import React from 'react'
import styles from "../Styles/login.module.css";
import { Link } from 'react-router';
const Login = ({model,setEmail,setPassword,handleLogin,errMessage}) => {
  return (
    <div className={styles.loginMain}>
      <div className={styles.loginBox}>
        <h1>{model}</h1>
        <form action="" className={styles.loginForm}>
          {errMessage && <p style={{ color: "red" }}>{errMessage}</p>}
          <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Enter your email" />
          <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Enter your password" />
          <button onClick={handleLogin} type="submit">
            Submit
          </button>
          {model === "Login" && (
            <div className={styles.signUp}>
              <p> Don't have an account ?</p>
              <Link to="/signUp">SignUp</Link>
            </div>
          )}
          {model === "Sign Up" && (
          <div className={styles.signUp}>
                    <p>Allready an accout ?</p>
                    <Link to="/login">Login</Link>
                  </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login