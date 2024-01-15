import React, { useState } from "react";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
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
            <form onSubmit={signUp} className={styles.form} action="#">
              <h1 className={styles["form-h1"]}>Create your account</h1>
              <label className={styles["form-label"]} htmlFor="for">
                Email
              </label>
              <input
                className={styles["form-input"]}
                placeholder="Enter your email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
              <label className={styles["form-label"]} htmlFor="for">
                Password
              </label>
              <input
                className={styles["form-input"]}
                placeholder="Enter your password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
              {/* <label className={styles["form-label"]} htmlFor="for">
                Confrim Password
              </label>
              <input
                className={styles["form-input"]}
                placeholder="Password"
                name="password"
                type="password"
                required
              ></input> */}
              <button className={styles["form-button"]} type="submit">
                Submit
              </button>
              <Link to="/login" className={styles.text}>
                <span className={styles.text}>
                  Already have an account? Log In
                </span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
