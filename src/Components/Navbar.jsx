import React from "react";
import { Link, NavLink } from "react-router";
import styles from  '../Styles/navbar.module.css'
import { useAuth } from "../Context/authContext";
const Navbar = () => {
  const { logout, user } = useAuth();
  return (
    <div className={styles.navbar}>
      <Link to={'/'}>
        <h1>Blog</h1>
      </Link>
      <NavLink className={styles.link} to="/login">
        {user ? (
          <>
            {" "}
            <span>Welcome {user.email.split('@')[0]}</span> <button onClick={logout}>Logout</button>{" "}
          </>
        ) : (
          <button>User Login</button>
        )}
      </NavLink>
    </div>
  );
};

export default Navbar;
