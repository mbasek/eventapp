import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ toggle, user, logOut }) => {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles["navbar-container"]}>
          <div className={styles["navbar-logo"]} to="/">
            <Link className={styles["navbar-logo"]} to="/">
              <span style={{ color: "#01bf71" }}>event</span>App
            </Link>
          </div>
          <div className={styles["mobile-icon"]} onClick={toggle}>
            <FontAwesomeIcon icon={faBars} onClick={toggle} />
          </div>
          <ul className={styles["navbar-menu"]}>
            {/* {NavbarItems.map((item) => (
              <li key={item.id} className={styles["navbar-item"]}>
                <Link className={styles["navbar-links"]} to={item.to}>
                  {item.name}
                </Link>
              </li>
            ))} */}
            <li className={styles["navbar-item"]}>
              <Link className={styles["navbar-links"]} to="/">
                Home
              </Link>
            </li>
            <li className={styles["navbar-item"]}>
              <Link className={styles["navbar-links"]} to="/events">
                Events
              </Link>
            </li>
            <li className={styles["navbar-item"]}>
              {!user && (<Link className={styles["navbar-links"]} to="/register">
                Register
              </Link>)}
            </li>
            <li className={styles["navbar-item"]}>
              {user && (
                <Link className={styles["navbar-links"]} to="/stats">
                  Create event
                </Link>
              )}
            </li>
          </ul>
          <button className={styles["navbar-button"]}>
            {user ? (
              <Link
                onClick={logOut}
                className={styles["navbar-button__link"]}
                to="/"
              >
                Sign out
              </Link>
            ) : (
              <Link className={styles["navbar-button__link"]} to="/login">
                Login
              </Link>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
