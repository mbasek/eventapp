import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin, setUser }) => {
  const [creds, setCreds] = useState({});
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, creds.email, creds.password)
      .then((userCredential) => {
        const user = userCredential.user;
        onLogin && onLogin({ email: creds.email });
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/createevent");
        console.log("Login Success!");
      })
      .catch((error) => {
        console.log("Error login! Handle properly!");
        alert("Wrong email or password, try again!");
      });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles["form-wrap"]}>
          <Link to="/" className={styles.icon}>
            <span style={{ color: "#010101" }}>event</span>App
          </Link>
          <div className={styles["form-content"]}>
            <div className={styles.form} action="#">
              <h1 className={styles["form-h1"]}>Sign In to your account</h1>
              <label className={styles["form-label"]} htmlFor="for">
                Email
              </label>
              <input
                className={styles["form-input"]}
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setCreds({ ...creds, email: e.target.value })}
                required
              ></input>
              <label className={styles["form-label"]} htmlFor="for">
                Password
              </label>
              <input
                className={styles["form-input"]}
                type="password"
                placeholder="Enter your password"
                onChange={(e) =>
                  setCreds({ ...creds, password: e.target.value })
                }
                required
              ></input>
              <button onClick={handleLogin} className={styles["form-button"]}>
                Login
              </button>
              <Link to="/register" className={styles.text}>
                <span className={styles.text}>
                  Don't have an account? Register
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
