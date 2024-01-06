import React from "react";
import styles from "./RegisterForm.module.css";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles["form-wrap"]}>
          <Link to="/" className={styles.icon}>
            <span style={{ color: "#010101" }}>event</span>App
          </Link>
          <div className={styles["form-content"]}>
            <form className={styles.form} action="#">
              <h1 className={styles["form-h1"]}>Register your account</h1>
              <label className={styles["form-label"]} htmlFor="for">
                Email
              </label>
              <input
                className={styles["form-input"]}
                type="email"
                required
              ></input>
              <label className={styles["form-label"]} htmlFor="for">
                Password
              </label>
              <input
                className={styles["form-input"]}
                type="password"
                required
              ></input>
              <label className={styles["form-label"]} htmlFor="for">
                Repeat Password
              </label>
              <input
                className={styles["form-input"]}
                type="password"
                required
              ></input>
              <button className={styles["form-button"]} type="submit">
                Continue
              </button>
              <Link to="/login" className={styles.text}>
                <span className={styles.text}>Login?</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
